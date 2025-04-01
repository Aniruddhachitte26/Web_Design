const express = require('express');
const cors = require('cors');                   // <-- Added CORS middleware
const connectDB = require('./config/db.js');
const userRoutes = require('./app/routes/userRoutes.js');

const app = express();

// Allow cross-origin requests from your frontend
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the images folder
app.use('/images', express.static('images'));

// Mount user routes (endpoints like /user/create, /user/login, etc.)
app.use('/', userRoutes);

app.get('/', (req, res) => {    
    res.send('Hello from Node API server with CORS enabled');
});

const PORT = process.env.PORT || 3000;

(async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})();
