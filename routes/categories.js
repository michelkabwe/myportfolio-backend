const express = require('express');
const router = express.Router();
const db = require('../firebase/firebase-admin');

//const getDataBase = require('../firebase/database');

//const db = getDataBase();




router.get('/', async (req, res) => {
   try {
        const categories = []

		const docRef = db.collection('categories');
		const snapShot = await docRef.get();
        if(snapShot){

            snapShot.forEach((doc) => {
                categories.push(doc.data());
                console.log(categories)
            })
            res.status(200).send(categories);
        }
   } catch (error) {
    console.error("error", error);
   }
});

module.exports = router;
