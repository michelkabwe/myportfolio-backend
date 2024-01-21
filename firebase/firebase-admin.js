const admin = require("firebase-admin");

const serviceAccount = require("./myportfolio-private-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://myportfolio-4c53c-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "myportfolio-4c53c.appspot.com"

});

function getDataBase(){
  return admin.firestore();
}



module.exports = { getDataBase };




