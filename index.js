const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

require("./DatabaseFiles/mongoose");

const uploadImage = require("./ApiFunctions/uploadImage");
const Signup = require('./ApiFunctions/Signup');
const Login = require('./ApiFunctions/Login');
const verifyOtp = require('./ApiFunctions/verifyOtp');
const { checkEmail } = require('./ApiFunctions/checkEmail');
const updatePassword = require('./ApiFunctions/updatePassword');
const addPost = require('./ApiFunctions/addPost');
const getPosts = require('./ApiFunctions/getPosts');
const verifyToken = require('./ApiFunctions/verifyToken');
const likeDislikePost = require('./ApiFunctions/likeDislikePost');
const postComment = require('./ApiFunctions/postComment');
const getProfilePosts = require('./ApiFunctions/getProfilePosts');
const getUsers = require('./ApiFunctions/getUsers');
const searchPosts = require('./ApiFunctions/searchPosts');
const searchUsers = require('./ApiFunctions/searchUsers');
const followerApi = require('./ApiFunctions/followerApi');
const postStory = require('./ApiFunctions/postStory');
const getYourStory = require('./ApiFunctions/getYourStory');
const allStories = require('./ApiFunctions/allStories');


app.post("/Signup", uploadImage, Signup);

app.post("/Login", Login);

app.post("/sendOtp", checkEmail);

app.post("/verifyOtp", verifyOtp);

app.put("/updatePassword", updatePassword);

app.post("/addPost", uploadImage, addPost);

app.get("/getPosts", verifyToken, getPosts);

app.post("/likeDislikePost/:postId", likeDislikePost)

app.post("/postComment/:postId", postComment);

app.get("/getProfilePosts/:id", getProfilePosts);

app.get("/getUsers", getUsers)

app.get("/searchPosts/:key", searchPosts);

app.get("/searchUsers/:key", searchUsers);

app.post("/followerApi", followerApi);

app.post("/postStory", uploadImage, postStory);

app.get("/getYourStory/:userId", getYourStory);

app.get("/allStories/:userId", allStories);



app.get("/test", (req, res) => {
    res.send("Test fun")
})

app.listen(5000, '0.0.0.0', () => {
    console.log("server is running")
})