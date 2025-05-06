const path = require('path');
const fs = require('fs-extra');
const { runCommand } = require('./utils');
const { generateFiles } = require('./fileGenerator');

async function setupProject({ projectName }) {
  const projectDir = path.join(process.cwd(), projectName);
  const frontendDir = path.join(process.cwd(), 'Frontend');

  // Create Vite project
  console.log(`Creating Vite project: ${projectName}...`);
  runCommand(`npm create vite@latest ${projectName} -- --template react`, { stdio: 'inherit' });

  // Rename project folder to 'Frontend'
  if (fs.existsSync(frontendDir)) {
    console.log(`Removing existing 'Frontend' folder...`);
    fs.removeSync(frontendDir);
  }
  fs.renameSync(projectDir, frontendDir);
  console.log(`Renamed project folder to 'Frontend'`);

  // Change to Frontend directory
  process.chdir(frontendDir);

  // Install dependencies
  console.log('Installing dependencies...');
  runCommand('npm install');
  runCommand('npm install tailwindcss @tailwindcss/vite react-router-dom react-hot-toast react-redux @react-oauth/google @reduxjs/toolkit axios lucide-react react-otp-input tailwindcss-animate');

  // Generate files and folder structure
  await generateFiles(frontendDir);

  // Run development server
  console.log('Starting development server...');
  runCommand('npm run dev');
}

module.exports = { setupProject };