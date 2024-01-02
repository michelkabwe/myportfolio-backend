const express = require('express');
const path = require('path');


const server = express();

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE', // Remove spaces after commas
  credentials: true // Corrected spelling
};

server.use(cors());
server.use(cors(corsOptions));



// Set up API routes
const postsRoutes = require('./routes/posts');
const uploadRoutes = require('./routes/upload');
const usersRoutes = require('./routes/users');
const categoriesRoutes = require('./routes/categories');

server.use(express.json());
server.use('/api/posts', postsRoutes);
server.use('/api/users', usersRoutes);
server.use('/api/categories', categoriesRoutes);
server.use('/api/upload', uploadRoutes);


server.get('/', (req, res) => {
  res.send('Helloworld');
})

// Serve static files from the React build directory
//server.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle all other routes by serving the React app's index.html
/*server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});*/


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
