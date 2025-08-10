const postModel = require("../DatabaseFiles/postSchema");

const getProfilePosts = async (req, res) => {
    if (!req.params) {
        return res.send({ result: "No params received" })
    }

    const getPost = await postModel.find({ userId: req.params.id })
    if (getPost.length > 0) {
        return res.send({ result: getPost, response: "ok" })
    }
    else {
        return res.send({ result: "No data found", response: "failed" })
    }
}
module.exports = getProfilePosts;