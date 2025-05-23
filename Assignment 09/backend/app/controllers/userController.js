const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { validateEmail, validateFullName, validatePassword } = require('../middleware/validation');

const saltRounds = 10;



const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email); // Debug logging

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Compare the plaintext password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    res.status(200).json({ message: 'Login successful.', user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


const createUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const errors = [];
        if (!validateFullName(fullName)) {
            errors.push("Invalid full name. Only alphabetic characters allowed.");
        }
        if (!validateEmail(email)) {
            errors.push("Invalid email address.");
        }
        if (!validatePassword(password)) {
            errors.push("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a digit, and a special character.");
        }
        if (errors.length > 0) {
            return res.status(400).json({ error: "Validation failed.", details: errors });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ error: "User with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({
            fullName,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: "User created successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error." });
    }
};

const updateUser = async (req, res) => {
    try {
        const { email, fullName, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required to identify the user." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const errors = [];
        if (fullName && !validateFullName(fullName)) {
            errors.push("Invalid full name. Only alphabetic characters allowed.");
        }
        if (password && !validatePassword(password)) {
            errors.push("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a digit, and a special character.");
        }
        if (errors.length > 0) {
            return res.status(400).json({ error: "Validation failed.", details: errors });
        }

        if (fullName) user.fullName = fullName;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            user.password = hashedPassword;
        }

        await user.save();
        res.status(200).json({ message: "User updated successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error." });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email is required to identify the user." });
        }

        const user = await User.findOneAndDelete({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error." });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { fullName: 1, email: 1, password: 1, imagePath: 1 });
        res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error." });
    }
};

const uploadImage = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        if (user.imagePath) {
            return res.status(400).json({ error: "Image already exists for this user." });
        }

        if (!req.file) {
            return res.status(400).json({ error: "No image file uploaded." });
        }

        user.imagePath = `/images/${req.file.filename}`;
        await user.save();

        res.status(201).json({ message: "Image uploaded successfully.", filePath: user.imagePath });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    uploadImage,
    loginUser
};
