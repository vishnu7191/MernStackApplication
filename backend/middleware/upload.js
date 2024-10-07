const multer = require('multer');

// Set up multer to store the image in memory as a buffer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "../src/assets/");
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage : storage});

module.exports = upload;
