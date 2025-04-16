const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Run the NextJS build process
console.log('Running Next.js build...');
try {
  // Use npx directly with the full options
  execSync('npx next build', { stdio: 'inherit' });
  console.log('Build completed successfully');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}

// Ensure _redirects file exists in the out directory
console.log('Creating _redirects file...');
try {
  fs.writeFileSync(
    path.join(__dirname, 'out', '_redirects'),
    '/*    /index.html   200\n'
  );
  console.log('_redirects file created');
} catch (err) {
  console.error('Error creating _redirects file:', err);
}

console.log('Build process completed successfully!'); 