/** SERVER CONFIG */
require('dotenv').config();
const app = require('./app');
const { initDb } = require('../src/services/Database');

/** GET DATABASE URL */
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017';

/** RUN SERVER */
async function start() {
  await initDb(DB_URL);
  const server = await app();
  server.listen(server.get('port'), () => {
    console.log(`SERVER RUNNING (http://127.0.0.1:${server.get('port')})`);
  });
}

start();
