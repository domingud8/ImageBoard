const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
    console.log("petition running on Heroku");
} else {
    const { DB_USER, DB_PASS } = require("./secrets.json");
    const DATABASE_NAME = "imageboard";
    console.log(`[db] Connecting locally to: ${DATABASE_NAME}`);
    db = spicedPg(
        `postgres:${DB_USER}:${DB_PASS}@localhost:5432/${DATABASE_NAME}`
    );
}

function getImages({ limit = 20, page = 1 }) {
    return db
        .query("SELECT * FROM images ORDER BY id DESC LIMIT $1 OFFSET $2", [
            limit,
            limit * (page - 1),
        ])
        .then(({ rows }) => {
            return rows;
        });
}

function getImageById(id) {
    return db
        .query("SELECT * FROM images WHERE id=$1", [id])
        .then(({ rows }) => {
            return rows[0];
        });
}

function createImage({ url, username, title, description }) {
    return db
        .query(
            `INSERT INTO images (url, username ,title ,description) VALUES ($1,$2,$3,$4) RETURNING *`,
            [url, username, title, description]
        )
        .then((result) => {
            return result.rows[0];
        });
}

function getCommentsByImageId(id) {
    return db
        .query("SELECT * FROM comments WHERE image_id=$1 ORDER BY id DESC", [
            id,
        ])
        .then(({ rows }) => {
            return rows;
        });
}

function addCommentToImage({ image_id, username, text }) {
    return db
        .query(
            "INSERT INTO comments (image_id, username, text) VALUES ($1,$2,$3) RETURNING *",
            [image_id, username, text]
        )
        .then(({ rows }) => {
            return rows[0];
        });
}

//getImages().then((rows) => console.log(rows));
module.exports = {
    getImages,
    createImage,
    getImageById,
    getCommentsByImageId,
    addCommentToImage,
};
