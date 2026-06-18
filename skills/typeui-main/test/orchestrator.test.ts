import { describe, expect, it, afterAll } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { loadMemoryFiles } from "../../../src/orchestrator/loader";
import { getRoleKeyForAgent, resolveAgentIdAlias } from "../../../src/orchestrator/index";

describe("orchestrator resolveAgentIdAlias", () => {
  it("resolves Zara aliases correctly", () => {
    expect(resolveAgentIdAlias("zara-seo")).toBe("zara-content");
    expect(resolveAgentIdAlias("Zara")).toBe("zara-content");
  });

  it("resolves Farhan aliases correctly", () => {
    expect(resolveAgentIdAlias("farhan-growth")).toBe("farhan-marketing");
    expect(resolveAgentIdAlias("farhan")).toBe("farhan-marketing");
  });

  it("resolves other mismatched agent aliases", () => {
    expect(resolveAgentIdAlias("taha-slides")).toBe("taha-presentation");
    expect(resolveAgentIdAlias("sami-spatial")).toBe("sami-computational");
    expect(resolveAgentIdAlias("yahya-phd")).toBe("yahya-researcher");
    expect(resolveAgentIdAlias("maryam-business")).toBe("maryam-ops");
    expect(resolveAgentIdAlias("zainab-product-manager")).toBe("zainab-pm");
    expect(resolveAgentIdAlias("gohar")).toBe("gohar-ceo");
  });

  it("returns canonical ID unchanged", () => {
    expect(resolveAgentIdAlias("karar-frontend")).toBe("karar-frontend");
  });
});

describe("orchestrator getRoleKeyForAgent", () => {
  it("resolves security roles correctly", () => {
    expect(getRoleKeyForAgent("hamid-security", "Audit the authentication code")).toBe("primary_security_reviewer");
    expect(getRoleKeyForAgent("hamid-security", "Laravel security fallback audit")).toBe("security_fallback");
  });

  it("resolves debugger roles correctly", () => {
    expect(getRoleKeyForAgent("sajjad-debugger", "Fix login bug")).toBe("fast_bug_fixing");
  });

  it("resolves designer roles correctly", () => {
    expect(getRoleKeyForAgent("mustafa-visual", "Create hero section")).toBe("primary_design_brain");
    expect(getRoleKeyForAgent("mahdi-designer", "Polish the UX layout")).toBe("design_polish_ux_review");
  });

  it("resolves frontend roles correctly", () => {
    expect(getRoleKeyForAgent("karar-frontend", "Build button component")).toBe("frontend_builder");
    expect(getRoleKeyForAgent("karar-frontend", "Verify and review final frontend")).toBe("frontend_final_review");
  });

  it("resolves backend roles correctly", () => {
    expect(getRoleKeyForAgent("tariq-backend", "Write DB migration")).toBe("primary_backend_builder");
    expect(getRoleKeyForAgent("tariq-backend", "Refactor multiple files in Laravel")).toBe("backend_multi_file_builder");
  });
});

describe("loadMemoryFiles exclusions and limits", () => {
  const tempDir = path.join(process.cwd(), ".tmp-tests", `mem-test-${Date.now()}`);

  it("filters out binary files, lockfiles, excluded directories, and large files", async () => {
    // 1. Create temp structures
    fs.mkdirSync(tempDir, { recursive: true });
    fs.mkdirSync(path.join(tempDir, "docs"), { recursive: true });
    fs.mkdirSync(path.join(tempDir, "node_modules"), { recursive: true });
    fs.mkdirSync(path.join(tempDir, "frontend", ".next"), { recursive: true });
    fs.mkdirSync(path.join(tempDir, "backend", "build"), { recursive: true });

    // 2. Write files
    fs.writeFileSync(path.join(tempDir, "docs", "test.md"), "hello docs");
    fs.writeFileSync(path.join(tempDir, "docs", "info.txt"), "hello info");
    fs.writeFileSync(path.join(tempDir, "node_modules", "bad.js"), "console.log('bad')");
    fs.writeFileSync(path.join(tempDir, "frontend", ".next", "cache.json"), "{}");
    fs.writeFileSync(path.join(tempDir, "backend", "build", "bundle.js"), "const a = 1;");
    fs.writeFileSync(path.join(tempDir, "frontend", "image.png"), "binary png contents");
    fs.writeFileSync(path.join(tempDir, "package-lock.json"), "{}");

    // Write a file larger than 1MB
    const largeFilePath = path.join(tempDir, "docs", "large.txt");
    const largeContent = "a".repeat(1024 * 1024 + 10);
    fs.writeFileSync(largeFilePath, largeContent);

    const mockManifest: any = {
      memory: {
        readable: ["**/*"]
      }
    };

    // 3. Execute loadMemoryFiles
    const files = await loadMemoryFiles(mockManifest, tempDir);

    // 4. Verify results
    const relativePaths = files.map(f => path.relative(tempDir, f.path).replace(/\\/g, "/"));
    expect(relativePaths).toContain("docs/test.md");
    expect(relativePaths).toContain("docs/info.txt");
    expect(relativePaths).not.toContain("node_modules/bad.js");
    expect(relativePaths).not.toContain("frontend/.next/cache.json");
    expect(relativePaths).not.toContain("backend/build/bundle.js");
    expect(relativePaths).not.toContain("frontend/image.png");
    expect(relativePaths).not.toContain("package-lock.json");
    expect(relativePaths).not.toContain("docs/large.txt");

    expect(files.find(f => f.path.endsWith("test.md"))?.content).toBe("hello docs");
    expect(files.find(f => f.path.endsWith("info.txt"))?.content).toBe("hello info");
  });

  // Clean up
  afterAll(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
