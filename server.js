const express = require("express");
const app = express();
const {
    getImages,
    createImage,
    getImageById,
    getCommentsByImageId,
    addCommentToImage,
} = require("./db");
const { uploader } = require("./uploader");
const path = require("path");
const { Bucket, s3upload } = require("./s3");

app.use(express.static("./public"));

app.use(express.json());

app.get("/images", (request, response) => {
    getImages(request.query).then((images) => response.json(images));
});

app.get("/images/:image_id", (request, response) => {
    getImageById(request.params.image_id).then((image) => response.json(image));
});

app.post("/upload", uploader.single("image"), s3upload, (request, response) => {
    const url = `https://s3.amazonaws.com/${Bucket}/${request.file.filename}`;
    createImage({ url, ...request.body })
        .then((image) => {
            response.json({ image });
        })
        .catch((error) => {
            console.log(error), response.sendStatus(500);
        });
});

app.get("/upload", (request, response) => {
    response.sendFile(path.join(__dirname, "/public/upload-example.html"));
});

app.get("/images/:image_id/comments", (request, response) => {
    getCommentsByImageId(request.params.image_id).then((comments) => {
        response.json(comments);
    });
});

app.post("/images/:image_id/comments", (request, response) => {
    addCommentToImage({
        ...request.body,
        image_id: request.params.image_id,
    }).then((comment) => {
        response.json({ comment });
    });
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

console.log(process.env.PORT);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
