const path = require('path');
const fs = require('fs-extra');
const { runCommand } = require('./utils');
const { generateFiles } = require('./fileGenerator');

async function setupProject({ projectName }) {
  try {
    const projectDir = path.join(process.cwd(), projectName);
    const frontendDir = path.join(process.cwd(), 'Frontend');

    // Check if the project folder already exists
    if (fs.existsSync(projectDir)) {
      console.error(
        `❌ Folder '${projectName}' already exists. Please remove it or choose another name.`,
      );
      process.exit(1);
    }

    // Step 1: Create Vite project
    console.log(`🚀 Creating Vite project: ${projectName}...`);
    runCommand(`npm create vite@latest ${projectName} -- --template react`, {
      stdio: 'inherit',
    });

    // Rename project folder to 'Frontend'
    if (fs.existsSync(frontendDir)) {
      console.log(`Removing existing 'Frontend' folder...`);
      fs.removeSync(frontendDir);
    }
    fs.renameSync(projectDir, frontendDir);
    console.log(`Renamed project folder to 'Frontend'`);

    // Step 2: Change directory into Frontend
    process.chdir(frontendDir);

    // Step 3: Install default dependencies
    console.log('📦 Installing base dependencies...');
    runCommand('npm install');

    // Step 4: Install additional packages
    const dependencies = [
      'tailwindcss',
      '@tailwindcss/vite',
      'react-router-dom',
      'react-hot-toast',
      'react-redux',
      '@react-oauth/google',
      '@reduxjs/toolkit',
      'axios',
      'lucide-react',
      'react-otp-input',
      'tailwindcss-animate',
    ];
    console.log('📦 Installing additional dependencies...');
    runCommand(`npm install ${dependencies.join(' ')}`);

    // Step 5: Generate your custom file structure
    console.log('🛠️ Generating project files...');
    await generateFiles(frontendDir);

    // Step 6: Initialize Git (optional)
    console.log('🔧 Initializing Git repository...');
    runCommand('git init');
    runCommand('git add .');
    runCommand('git commit -m "Initial quikFrontend commit"');

    // Step 7: Start dev server
    console.log('✅ Project setup complete. Starting dev server...');
    runCommand('npm run dev');
  } catch (err) {
    console.error('❌ Project setup failed:', err.message);
    process.exit(1);
  }
}

module.exports = { setupProject };
