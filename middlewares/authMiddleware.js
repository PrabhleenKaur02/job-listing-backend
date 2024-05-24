const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers('Authorization');
    if(!token){
        return res.status(401).json({
            error: "Access denied"
        });
    }

    try {
        const decoded = jwt.verify(token, 'secret123');
        req.userID = decoded.userID;
        next();
    } catch (error) {
        res.status(401).json({
            error: "Invalid token"
        });
    }
};


module.exports = verifyToken;