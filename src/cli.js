const { program } = require('commander');
const inquirer = require('inquirer');
const { setupProject } = require('./projectSetup');

// Create prompt module for inquirer v9.x
const prompt = inquirer.createPromptModule();

async function showBanner() {
  // Dynamically import gradient-string, chalk and figlet
  const { default: gradient } = await import('gradient-string');
  const { default: chalk } = await import('chalk');
  const figlet = require('figlet');

  return new Promise((resolve) => {
    figlet('QuikFrontend', (err, data) => {
      if (err) {
        console.log('Something went wrong with the banner...');
        console.dir(err);
        return;
      }
      console.log(gradient.rainbow.multiline(data));
      console.log(
        chalk.italic.dim('\n⚡ Build frontend projects in seconds\n'),
      );
      resolve();
    });
  });
}

async function runCLI() {
  await showBanner();

  program
    .version('1.0.0')
    .description('⚡ QuikFrontend - Supercharge your frontend setup');

  program.action(async () => {
    // Dynamically import ora and chalk
    const { default: ora } = await import('ora');
    const { default: chalk } = await import('chalk');

    const spinner = ora('Launching wizard...').start();
    await new Promise((res) => setTimeout(res, 1000));
    spinner.succeed('Wizard ready ✅');

    const answers = await prompt([
      {
        type: 'list',
        name: 'framework',
        message: '🚀 Select a framework:',
        choices: ['React'],
        default: 'React',
      },
      {
        type: 'list',
        name: 'language',
        message: '🧠 Select a language:',
        choices: ['JavaScript'],
        default: 'JavaScript',
      },
      {
        type: 'input',
        name: 'projectName',
        message: '📝 Enter your project name:',
        validate: (input) =>
          input.trim() !== '' || 'Project name cannot be empty',
      },
      {
        type: 'confirm',
        name: 'setupShadcn',
        message: '🎨 Setup Shadcn ?',
        default: false, //Default to No.
      },
    ]);

    console.log(chalk.green('\n✨ Setting up your project...\n'));
    await setupProject(answers);
  });

  await program.parseAsync(process.argv);
}

module.exports = { runCLI };
