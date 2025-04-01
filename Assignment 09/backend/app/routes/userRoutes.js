        const express = require('express');
        const router = express.Router();
        const userController = require('../controllers/userController.js');
        const upload = require('../middleware/upload');


        router.post('/', userController.createUser);

        router.put('/edit', userController.updateUser);

        router.delete('/delete', userController.deleteUser);

        router.get('/getUser', userController.getAllUsers);

        router.post('/uploadImage', upload.single('image'), userController.uploadImage);

        router.post('/login', userController.loginUser); // Login endpoint

        module.exports = router;
