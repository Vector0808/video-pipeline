const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const videoQueue = require("../queues/videoQueue");

const processUpload = async (file) => {

    const videoId = uuidv4();
    const { updateStatus } = require("./status.service");

    const uploadFolder = path.join(process.cwd(), "uploads", videoId);

    fs.mkdirSync(uploadFolder, { recursive: true });

    const newFilePath = path.join(uploadFolder, "original.mp4");

    fs.renameSync(file.path, newFilePath);

 await updateStatus(videoId,{
    videoId,
    status:"queued",
    progress:0,
    currentStep:"Waiting in queue"
});

    await videoQueue.add("process-video", {
        videoId,
        filePath: newFilePath,
        originalName: file.originalname,
        size: file.size,
    });

    return {
        success: true,
        videoId,
        status: "queued",
    };
};

module.exports = {
    processUpload,
};