/*
Alright so I'm basically creating a file for the backend server.
I want to start the server on port 3000 and expose one API end point.
*/

// Import the Express Library into the project
const express = require('express');
// I'm creating an Express Application Instance
const app = express();
const PORT = 3000;  // This is just a contant to store the port number

// I'm creating a GET API endpoint at /api/name
app.get('/api/name', (req, res) => {
  res.json({ name: 'Varchas Jasti' });  // This is the required response we want to give
});

// Imma start the Express Server after giving the response, so it can listen for incoming requests
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});