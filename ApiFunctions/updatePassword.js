const { response } = require("express");
const userModel = require("../DatabaseFiles/userSchema");
const bcrypt = require("bcrypt");
const saltRound = 10;

const updatePassword = async (req, res) => {
    if (!req.body) {
        return res.send({ result: "No body received" })
    }

    const { email, password, confirmPassword } = req.body;

    if (req.body) {
        const checkEMail = await userModel.findOne({ email });
        if (checkEMail) {
            const hashedPassword = await bcrypt.hash(password, saltRound);
            const hashedConfirmPassword = await bcrypt.hash(confirmPassword, saltRound);

            const updation = await userModel.updateOne(
                { email },
                {
                    $set: {
                        password: hashedPassword,
                        confirmPassword: hashedConfirmPassword
                    }
                }
            )
            console.log(updation)
            if (updation.acknowledged == true && updation.modifiedCount === 1) {
                return res.send({ result: checkEMail, response: "ok" })
            }
            else {
                return res.send({ result: "Password not updated", response: "failed" })
            }
        }
        else {
            return res.send({ result: "No data found wit such email" })
        }
    }
    else {
        return res.send({ result: "Some data is missing" })
    }
}
module.exports = updatePassword;