const jwt = require("jsonwebtoken");
const { jwtKey } = require("../priveKeys");

const verifyToken = async (req, res, next) => {
    let token = req.headers['authorization'];

    token = token.split(" ")[1];
    if (token) {
        jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                return res.send({ result: "Error in token verification" })
            }
            else {
                next();
            }
        })
    }
    else {
        return res.send({ result: "No token received" })
    }
}
module.exports = verifyToken;