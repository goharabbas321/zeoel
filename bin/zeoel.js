#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🚀 Initializing Zeoel AI Agency Framework...\n');

const packageRoot = path.join(__dirname, '..');
const cwd = process.cwd();

const itemsToCopy = [
  { src: '.agents', dest: '.agents', desc: '33 specialized agents and 450+ skills' },
  { src: '.github', dest: '.github', desc: 'Copilot and GitHub integration files' },
  { src: 'AGENTS.md', dest: 'AGENTS.md', desc: 'Agent manifest' },
  { src: 'CLAUDE.md', dest: 'CLAUDE.md', desc: 'Claude and Cursor integration file' },
  { src: '.gitignore.template', dest: '.gitignore', desc: 'Auto-generated gitignore' },
  { src: 'SETUP.md', dest: 'SETUP.md', desc: 'Setup guide' },
  { src: 'USER_MANUAL.md', dest: 'USER_MANUAL.md', desc: 'User manual' }
];

try {
  let copiedSomething = false;

  for (const item of itemsToCopy) {
    const sourcePath = path.join(packageRoot, item.src);
    const targetPath = path.join(cwd, item.dest);

    if (!fs.existsSync(sourcePath)) {
      console.warn(`⚠️ Warning: Could not find ${item.src} in package.`);
      continue;
    }

    if (fs.existsSync(targetPath)) {
      console.log(`⚠️ ${item.dest} already exists in this directory. Skipping...`);
      continue;
    }

    console.log(`Copying ${item.src} (${item.desc})...`);
    execSync(`cp -r "${sourcePath}" "${targetPath}"`);
    copiedSomething = true;
  }

  if (copiedSomething) {
    // Ensure core directories exist
    const dirsToCreate = ['frontend', 'backend', '.worktrees'];
    for (const dir of dirsToCreate) {
      const dirPath = path.join(cwd, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
    }
  }

  // Self-healing check and installation of Caveman and Graphify
  ensureCavemanAndGraphify();

  if (copiedSomething) {
    console.log('\n✅ Successfully initialized Zeoel Framework!');
    console.log('----------------------------------------------------');
    console.log('You are now the Product Owner.');
    console.log('To start building, open your AI coding assistant (Cursor, Copilot, Claude Code) and say:\n');
    console.log('  "I want to build a SaaS for [your idea]"\n');
    console.log('Zeoel will handle the brainstorming, sprint planning, and task execution automatically.');
    console.log('Remember: All code must go into frontend/ or backend/ directories.');
    console.log('----------------------------------------------------\n');
  } else {
    console.log('\n✅ Zeoel Framework is already fully initialized in this directory.');
  }
} catch (error) {
  console.error('❌ Failed to initialize Zeoel framework:', error.message);
  process.exit(1);
}

function ensureCavemanAndGraphify() {
  const cwd = process.cwd();
  console.log('\n🔍 Verification Phase: Checking token-saving engines...');

  // 1. Check & Install Caveman (via skills package)
  let skillsInstalled = false;
  try {
    execSync('npx --no-install skills --version', { stdio: 'ignore' });
    skillsInstalled = true;
  } catch (e) {
    // Not installed
  }

  if (!skillsInstalled) {
    console.log('📦 Caveman (skills CLI) is not installed. Installing specifically to the codebase...');
    try {
      execSync('npm install --save-dev skills', { cwd, stdio: 'inherit' });
      console.log('✅ Successfully installed skills CLI locally!');
    } catch (e) {
      console.error('⚠️ Failed to install skills CLI locally. Attempting to run via npx directly...', e.message);
    }
  }

  // Always run or ensure Caveman is added
  console.log('🪓 Initializing Caveman prompt compression rules...');
  try {
    execSync('npx skills add juliusbrussee/caveman', { cwd, stdio: 'inherit' });
    console.log('✅ Caveman rules are successfully integrated!');
  } catch (e) {
    console.error('⚠️ Warning: Failed to register Caveman skill:', e.message);
  }

  // 2. Check & Install Graphify (via graphifyy PyPI package)
  let graphifyInstalled = false;
  try {
    execSync('graphify --version', { stdio: 'ignore' });
    graphifyInstalled = true;
  } catch (e) {
    // Not installed
  }

  if (!graphifyInstalled) {
    console.log('📊 Graphify is not installed. Checking for Python/pip/uv to install it...');
    let installedGraphify = false;

    // Check uv first
    try {
      execSync('command -v uv', { stdio: 'ignore' });
      console.log('🚀 Found uv. Installing graphifyy via uv tool...');
      execSync('uv tool install graphifyy', { stdio: 'inherit' });
      installedGraphify = true;
    } catch (e) {
      // uv not available or failed
    }

    if (!installedGraphify) {
      // Check pipx
      try {
        execSync('command -v pipx', { stdio: 'ignore' });
        console.log('🚀 Found pipx. Installing graphifyy via pipx...');
        execSync('pipx install graphifyy', { stdio: 'inherit' });
        installedGraphify = true;
      } catch (e) {
        // pipx not available or failed
      }
    }

    if (!installedGraphify) {
      // Check standard pip/pip3
      try {
        let pipCmd = '';
        try {
          pipCmd = execSync('command -v pip3 || command -v pip', { encoding: 'utf8' }).trim();
        } catch (err) {
          // Ignore command-v failure
        }
        if (pipCmd) {
          console.log(`🚀 Found pip at ${pipCmd}. Installing graphifyy...`);
          try {
            execSync(`${pipCmd} install graphifyy --break-system-packages`, { stdio: 'inherit' });
            installedGraphify = true;
          } catch (e) {
            try {
              execSync(`${pipCmd} install graphifyy`, { stdio: 'inherit' });
              installedGraphify = true;
            } catch (err) {
              console.error('⚠️ Standard pip installation failed:', err.message);
            }
          }
        }
      } catch (e) {
        // Ignored
      }
    }

    if (installedGraphify) {
      console.log('✅ Graphify engine successfully installed!');
      graphifyInstalled = true;
    } else {
      console.warn('⚠️ Graphify python engine could not be auto-installed. Please install it manually with:\n  pip install graphifyy  or  uv tool install graphifyy');
    }
  } else {
    console.log('✅ Graphify engine is already installed!');
    graphifyInstalled = true;
  }

  // Register graphify skill if installed
  if (graphifyInstalled) {
    console.log('📊 Registering Graphify skill with AI assistants...');
    try {
      execSync('graphify install', { cwd, stdio: 'inherit' });
      console.log('✅ Graphify skill successfully registered!');
    } catch (e) {
      console.error('⚠️ Warning: Failed to register Graphify skill:', e.message);
    }
  }
}

