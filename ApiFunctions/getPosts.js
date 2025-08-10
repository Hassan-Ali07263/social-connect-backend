const postModel = require("../DatabaseFiles/postSchema");

const getPosts = async (req, res) => {
    const getAllPosts = await postModel.find();
    if (getAllPosts.length > 0) {
        return res.send({ result: getAllPosts, response: "ok" })
    }
    else {
        return res.send({ result: "No posts found", response: "failed" })
    }
}
module.exports = getPosts;