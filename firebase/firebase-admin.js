const admin = require('firebase-admin');
require('dotenv').config();

const firebaseKeyPath = process.env.FIREBASE_KEY_PATH;
const databaseURL = process.env.FIREBASE_DATABASE_URL;
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
const serviceAccount = require(firebaseKeyPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL,
  storageBucket: storageBucket
});

function getDataBase() {
  return admin.firestore();
}

module.exports = { getDataBase };
