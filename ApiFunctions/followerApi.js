const userModel = require("../DatabaseFiles/userSchema");
const mongoose = require('mongoose')
const followerApi = async (req, res) => {
    try {
        const { targetUserId, currentUserId } = req.body;

        if (currentUserId === targetUserId) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        const targetUser = await userModel.findById(targetUserId);
        const currentUser = await userModel.findById(currentUserId);

        if (!targetUser || !currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        let followed;

        // Check if already following
        if (currentUser.following.some(id => id.toString() === targetUserId)) {
            // Unfollow
            currentUser.following = currentUser.following.filter(
                id => id.toString() !== targetUserId
            );
            targetUser.followers = targetUser.followers.filter(
                id => id.toString() !== currentUserId
            );
            followed = false;
        } else {
            // Follow
            currentUser.following.push(new mongoose.Types.ObjectId(targetUserId));
            targetUser.followers.push(new mongoose.Types.ObjectId(currentUserId));
            followed = true;
        }

        await currentUser.save();
        await targetUser.save();

        return res.json({
            followed,
            followers: targetUser.followers,  // who follows the target
            following: currentUser.following // who current user follows
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
module.exports = followerApi;