const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads"); // Specify the destination folder for uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Set the file name to be unique
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
