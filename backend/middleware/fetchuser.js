var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

const fetchuser = (req, res, next) => {
    
    let success=false
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({success, error: "Please Authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({success, error: "Please Authenticate using a valid token" })
    }

}


module.exports = fetchuser;