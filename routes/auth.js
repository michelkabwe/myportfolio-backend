const express = require('express');
const router = express.Router();
const { getDataBase } = require('../firebase/firebase-admin');
const db = getDataBase();

router.post('/', async (req, res) => {

  try {
    const { email, password, username } = req.body;
    console.log(email,password, username)


    const emailSnapshot = db.collection('users').where('email', '==', email).limit(1).get();

    if (!emailSnapshot.empty) {
        return res.status(400).json({ message: 'Email is  correct' });
    }




    //console.log(email,password, username,'auuuuth');



    res.send('Authenthication success');


  } catch (error) {
    console.error("Authentication failed", error);
    res.send(500);
  }
})





module.exports = router;