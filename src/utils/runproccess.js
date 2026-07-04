const { spawn } = require("child_process");

const runProcess = (command, args = []) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args);

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("error", reject);

    child.on("close", (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(stderr));
      }
    });
  });
};

module.exports = runProcess;