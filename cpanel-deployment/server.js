const express = require('express');
const path = require('path');
const { createServer } = require('http');

// Create express app
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Import and use backend routes
const backendApp = require('./backend/index.js');
app.use('/api', backendApp);

// Serve frontend for all other routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start server
const server = createServer(app);
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Frontend available at http://localhost:${port}`);
  console.log(`Backend API available at http://localhost:${port}/api`);
});