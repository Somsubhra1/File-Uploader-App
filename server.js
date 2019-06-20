const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

// File upload middleware
app.use(fileUpload());

// Upload endpoint
app.post("/upload", (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: "No file was uploaded" });
    }
    const file = req.files.file;

    // Moving file to uploads directory
    file.mv(
        `${__dirname}/client/${
            process.env.NODE_ENV === "production" ? "build" : "public"
        }/uploads/${file.name}`,
        err => {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }
            res.json({
                fileName: file.name,
                filePath: `uploads/${file.name}`
            });
        }
    );
});

// Serve static assets if it's production environment
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
