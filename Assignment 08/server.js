const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./app/routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const userController = require('./app/controllers/userController');

const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static('images'));

app.use('/user', userRoutes);

app.get('/getUser', userController.getAllUsers);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('Hello from Node API server on port 3001');
});

const PORT = process.env.PORT || 3001;

(async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
})();
