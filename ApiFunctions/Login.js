const userModel = require("../DatabaseFiles/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../priveKeys");

const Login = async (req, res) => {
    if (!req.body) {
        return res.send({ result: "No data recieved" })
    }

    const { email, password } = req.body;

    if (req.body) {
        const findEmail = await userModel.findOne({ email });
        if (findEmail) {
            const checkPassword = await bcrypt.compare(password, findEmail.password)
            if (checkPassword) {
                jwt.sign({ findEmail }, jwtKey, (err, token) => {
                    if (token) {
                        return res.send({ result: findEmail, auth: token, response: "ok" })
                    }
                    else {
                        return res.send({ result: "Token generation failed" })
                    }
                })
            }
            else {
                return res.send({ result: "Wrong password" })
            }
        }
        else {
            return res.send({ result: "No email found" })
        }
    }
}
module.exports = Login;