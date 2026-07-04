const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const errorMiddleware = require("./middleware/error.middleware");
const routes = require("./routes/videos");

const app = express();

app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    "/outputs",
    express.static(path.join(process.cwd(), "outputs"))
);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Video Processing API Running"
    });
});

app.use("/videos", routes)
app.use(errorMiddleware)

module.exports = app;