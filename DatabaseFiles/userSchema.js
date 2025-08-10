const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    description: String,
    image: String,
    coverImage: String,
    password: String,
    confirmPassword: String,
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

}, { collection: "users" });

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;