var jwt = require('jsonwebtoken');



const verifyToken = (req, res, next) => {
    let token = req.body.token;
    try {
        let user= jwt.verify(token, process.env.jwtSignature);
        delete user.iat;
        delete user.exp;
        req.user = user;
        next();
    } catch (error) {
        return res.json({message: 'error',contentError:"verifyToken không đúng"});
    }

}

module.exports = verifyToken;