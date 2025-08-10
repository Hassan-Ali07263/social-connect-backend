const storyModel = require("../DatabaseFiles/storySchema");

const allStories = async (req, res) => {
    console.log("start")
    const {userId}=req.params;
    const stories = await storyModel.find({ userId: { $ne: userId } })
        .sort({ createdAt: -1 });
        console.log("stories data is",stories)
    if (stories.length > 0) {
        res.json({ result: stories, response: "ok" });
    }
    else {
        res.json({ result: "No story found", response: "failed" })
    }
}
module.exports = allStories;