const fs = require("fs");
const path = require("path");

const uploadService = require("../services/upload.services");
const { getStatus: getVideoStatus } = require("../services/status.service");
const { deleteStatus } = require("../services/status.service");

const uploadVideo = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No video file provided"
            });
        }
        const result = await uploadService.processUpload(req.file);
        res.status(202).json(result);
    } catch (err) {
        next(err);
    }
};

const getStatus = async (req,res)=>{

    const job = await getVideoStatus(req.params.id);

    if(!job){

        return res.status(404).json({
            success:false,
            message:"Video not found"
        });

    }

    res.json({
        success:true,
        data:job
    });

};
const getMetadata = (req, res) => {

    const file = path.join(
        process.cwd(),
        "outputs",
        req.params.id,
        "metadata.json"
    );

    if (!fs.existsSync(file)) {
        return res.status(404).json({
            success: false,
            message: "Metadata not found"
        });
    }

    res.sendFile(file);
};

const getThumbnail = (req, res) => {

    const file = path.join(
        process.cwd(),
        "outputs",
        req.params.id,
        "thumbnail.jpg"
    );

    if (!fs.existsSync(file)) {
        return res.status(404).json({
            success: false,
            message: "Thumbnail not found"
        });
    }

    res.sendFile(file);
};

const streamVideo = (req, res) => {

    const file = path.join(
        process.cwd(),
        "outputs",
        req.params.id,
        "hls",
        "master.m3u8"
    );

    if (!fs.existsSync(file)) {
        return res.status(404).json({
            success: false,
            message: "Playlist not found"
        });
    }

    res.sendFile(file);
};

const deleteVideo = async (req, res) => {

    const uploadFolder = path.join(
        process.cwd(),
        "uploads",
        req.params.id
    );

    const outputFolder = path.join(
        process.cwd(),
        "outputs",
        req.params.id
    );

    if (fs.existsSync(uploadFolder)) {
        fs.rmSync(uploadFolder, {
            recursive: true,
            force: true
        });
    }

    if (fs.existsSync(outputFolder)) {
        fs.rmSync(outputFolder, {
            recursive: true,
            force: true
        });
    }
        await deleteStatus(req.params.id);
    res.json({
        success: true,
        message: "Video deleted successfully"
    });
};

module.exports = {
    uploadVideo,
    getStatus,
    getMetadata,
    getThumbnail,
    streamVideo,
    deleteVideo
};