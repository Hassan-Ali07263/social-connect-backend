const multer = require('multer');
const path = require('path');

const uploadImage = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, file.fieldname + "_" + Date.now() + ext)
        }
    })
}).fields([
    { name: "image", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
    { name: "post", maxCount: 1 }
]);

module.exports = uploadImage;