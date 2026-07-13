const videoQueue = require('./src/queues/videoQueue');


async function clear() {
    await videoQueue.obliterate({ force: true });
    console.log("Queue cleared");
    process.exit(0);
}

clear();