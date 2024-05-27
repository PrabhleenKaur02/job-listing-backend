const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

// protected route
router.get('/', verifyToken, (req, res) => {
    res.status(200).json({
        msg: "Protected route accessed!"
    });
});

module.exports = router;
