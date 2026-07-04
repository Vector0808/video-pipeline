const express = require("express");

const upload = require("../middleware/upload.middleware");

const {
    uploadVideo,
    getStatus,
    getMetadata,
    getThumbnail,
    streamVideo,
    deleteVideo
} = require("../controllers/video_controller");

const router = express.Router();

router.post("/", upload.single("video"), uploadVideo);

router.get("/:id/status", getStatus);

router.get("/:id/metadata", getMetadata);

router.get("/:id/thumbnail", getThumbnail);

router.get("/:id/stream", streamVideo);

router.delete("/:id", deleteVideo);

module.exports = router;