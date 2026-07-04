const runProcess = require("../utils/runproccess");
const ffprobe = require("ffprobe-static");

console.log("FFPROBE PATH:", ffprobe.path);

const getMetadata = async (videoPath) => {

     console.log("VIDEO PATH:", videoPath);

    const output = await runProcess(
        ffprobe.path,
        [
            "-v",
            "quiet",

            "-print_format",
            "json",

            "-show_format",

            "-show_streams",

            videoPath
        ]
    );

    return JSON.parse(output);

};

module.exports = {
    getMetadata
};