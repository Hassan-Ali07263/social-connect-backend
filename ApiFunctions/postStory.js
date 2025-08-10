const storyModel = require("../DatabaseFiles/storySchema");

const postStory = async (req, res) => {
    if (!req.body) {
        return res.send({ result: "Some data is missing" })
    }

    const { userId,name } = req.body;
    const storyImage = req.files?.image?.[0];
    console.log(storyImage)

    if (req.body) {
        let story = new storyModel({
            userId,name,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            image: storyImage.path
        })
        story = await story.save();

        if (story) {
            return res.send({ result: story, response: "ok" })
        }
        else {
            return res.send({ result: "No story updated", response: "failed" })
        }
    }
}
module.exports = postStory;