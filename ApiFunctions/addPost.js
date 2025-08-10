const postModel = require("../DatabaseFiles/postSchema");

const addPost = async (req, res) => {
    if (!req.body) {
        return res.send({ result: "No body recieved" })
    }

    const { userId, caption, question, hashtags, name, image } = req.body;
    const postImage = req.files?.post?.[0];

    if (req.body) {
        let data = new postModel({
            userId, caption, question, hashtags, name, image,
            post: postImage.path
        })
        data = await data.save();
        if (data) {
            return res.send({ result: "Uploaded", response: "ok" })
        }
        else {
            return res.send({ result: "Not uploaded due to some issue", response: "failed" })
        }
    }
    else {
        return res.send({ result: "Some data is missing" })
    }
}
module.exports = addPost;