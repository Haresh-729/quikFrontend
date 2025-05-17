const path = require('path');
const fs = require('fs-extra');
const { configureShadcn } = require('./optionals/shadcn');

async function generateFiles(frontendDir, framework, language, setupShadcn ) {
  // Determine the template name based on the framework and language
  const templatedata = {
    'React': 'react-vite'
  }
  const templateName = templatedata[framework];

  if (!templateName) {
    console.error(`❌ No template found for framework: ${framework}`);
    process.exit(1); // Exit if framework template is not defined
  }

  const templateDir = path.join(__dirname, '..', 'templates', templateName);

  // Check if the template directory exists
  if (!fs.existsSync(templateDir)) {
    console.error(`❌ Template directory not found: ${templateDir}`);
    process.exit(1); // Exit if template directory does not exist
  }

  // 1. Copy template directory to frontendDir
  await fs.copy(templateDir, frontendDir, {
    overwrite: true,
    errorOnExist: false,
  });

  console.log(`✅ Copied template: ${templateName} into ${frontendDir}`);
  
  // 2. Optionally set up Shadcn
  if(setupShadcn) {
    console.log('🎨 Setting up Shadcn...');
    try {
      await configureShadcn(frontendDir);
      console.log('✅ Shadcn setup complete!');
    } catch (error) {
        console.error('❌ Shadcn setup failed:' , error);
    }
  }

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

  console.log('\n✨ File generation complete! ✨');
}

module.exports = { generateFiles };
