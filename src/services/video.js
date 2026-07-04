const fs = require("fs");
const path = require("path");

const { getMetadata } = require("./ffprobe");
const { getOutputFolder } = require("./storage");
const { updateStatus } = require("./status.service");

const {
    generateThumbnail,
    generate360p,
    generate720p,
    generateHLS,
} = require("./ffmpeg");

const processVideo = async (jobData) => {

    const { videoId, filePath } = jobData;

    try {

        console.log("📹 Reading Video Metadata...");

        const metadata = await getMetadata(filePath);

        const outputFolder = getOutputFolder(videoId);

        fs.writeFileSync(
            path.join(outputFolder, "metadata.json"),
            JSON.stringify(metadata, null, 2)
        );

        await updateStatus(videoId, {
            progress: 25,
            currentStep: "Metadata Completed"
        });

        await generateThumbnail(filePath, outputFolder);

        await updateStatus(videoId, {
            progress: 40,
            currentStep: "Thumbnail Generated"
        });

        await generate360p(filePath, outputFolder);

        await updateStatus(videoId, {
            progress: 60,
            currentStep: "360p Generated"
        });

        await generate720p(filePath, outputFolder);

        await updateStatus(videoId, {
            progress: 80,
            currentStep: "720p Generated"
        });

        await generateHLS(filePath, outputFolder);

        await updateStatus(videoId, {
            status: "completed",
            progress: 100,
            currentStep: "Completed"
        });

    } catch (err) {

        await updateStatus(videoId, {
            status: "failed",
            progress: 0,
            currentStep: err.message
        });

        throw err;
    }

};

module.exports = {
    processVideo,
};