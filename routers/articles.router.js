const express = require('express')
const { getArticles, getArticleById, patchVotesByArticleId, getCommentsByArticleId, postCommentByArticleId } = require('../controllers/articles.controller')

const articlesRouter = express.Router();

articlesRouter.route('/')
    .get(getArticles)

articlesRouter.route('/:article_id')
    .get(getArticleById)
    .patch(patchVotesByArticleId)

articlesRouter.route('/:article_id/comments')
    .get(getCommentsByArticleId)
    .post(postCommentByArticleId)


    module.exports = articlesRouter;
