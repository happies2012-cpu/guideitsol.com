// Simple startup script for cPanel deployment
const { spawn } = require('child_process');
const path = require('path');

// Start the backend server
const backend = spawn('node', ['backend/index.js'], {
  cwd: __dirname,
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: process.env.PORT || 3000
  }
});

backend.stdout.on('data', (data) => {
  console.log(`Backend: ${data}`);
});

backend.stderr.on('data', (data) => {
  console.error(`Backend Error: ${data}`);
});

backend.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
});

console.log('Application started successfully!');
console.log('Backend server running on port 3000');