const path = require('path');
const fs = require('fs-extra');

async function generateFiles(frontendDir, templateName = 'react-vite') {
  const templateDir = path.join(__dirname, '..', 'templates', templateName);

  // 1. Copy template directory to frontendDir
  await fs.copy(templateDir, frontendDir, {
    overwrite: true,
    errorOnExist: false,
  });

  console.log(`✅ Copied template: ${templateName} into ${frontendDir}`);

  // 2. Remove default files from Vite (if needed)
  const defaultAppCss = path.join(frontendDir, 'src', 'App.css');
  if (fs.existsSync(defaultAppCss)) {
    fs.removeSync(defaultAppCss);
    console.log('🗑️  Removed default App.css');
  }

  // 3. Optionally handle post-copy logic (e.g., add .env to .gitignore)
  const gitignorePath = path.join(frontendDir, '.gitignore');
  let gitignoreContent = fs.existsSync(gitignorePath)
    ? fs.readFileSync(gitignorePath, 'utf8')
    : '';
  if (!gitignoreContent.includes('.env')) {
    gitignoreContent += '\n.env\n';
    fs.writeFileSync(gitignorePath, gitignoreContent);
  }
}

module.exports = { generateFiles };
