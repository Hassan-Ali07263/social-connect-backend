const postModel = require("../DatabaseFiles/postSchema");

const searchPosts = async (req, res) => {
    const getAllPosts = await postModel.find();
    if (getAllPosts.length > 0) {
        const searchPost = await postModel.find({
            "$or": [
                { name: { $regex: req.params.key } },
                { caption: { $regex: req.params.key } },
                { question: { $regex: req.params.key } },
                { hashtags: { $regex: req.params.key } },
            ]
        })
        if (searchPost.length > 0) {
            return res.send({ result: searchPost, response: "ok" })
        }
        else {
            return res.send({ result: "no data found", response: "failed" })
        }
    }
    else{
        return res.send({result:"No data in list"})
    }
}
module.exports = searchPosts;