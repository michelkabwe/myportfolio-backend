const express = require('express')
const app = express();
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');

app.use(express.json());



app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);



app.get('/', (req, res) => {
    res.send("Hello this is the server");
})




const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})