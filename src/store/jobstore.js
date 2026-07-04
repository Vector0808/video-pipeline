{/*const jobs = new Map();

const  updateStatus = (videoId, data) => {
    const existing = jobs.get(videoId) || {};

    jobs.set(videoId, {
        ...existing,
        ...data,
        updatedAt: new Date()
    });

    console.log("====== UPDATE ======");
    console.log("Video:", videoId);
    console.log([...jobs.keys()]);
};

const getJob = (videoId) => {

    console.log("====== GET ======");
    console.log("Looking for:", videoId);
    console.log("Available:", [...jobs.keys()]);

    return jobs.get(videoId);
};

const deleteJob = (videoId) => jobs.delete(videoId);

module.exports = {
    updateStatus,
    getJob,
    deleteJob
};*/}