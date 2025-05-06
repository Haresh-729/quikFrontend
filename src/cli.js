const { program } = require('commander');
const inquirer = require('inquirer');
const { setupProject } = require('./projectSetup');

// Create prompt module for inquirer v9.x
const prompt = inquirer.createPromptModule();

async function runCLI() {
  program
    .version('1.0.0')
    .description('EasyFrontend - A CLI tool for frontend project generation')
    .action(async () => {
      // Prompt user for inputs using the prompt module
      const answers = await prompt([
        {
          type: 'list',
          name: 'framework',
          message: 'Select a framework:',
          choices: ['React'],
          default: 'React',
        },
        {
          type: 'list',
          name: 'language',
          message: 'Select a language:',
          choices: ['JavaScript'],
          default: 'JavaScript',
        },
        {
          type: 'input',
          name: 'projectName',
          message: 'Enter project name:',
          validate: (input) => input.trim() !== '' || 'Project name cannot be empty',
        },
      ]);

      // Setup the project with provided answers
      await setupProject(answers);
    });

  await program.parseAsync(process.argv);
}

module.exports = { runCLI };