const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');

let db;

// eslint-disable-next-line consistent-return
async function initDb(url) {
  console.log('CONNECTING TO THE DATABASE');
  if (db) {
    console.warn('TRYING TO INIT DB AGAIN');

    return db;
  }
  db = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('MONGODB CONNECTED');
  return db;
}

function getDatabase() {
  assert.ok(db, 'Db has not been initialized. Please called init first.');
  return db;
}

// Database Name
const dbName = process.env.DB_NAME || 'admin';
const identifiers = {
  instance: 'instances',
  user: 'users',
};

async function clearCollection(collection) {
  await getDatabase()
    .db(dbName)
    .dropCollection(collection);
}

async function update(id, updateData) {
  const db = getDatabase().db(dbName);
  const result = await db
    .collection(process.env.COLLECTION)
    .updateOne({ _id: ObjectID(id) }, { $set: updateData });

  return result;
}

async function insert(data) {
  const db = getDatabase().db(dbName);
  const result = await db.collection(process.env.COLLECTION).insertMany([data]);

  return result;
}

async function findOneAndDelete(id) {
  const db = getDatabase().db(dbName);
  const result = await db
    .collection(process.env.COLLECTION)
    .findOneAndDelete({ _id: ObjectID(id) });

  return result;
}

async function query(query) {
  const db = getDatabase().db(dbName);

  // console.log(query);
  const result = await db
    .collection(process.env.COLLECTION)
    .find(query)
    .toArray();
  return result;
}

module.exports = {
  getDatabase,
  findOneAndDelete,
  initDb,
  insert,
  query,
  identifiers,
  update,
  clearCollection,
};
