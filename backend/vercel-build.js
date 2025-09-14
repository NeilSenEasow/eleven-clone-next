const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Vercel build process...');

// Install dependencies
console.log('Installing dependencies...');
console.log('Installing rimraf globally...');
try {
  execSync('npm install -g rimraf', { stdio: 'inherit' });
  console.log('Installing project dependencies...');
  execSync('npm install --production=false', { stdio: 'inherit' });
  
  // Build the project
  console.log('Building project...');
  execSync('npx tsc', { stdio: 'inherit' });
  
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
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
