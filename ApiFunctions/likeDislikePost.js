const postModel = require("../DatabaseFiles/postSchema");

const likeDislikePost = async (req, res) => {
    try {
        const userId = req.body.userId;
        const postId = req.params.postId;
        console.log(userId, postId);

        const post = await postModel.findOne({ _id: postId });
        console.log(post)
        if (!post) return res.status(404).json({ message: "Post not found" });

        const index = post.likes.indexOf(userId);

        if (index === -1) {
            // Like the post
            post.likes.push(userId);
        } else {
            // Unlike the post
            post.likes.splice(index, 1);
        }

        await post.save();

        res.status(200).json({
            response: "ok",
            message: index === -1 ? "Post liked" : "Post unliked",
            likes: post.likes
        });
    } catch (err) {
        res.status(500).json({ response: "fail", message: err.message });
    }

}


module.exports = likeDislikePost;