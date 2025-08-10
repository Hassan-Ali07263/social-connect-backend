const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
    userId: String,
    image: String,
    name:String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: Date,
}, { collection: "stories" });

storySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const storyModel = mongoose.model("stories", storySchema);

module.exports = storyModel;
