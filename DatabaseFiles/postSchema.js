const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: String,
    image: String,
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
}, { _id: false });

const postSchema = mongoose.Schema({
    userId: String,
    image: String,
    caption: String,
    question: String,
    hashtags: String,
    name: String,
    post: String,
    time: { type: Date, default: Date.now },

    likes: [{ type: String }],

    comments: [commentSchema]
}, { collection: "posts" });

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;