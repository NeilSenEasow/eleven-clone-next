const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Vercel build process...');

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Build the project
console.log('Building project...');
execSync('npm run build', { stdio: 'inherit' });

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '.vercel', 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create a simple config file
const config = {
  version: 3,
  builds: [
    {
      src: 'dist/server.js',
      use: '@vercel/node'
    }
  ],
  routes: [
    {
      src: '/(.*)',
      dest: '/dist/server.js'
    }
  ]
};

// Write the config file
fs.writeFileSync(
  path.join(__dirname, '.vercel', 'output', 'config.json'),
  JSON.stringify(config, null, 2)
);

console.log('Vercel build completed successfully!');
