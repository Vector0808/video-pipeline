const { Worker } = require("bullmq");
const connection = require("../config/redis");

const { processVideo } = require("../services/video");
const worker = new Worker(
  "video-processing",

  async (job) => {

   // console.log("================================");
   // console.log(" Processing Job");
   // console.log("Job ID:", job.id);
   //console.log("Job Name:", job.name);
   //console.log("Job Data:", job.data);
    //console.log("================================");
    await processVideo(job.data);

    
    //await new Promise(resolve => setTimeout(resolve, 3000));

    return {
      success: true
    };
  },

  {
    connection,
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} Completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job.id} Failed`); //testing purpose
  console.log(err.message);
});

console.log("Worker Started...");