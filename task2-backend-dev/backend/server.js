require('dotenv').config();
const app = require('./app');
const { connect } = require('./src/config/db');

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connect();
  app.listen(PORT, () => {
    console.log(`DIMS server running on port ${PORT}`);
  });
};

start();