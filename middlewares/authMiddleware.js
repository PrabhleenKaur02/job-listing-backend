const jwt = require('jsonwebtoken');
require('dotenv').config()

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const secret = process.env.JWT_SECRET
     const token = authHeader.split(' ')[1];
    console.log("1");
    if(!token){
    console.log("2");
        return res.status(401).json({
            error: "Access denied"
        });
    } 
    else{
    console.log("3");

    try {
    console.log("4");
        const decoded = jwt.verify(token, secret);
        req.userID = decoded.userID;
        console.log(decoded);
        // return { success: true, data: decoded };
        console.log("5");
        next();
    } catch (error) {
        res.status(401).json({
            error: "Invalid token!"
        });
    }
}};


module.exports = verifyToken;