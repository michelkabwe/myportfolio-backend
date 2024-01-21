const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { getDataBase } = require('../firebase/firebase-admin');
const db = getDataBase();

router.get('/', async (req, res) => {

    try {

        const usersList = []

        const docRef = db.collection('users');
        const snapShot = await docRef.get();
        if (snapShot) {
            snapShot.forEach((doc) => {
                usersList.push(doc.data());
            })
            res.status(200).send(usersList);
        } else {
            return res.status(404).send(" Error Users not found");
        }

    } catch (error) {
        console.log(" Signup failed", error)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {

        const docRef = await db.collection('users').doc(id).get();

        if (!docRef.exists) {
            res.status(404).send("User not found!");
            return;
        } else {
            const userData = docRef.data();
            const dataWithId = {id: docRef.id, ...userData}
            res.status(200).send(dataWithId);


        }








    } catch (error) {
        console.error('User not found!' + error.message);
        res.status(500).send(error.message);
    }
})

router.post('/', async (req, res) => {
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
            username: username
        })
        res.status(201).json("You Successfully signed up!").send(newuser);

    } catch (error) {
        console.log(" Signup failed", error)
    }
})

module.exports = router;

