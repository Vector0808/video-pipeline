const fs = require("fs");
const path = require("path");

const getOutputFolder = (videoId) => {

    const outputFolder = path.join(
        __dirname,
        "..",
        "..",
        "outputs",
        videoId
    );

    if (!fs.existsSync(outputFolder)) {

        fs.mkdirSync(outputFolder, {
            recursive: true
        });

    }

    return outputFolder;

};

module.exports = {
    getOutputFolder
};