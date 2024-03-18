const express = require('express');
const router = express.Router();
const { getDataBase } = require('../firebase/firebase-admin');
const db = getDataBase();


router.get('/', async (req, res) => {

    try {
        const posts = []

        const docRef = db.collection('posts');
        const snapShot = await docRef.get();
        if (snapShot) {
            snapShot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                posts.push(data);
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
            const dataWithId = { id: docRef.id, ...userData }
            res.status(200).send(dataWithId);
        }
    } catch (error) {
        console.error('Server error, Something went wrong!' + error.message);
        res.status(500).send(error.message);
    }
})

router.get('/:id/edit', async (req, res) => {
    const id = req.params.id;

    try {

        const docRef = await db.collection('posts').doc(id).get();

        if (!docRef.exists) {
            res.status(404).send("Post not found!");
            return;
        } else {
            const userData = docRef.data();
            const dataWithId = { id: docRef.id, ...userData }
            res.status(200).send(dataWithId);
        }
    } catch (error) {
        console.error('Server error, Something went wrong!' + error.message);
        res.status(500).send(error.message);
    }
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const docRef = await db.collection('posts').doc(id).get();

        if (!docRef.exists) {
            res.status(404).send("Post id does not exists!");
            return;
        } else {
            await db.collection('posts').doc(id).delete();
            res.status(200).send("Post deleted");

        }
    }
    catch (error) {
        console.error('Server error, Something went wrong!' + error.message);
        res.status(500).send(error.message);
    }
});


router.post('/', async (req, res) => {

    try {
        const { title, content, selectedCategory, imageUrl, liveUrl, sourceCode, codeLangIcon } = req.body;
        console.log(codeLangIcon,'iconElementiconElement')
        const docRefId = await db.collection('posts').doc();

        const newPostref = await db.collection('posts').add({
            id: docRefId,
            title: title,
            content: content,
            category_id: selectedCategory,
            imageUrl: imageUrl,
            liveUrl: liveUrl,
            sourceCode: sourceCode,
            codeLangIcon: codeLangIcon



        });

        const newPostDoc = await newPostref.get();
        const createdPost = { id: newPostDoc.id, ...newPostDoc.data()}


        res.status(201).json({ message: ' Post created sccessfully', createdPost: createdPost });

    } catch (error) {
        console.error("error", error);
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.put('/:id/edit', async (req, res) => {

   try {

        const { title, content, category_id, imageUrl, liveUrl, sourceCode } = req.body;


        const postId = req.params.id;

        const updateFields = {
            title: title,
            content: content,
            category_id: category_id || null,
            imageUrl: imageUrl,
            liveUrl: liveUrl,
            sourceCode: sourceCode
        };

        await db.collection('posts').doc(postId).update(updateFields);

        const updatedPostDoc = await db.collection('posts').doc(postId).get();
        const updatedPost = { id: updatedPostDoc.id, ...updatedPostDoc.data() };

        res.status(200).json({ message: 'Post updated successfully', updatedPost: updatedPost });

    } catch (error) {
        console.log("error", error);
        res.status(500).json({error: 'Internal Server Error'});
    }

})




module.exports = router;