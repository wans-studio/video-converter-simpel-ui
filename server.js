const express = require("express");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });

app.post("/convert", upload.single("video"), (req, res) => {
    const input = req.file.path;
    const outputFormat = req.body.format;
    const outputName = Date.now() + "." + outputFormat;
    const outputPath = "output/" + outputName;

    ffmpeg(input)
        .toFormat(outputFormat)
        .on("end", () => {
            fs.unlinkSync(input);
            res.json({
                status: "ok",
                output: outputName,
                url: "/result/" + outputName
            });
        })
        .on("error", (err) => {
            console.log(err);
            res.json({ status: "error" });
        })
        .save(outputPath);
});

app.use("/result", express.static("output"));

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
