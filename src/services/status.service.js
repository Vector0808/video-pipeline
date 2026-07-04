const redis = require("../config/redis");

const getKey = (videoId) => `video:${videoId}`;

const updateStatus = async (videoId, data) => {
    await redis.hset(getKey(videoId), {
        ...data,
        updatedAt: new Date().toISOString()
    });
};

const getStatus = async (videoId) => {
    const data = await redis.hgetall(getKey(videoId));

    if (Object.keys(data).length === 0) {
        return null;
    }

    if (data.progress) {
        data.progress = Number(data.progress);
    }

    return data;
};

const deleteStatus = async (videoId) => {
    await redis.del(getKey(videoId));
};

module.exports = {
    updateStatus,
    getStatus,
    deleteStatus
};