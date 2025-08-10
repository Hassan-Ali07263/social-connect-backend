const userModel = require("../DatabaseFiles/userSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtKey } = require("../priveKeys");

const saltRounds = 10;


const Signup = async (req, res) => {
    if (!req.body) {
        return res.send({ result: "Add some data" })
    }
    console.log("start")

    const { firstName, lastName, email, description, password, confirmPassword } = req.body;
    const findEmail = await userModel.findOne({ email })
    if (findEmail) {
        return res.send({ result: "Email already registered" })
    }

    if (req.body) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, saltRounds);
        console.log(hashedPassword, hashedConfirmPassword);
        const image = req.files?.image?.[0];
        const coverImage = req.files?.coverImage?.[0];

        let data = new userModel({
            firstName, lastName, email, description,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword,
            image: image.path,
            coverImage: coverImage.path
        })
        data = await data.save();
        console.log(data)
        if (data) {
            jwt.sign({ data }, jwtKey, (err, token) => {
                if (token) {
                    return res.send({ result: data, auth: token, response: "ok" })
                }
                else {
                    return res.send({ result: "Token error", response: "failed" })
                }
            })
        }
        else {
            return res.send({ result: "No data saved" })
        }
    }
    else {
        return res.send({ result: "Some data is missing" })
    }
}
module.exports = Signup;