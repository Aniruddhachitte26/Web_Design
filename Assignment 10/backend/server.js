const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const userRoutes = require('./app/routes/userRoutes.js');
const jobRoutes = require('./app/routes/jobRoutes.js');

const app = express();

// Allow cross-origin requests from your frontend
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the images folder
app.use('/images', express.static('images'));

// Mount user routes
app.use('/', userRoutes);

// Mount job routes
app.use('/jobs', jobRoutes);

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