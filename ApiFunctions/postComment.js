const postModel = require("../DatabaseFiles/postSchema");

const postComment = async (req, res) => {
    const { postId } = req.params;
    const { userId, name, image, text } = req.body;

    if (!text || !userId) {
        return res.status(400).json({ response: "fail", message: "Missing required fields" });
    }

    try {
        const comment = {
            userId,
            name: name || "",   // Optional
            image: image || "", // Optional
            text,
            timestamp: new Date()
        };

        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ response: "fail", message: "Post not found" });
        }

        post.comments.push(comment);
        await post.save();

        return res.status(200).json({
            response: "ok",
            message: "Comment added",
            comments: post.comments
        });
    } catch (err) {
        console.error("Comment error:", err);
        return res.status(500).json({ response: "fail", message: "Server error" });
    }
}
module.exports = postComment;