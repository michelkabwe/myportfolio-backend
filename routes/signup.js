const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const getDataBase = require('../firebase/database');

const db = getDataBase();

router.post('/',async (req, res ) =>  {
    try {
        const { email, password, username } = req.body;

        const userSnapshot = await admin.firestore().collection('users').where('email', '==', email).limit(1).get();
        const usernameSnapshot = await admin.firestore().collection('users').where('username', '==', username).limit(1).get();

        if (!userSnapshot.empty) {
            return res.status(400).json({ message: 'Email already exists' });
          }

          if (!usernameSnapshot.empty) {
            return res.status(400).json({ message: 'Username already exists' });
          }


       const newuser = await db.collection('users').add({
            email: email,
            password: password,
            username:username
        })
        res.status(201).json("You Successfully signed up!").send(newuser);

    } catch (error) {
        console.log(" Signup failed", error)
    }



} )

module.exports = router;


