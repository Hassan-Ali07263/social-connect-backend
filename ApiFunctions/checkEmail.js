const userModel = require("../DatabaseFiles/userSchema");
const nodemailer = require('nodemailer');
const { primaryEmail, primaryEmailPass } = require("../priveKeys");
const otpStore = {};

const checkEmail = async (req, res) => {
    if (!req.body) {
        return res.send({ result: "Body is missing" })
    }

    const { email } = req.body;

    if (req.body) {
        const checking = await userModel.findOne({ email });
        if (checking) {
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            const expireAt = Date.now() + 5 * 60 * 1000;
            otpStore[email] = { otp, expireAt };
            console.log(otpStore[email])

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                auth: {
                    user: primaryEmail,
                    pass: primaryEmailPass
                }
            })

            const mailData = {
                from: primaryEmail,
                to: email,
                subject: 'Your One-Time Password (OTP) for Secure Verification',
                html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
           <h2 style="color: #2c3e50;">🔐 OTP Verification</h2>
           <p style="font-size: 16px; color: #333;">Dear User,</p>
           <p style="font-size: 16px; color: #333;">
             Thank you for using our service. To proceed with your verification, please use the following One-Time Password (OTP):
           </p>
           <div style="background-color: #f4f4f4; padding: 20px; text-align: center; border-radius: 6px; margin: 20px 0;">
             <span style="font-size: 30px; letter-spacing: 4px; font-weight: bold; color: #34495e;">${otp}</span>
           </div>
           <p style="font-size: 14px; color: #555;">
             This OTP is valid for the next 5 minutes. Please do not share it with anyone for security reasons.
           </p>
           <p style="font-size: 16px; color: #333;">Regards,<br><strong>Hassan Ali</strong></p>
           <hr style="margin-top: 30px;">
           <p style="font-size: 12px; color: #999;">
             If you did not request this OTP, please ignore this email or contact support immediately.
           </p>
         </div>`
            }

            transporter.sendMail(mailData, (err, success) => {
                if (err) {
                    return res.send({ result: "Something went wrong" })
                }
                else {
                    return res.send({ result: checking, response: "ok" })
                }
            })
        }
        else {
            return res.send({ result: "No registered email found" })
        }
    }
    else {
        return res.send({ result: "No body recieved" })
    }
}
module.exports = { otpStore, checkEmail };