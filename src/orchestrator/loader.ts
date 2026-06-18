/**
 * File loading utilities for the orchestrator.
 * Handles YAML parsing, Markdown reading, path resolution, and memory loading.
 */

import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { glob } from "glob";
import { validateManifest } from "./schema";
import type { LoadedAgent, LoadedSkill, LoadedMemoryFile, AgentManifest } from "./types";

// ─── YAML Loading ─────────────────────────────────────────────────────────────

/**
 * Load and parse a YAML file. Throws with the file path in the error message.
 */
export function loadYaml<T = unknown>(filePath: string): T {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `❌ File not found: ${filePath}\n` +
        `  Make sure agent.yml exists in the agent directory.`
    );
  }

  const raw = fs.readFileSync(filePath, "utf-8");

  try {
    return yaml.load(raw) as T;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(
      `❌ Failed to parse YAML at "${filePath}":\n  ${msg}\n` +
        `  Check for indentation errors or invalid characters.`
    );
  }
}

// ─── Markdown Loading ─────────────────────────────────────────────────────────

/**
 * Read a Markdown file. Throws with a clear message if missing.
 */
export function loadMarkdown(filePath: string, label: string): string {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `❌ Markdown file not found: ${filePath}\n` +
        `  Expected "${label}" at the path above. Create the file and retry.`
    );
  }

  return fs.readFileSync(filePath, "utf-8");
}

// ─── Path Resolution ──────────────────────────────────────────────────────────

/**
 * Resolve a path declared in agent.yml (relative to the agent directory)
 * to an absolute path.
 */
export function resolveAgentPath(agentDir: string, relativePath: string): string {
  return path.resolve(agentDir, relativePath);
}

/**
 * Extract a skill ID from a SKILL.md path.
 * e.g. "../../skills/premium-ui/SKILL.md" → "premium-ui"
 */
function extractSkillId(skillPath: string): string {
  const parts = skillPath.replace(/\\/g, "/").split("/");
  // The skill ID is the folder name that contains SKILL.md
  const skillMdIndex = parts.findIndex((p) => p === "SKILL.md");
  if (skillMdIndex > 0) {
    return parts[skillMdIndex - 1];
  }
  // Fallback: use the parent directory name
  return path.basename(path.dirname(skillPath));
}

const BINARY_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.pdf', '.zip', '.tar', '.gz', 
  '.mp4', '.mov', '.avi', '.mp3', '.wav', '.woff', '.woff2', '.ttf', '.eot', 
  '.exe', '.dll', '.so', '.dylib', '.map', '.db', '.sqlite', '.sqlite3', '.wasm',
  '.xlsx', '.xls', '.docx', '.doc', '.pptx', '.ppt', '.ds_store'
]);

const EXCLUDED_DIR_SEGMENTS = [
  '/node_modules/',
  '/.next/',
  '/.nuxt/',
  '/dist/',
  '/build/',
  '/.git/'
];

const EXCLUDED_FILENAME_EXACT = new Set([
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  'skills-lock.json',
  '.ds_store'
]);

const MAX_FILE_SIZE_BYTES = 1024 * 1024; // 1MB

/**
 * Load all readable memory files declared in the agent manifest.
 * Glob patterns are expanded relative to `cwd`.
 * Missing files are silently skipped (non-blocking).
 */
export async function loadMemoryFiles(
  manifest: AgentManifest,
  cwd: string
): Promise<LoadedMemoryFile[]> {
  const results: LoadedMemoryFile[] = [];

  for (const pattern of manifest.memory.readable) {
    let matchedPaths: string[];

    try {
      matchedPaths = await glob(pattern, {
        cwd,
        absolute: true,
        nodir: true,
        dot: true,
        ignore: [
          "**/node_modules/**",
          "**/.next/**",
          "**/.nuxt/**",
          "**/dist/**",
          "**/build/**",
          "**/.git/**",
          "**/package-lock.json",
          "**/yarn.lock",
          "**/pnpm-lock.yaml",
          "**/skills-lock.json",
          "**/.DS_Store"
        ]
      });
    } catch {
      // Invalid glob pattern — skip with a warning
      console.warn(
        `  ⚠️  Skipping unresolvable memory glob: "${pattern}"`
      );
      continue;
    }

    for (const filePath of matchedPaths) {
      if (!fs.existsSync(filePath)) continue;

      // 1. Check directory exclusions (defense in depth)
      const normalizedPath = filePath.replace(/\\/g, "/");
      const isExcludedDir = EXCLUDED_DIR_SEGMENTS.some(segment => normalizedPath.includes(segment));
      if (isExcludedDir) continue;

      // 2. Check filename exclusions
      const basename = path.basename(filePath).toLowerCase();
      if (EXCLUDED_FILENAME_EXACT.has(basename)) continue;

      // 3. Check binary file extensions
      const ext = path.extname(filePath).toLowerCase();
      if (BINARY_EXTENSIONS.has(ext)) continue;

      try {
        // 4. Check file size to avoid heap memory issues
        const stats = fs.statSync(filePath);
        if (stats.size > MAX_FILE_SIZE_BYTES) {
          console.warn(`  ⚠️  Skipping large memory file (${(stats.size / 1024).toFixed(0)} KB): "${filePath}"`);
          continue;
        }

        const content = fs.readFileSync(filePath, "utf-8");
        results.push({ path: filePath, content });
      } catch {
        // File exists but can't be read — skip silently
      }
    }
  }

  return results;
}

// ─── Agent Loader ─────────────────────────────────────────────────────────────

/**
 * Fully load a single agent from its directory:
 * 1. Parse and validate agent.yml
 * 2. Load SYSTEM.md
 * 3. Load all referenced SKILL.md files
 * 4. Load project memory files
 */
export async function loadAgent(
  agentDir: string,
  cwd: string
): Promise<LoadedAgent> {
  const agentId = path.basename(agentDir);
  const manifestPath = path.join(agentDir, "agent.yml");

  // 1. Parse and validate agent.yml
  const rawYaml = loadYaml<unknown>(manifestPath);
  const manifest = validateManifest(rawYaml, agentId) as AgentManifest;

  // 2. Load SYSTEM.md
  const systemPromptPath = resolveAgentPath(agentDir, manifest.system_prompt);
  const systemPrompt = loadMarkdown(systemPromptPath, "system_prompt (SYSTEM.md)");

  // 3. Load skill files
  const skills: LoadedSkill[] = [];
  for (const skillRelPath of manifest.skills) {
    const skillAbsPath = resolveAgentPath(agentDir, skillRelPath);

    if (!fs.existsSync(skillAbsPath)) {
      throw new Error(
        `❌ Skill file not found for agent "${agentId}":\n` +
          `  Path: ${skillAbsPath}\n` +
          `  Declared in agent.yml: "${skillRelPath}"\n` +
          `  Create the SKILL.md file or fix the path in agent.yml.`
      );
    }

    const content = fs.readFileSync(skillAbsPath, "utf-8");
    const skillId = extractSkillId(skillRelPath);

    skills.push({ id: skillId, path: skillAbsPath, content });
  }

  // 4. Load memory files
  const memoryFiles = await loadMemoryFiles(manifest, cwd);

  return {
    dir: agentDir,
    manifest,
    systemPrompt,
    skills,
    memoryFiles,
  };
}
