const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({

    destination(req, file, cb) {

        const uploadDir = path.join(process.cwd(), "uploads");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },

    filename(req, file, cb) {

        cb(null, Date.now() + path.extname(file.originalname));

    }

});

const fileFilter = (req, file, cb) => {

    if (file.mimetype !== "video/mp4") {

        return cb(new Error("Only MP4 files allowed"));

    }

    cb(null, true);

};

module.exports = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 1024 * 1024 * 1024

    }

});