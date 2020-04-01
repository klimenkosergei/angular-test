const express = require('express');
const path = require('path');

const app = express();

// Add build resources
app.use(express.static(path.resolve(__dirname, 'client', 'dist', 'client')));

// Serve index.html for all requests
app.get('*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, 'client', 'dist', 'client', 'index.html')
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
