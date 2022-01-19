const express = require("express");
const { getTopics } = require('./controllers/topics.controller');

const {
    getArticleById,
    patchVotesByArticleId
    } = require('./controllers/articles.controller')

const app = express();
app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById);

app.patch('/api/articles/:article_id', patchVotesByArticleId)


app.all("*", (req, res) => {
    res.status(404).send({ msg: "Invalid URL"});
});

app.use((err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Bad Request"});
    } else {
        next(err);
    }
})

module.exports = app;
