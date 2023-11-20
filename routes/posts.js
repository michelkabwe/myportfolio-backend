const express = require('express');
const router = express.Router();
const getDataBase = require('../firebase/database');

const db = getDataBase();




router.get('/', async (req, res) => {
   try {
        const posts = []

		const docRef = db.collection('posts');
		const snapShot = await docRef.get();
        if(snapShot){

            snapShot.forEach((doc) => {
                posts.push(doc.data());
            })
            res.status(200).send(posts);
        }
   } catch (error) {
    console.error("error", error);
   }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {

        const docRef = await db.collection('posts').doc(id).get();

        if (!docRef.exists) {
            res.status(404).send("Post not found!");
            return;
        } else {
            const userData = docRef.data();
            const dataWithId = {id: docRef.id, ...userData}
            res.status(200).send(dataWithId);
        }
    } catch (error) {
        console.error('Server error, Something went wrong!' + error.message);
        res.status(500).send(error.message);
    }
})

router.post('/:id', async (req, res) => {
    // Adding post with auto generated id
   try {
        const { title, content } = req.body;

        await db.collection('posts').add({
            title: title,
            content: content,
        });

        res.status(201).json({ message: ' Post created sccessfully'})

   } catch (error) {
    console.error("error", error);
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
   }
});

module.exports = router;