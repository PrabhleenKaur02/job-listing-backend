// const express = require('express');
// const router = express.Router();
// const authControllers = require('../controller/userController');

// router.route('/register').post(authControllers.register);

// module.exports = router;

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const router = express.Router();

const secret = "secret123";
// // user registeration
router.post('/register', async(req, res) => {
   try {
    const { fullName, hash_password } = req.body;
    const hashedPassword = await bcrypt.hash(hash_password, 10);
    const user = new User({ fullName, hash_password: hashedPassword });
    await user.save();

    res.status(201).json({
        msg: 'User registered successfully!'
    });
   } catch (error) {
    res.status(500).json({
        error: "Registration failed. Try again."
    });
   }
});

// // user login
router.post('/login', async(req, res) => {
    try {
        const { fullName, hash_password } = req.body;
        const user = await User.findOne({ fullName });
        if(!user) {
            return res.status(401).json({
                error: "Authentication failed"
            });
        }
        const passwordMatch = await bcrypt.compare(hash_password, user.hash_password);
        if (!passwordMatch) {
            return res.status(401).json({
                error: "Authentication failed"
            });
        }
        const token = jwt.sign({ userID: user._id }, secret, {
            expiresIn: '1h'
        });
        res.status(200).json({ token })
    } 
    
    catch (error) {
        res.status(500).json({
            error: "Oops! Login failed"
        });
    }
});

module.exports = router;