const storyModel = require("../DatabaseFiles/storySchema");

const getYourStory = async (req, res) => {
    const story = await storyModel.findOne({ userId: req.params.userId });

    if (story) {
        if (new Date(Date.now()) < story.expiresAt) {
            return res.send({ result: story, response: "ok" })
        }
        else {
            return res.send({ result: "expired", response: "expired" })
        }
    }
    else {
        return res.send({ result: "No story found", response: "failed" })
    }
}
module.exports = getYourStory;