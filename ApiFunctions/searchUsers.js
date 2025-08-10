const userModel = require("../DatabaseFiles/userSchema");

const searchUsers = async (req, res) => {
    const getAllUsers = await userModel.find();
    if (getAllUsers.length > 0) {
        const searchUser = await userModel.find({
            "$or": [
                { firstName: { $regex: req.params.key } },
                { lastName: { $regex: req.params.key } },
                { description: { $regex: req.params.key } },
                { email: { $regex: req.params.key } },
            ]
        })
        if (searchUser.length > 0) {
            return res.send({ result: searchUser, response: "ok" })
        }
        else {
            return res.send({ result: "no data found", response: "failed" })
        }
    }
    else {
        return res.send({ result: "No data in the list" })
    }
}
module.exports = searchUsers;