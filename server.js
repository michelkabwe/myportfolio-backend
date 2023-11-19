const express = require('express')
const app = express();
const postsRoutes = require('./routes/posts');


app.use('/api/posts', postsRoutes);



app.get('/', (req, res) => {
    res.send("Hello this is the server");
})




const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})