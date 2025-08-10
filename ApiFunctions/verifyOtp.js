const { otpStore } = require("./checkEmail");

const verifyOtp = async (req, res) => {
    if (!req.body) {
        return res.send({ result: "No body recieved" })
    }

    const { email, otp } = req.body;

    const record = otpStore[email];
    console.log(record)

    const { otp: storedOtp, expireAt } = record;

    if (Date.now() > expireAt) {
        delete otpStore[email]
        return res.send({ result: "Otp expired",response:"failed" })
    }
    else if (storedOtp === otp.toString()) {
        delete otpStore[email]
        return res.send({ result: "Otp matched", response: "ok" })
    }
    else {
        res.send({ result: "Wrong otp" })
    }

}
module.exports = verifyOtp;