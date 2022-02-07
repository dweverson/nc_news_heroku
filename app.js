const cors = require('cors');
const express = require("express");
const { getTopics } = require('./controllers/topics.controller');
const { handle404s, handlesPsqlErrors, handleCustomErrors, handleServerErrors } = require('./errors/error')
const {
    getArticleById,
    patchVotesByArticleId,
    getArticles,
    getCommentsByArticleId,
    postCommentByArticleId, 
    removeCommentById
    } = require('./controllers/articles.controller')
const endpoints = require('./endpoints.json');

app.use(cors());

const app = express();
app.use(express.json());

app.get('/api', (req, res, next) => {
    res.send(endpoints);
})
app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.patch('/api/articles/:article_id', patchVotesByArticleId)
app.post('/api/articles/:article_id/comments', postCommentByArticleId)

app.delete('/api/comments/:comment_id', removeCommentById)

app.all("*", handle404s)

app.use(handlesPsqlErrors)
app.use(handleCustomErrors)
app.use(handleServerErrors)

module.exports = app;
