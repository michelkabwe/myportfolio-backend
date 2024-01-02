require('dotenv').config();
const admin = require("firebase-admin");



const serviceAccount = require("./myportfolio-private-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.databaseURL,
  storageBucket: process.env.storageBucket,

});

function getDataBase(){
  return admin.firestore();
}



module.exports = { getDataBase };




