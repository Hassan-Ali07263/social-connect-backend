const userModel = require("../DatabaseFiles/userSchema");

const getUsers = async (req,res) => {
    const data = await userModel.find({});
    if (data.length > 0) {
        return res.send({ result: data, response: "ok" })
    }
    else {
        return res.send({ result: "No data found", response: "failed" })
    }
}
module.exports = getUsers;