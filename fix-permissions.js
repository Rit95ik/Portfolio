const fs = require('fs');
const path = require('path');

try {
  // Clean any old .next/trace directory causing permissions issues
  const traceDir = path.join(__dirname, '.next', 'trace');
  if (fs.existsSync(traceDir)) {
    console.log('Removing old trace directory...');
    fs.rmSync(traceDir, { recursive: true, force: true });
  }
} catch (err) {
  // Just log the error and continue
  console.error('Warning: Could not clean trace directory:', err.message);
}

console.log('Permission fix script completed'); 