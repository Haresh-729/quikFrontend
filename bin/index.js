#!/usr/bin/env node

const { runCLI } = require('../src/cli');

async function main() {
  try {
    await runCLI();
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

main();