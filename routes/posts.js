const express = require('express');
const router = express.Router();
const { getFirestore, collection, getDocs } = require('firebase-admin/firestore');
const getDataBase = require('../firebase/database');

// Access the initialized Firestore instance from the main server file
const db = getDataBase();


router.get('/', async (req, res) => {

        const posts = []

		const docRef = db.collection('posts');
		const snapShot = await docRef.get();
        if(snapShot){

            snapShot.forEach((doc) => {

                console.log(doc.data(),'dooooc')


            })
            res.send("Get Succseed")
        }
});

module.exports = router;