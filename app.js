const express = require("express");
const { getTopics } = require('./controllers/topics.controller');
const { handle404s, handlesPsqlErrors, handleCustomErrors, handleServerErrors } = require('./errors/error')
const {
    getArticleById,
    patchVotesByArticleId
    } = require('./controllers/articles.controller')

const app = express();
app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById);

app.patch('/api/articles/:article_id', patchVotesByArticleId)


app.all("*", handle404s)

app.use(handlesPsqlErrors)
app.use(handleCustomErrors)
app.use(handleServerErrors)

module.exports = app;
