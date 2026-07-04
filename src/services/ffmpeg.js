const runProcess = require("../utils/runproccess");
const ffmpeg = require("ffmpeg-static");
const fs = require("fs");

const path = require("path");

const generateThumbnail = async (
    videoPath,
    outputFolder
) => {

    const thumbnailPath = path.join(
        outputFolder,
        "thumbnail.jpg"
    );

    await runProcess(
        ffmpeg,
        [
            "-ss",
            "00:00:05",

            "-i",
            videoPath,

            "-vframes",
            "1",

            "-q:v",
            "2",

            thumbnailPath
        ]
    );

    return thumbnailPath;

};

const generate360p = async (videoPath, outputFolder) => {

    const outputPath = path.join(
        outputFolder,
        "360p.mp4"
    );

    await runProcess(
        ffmpeg,
        [
            "-i",
            videoPath,

            "-vf",
            "scale=-2:360",

            "-c:v",
            "libx264",

            "-preset",
            "fast",

            "-crf",
            "23",

            "-c:a",
            "aac",

            outputPath
        ]
    );

    return outputPath;

};

const generate720p = async (videoPath, outputFolder) => {

    const outputPath = path.join(
        outputFolder,
        "720p.mp4"
    );

    await runProcess(
        ffmpeg,
        [
            "-i",
            videoPath,

            "-vf",
            "scale=-2:720",

            "-c:v",
            "libx264",

            "-preset",
            "fast",

            "-crf",
            "23",

            "-c:a",
            "aac",

            outputPath
        ]
    );

    return outputPath;

};

const generateHLS = async (videoPath, outputFolder) => {

    const hlsFolder = path.join(outputFolder, "hls");

    if (!fs.existsSync(hlsFolder)) {
        fs.mkdirSync(hlsFolder, {
            recursive: true
        });
    }

    const playlistPath = path.join(
        hlsFolder,
        "master.m3u8"
    );

    await runProcess(
        ffmpeg,
        [
            "-i",
            videoPath,

            "-profile:v",
            "baseline",

            "-level",
            "3.0",

            "-start_number",
            "0",

            "-hls_time",
            "6",

            "-hls_list_size",
            "0",

            "-f",
            "hls",

            playlistPath
        ]
    );

    return playlistPath;

};
module.exports = {
    generateThumbnail,
    generate360p,
    generate720p,
    generateHLS
};