const { execSync } = require('child_process');
const fs = require('fs-extra');

// Utility function to execute shell commands
const runCommand = (command, options = {}) => {
  try {
    execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(`Error executing command: ${command}`, error);
    process.exit(1);
  }
};

// Utility function to write file with error handling
const writeFile = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created: ${filePath}`);
  } catch (error) {
    console.error(`Error writing file: ${filePath}`, error);
    process.exit(1);
  }
};

module.exports = { runCommand, writeFile };