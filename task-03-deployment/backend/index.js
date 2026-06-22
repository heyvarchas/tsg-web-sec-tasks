const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api/name', (req, res) => {
  res.json({ name: 'Varchas Jasti' });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});