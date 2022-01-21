const comments = require('../db/data/test-data/comments.js');
const { selectArticleById, patchArticleVotes, selectArticles, selectCommentsByArticleId, postComment, deleteCommentById } = require('../models/articles.model.js');
const { checkArticleIdExists, checkUserExists } = require('../utils/utils.js')

exports.getArticleById = ( req, res, next) => {
    const { article_id } = req.params;
    selectArticleById(article_id).then((article) => {
        if (article) {
        res.status(200).send({ article }) 
        } else {
            return Promise.reject({ status: 404, msg: "Not found"})
        }
    })
    .catch((err) => {
        next(err);
        });
}

exports.patchVotesByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    const { inc_votes } = req.body
 
     return patchArticleVotes(article_id, inc_votes)
     .then((article) => {
         if (article) {
            res.status(200).send({ article });
             } else { 
                return Promise.reject({ status: 404, msg: "Not found"}) 
             }
         })
        .catch((err) => {
        next(err);
        });
  };

exports.getArticles = ( req, res, next) => {
let sort_by = req.query.sort_by
let order_by = req.query.order_by
let topic = req.query.topic
 let reqKeys = Object.keys(req.query)
const allowedSortBys = ['author', 'title', 'topic', 'created_at', 'votes', 'comment_count', undefined]
const allowedQueries = ['sort_by', 'order_by', 'topic']
  
   if (!reqKeys.some(key => allowedQueries.includes(key)) && reqKeys.length > 0) {
        next({ status: 400, msg: 'Bad request' });
    }
   if (!allowedSortBys.includes(sort_by)) {
    next({ status: 400, msg: 'Bad request' });
    }
  if (!['asc', 'desc', undefined].includes(order_by)) {
    next({ status: 400, msg: 'Bad request' });
    }

    selectArticles(sort_by, order_by, topic).then((articles) => {
        if (articles.length > 0) {
        res.status(200).send({ articles }) 
        } else if(articles.length === 0) {
            res.status(200).send({msg: "no topic, or articles do not exist"})
        }
        else {
            return Promise.reject({ status: 404, msg: "Not found"})
        }
    })
    .catch((err) => {
        next(err);
        });
}

exports.getCommentsByArticleId = ( req, res, next) => {
    const { article_id } = req.params;
    selectCommentsByArticleId(article_id).then((comments) => {
        if (comments.length > 0) {
        res.status(200).send({ comments }) 
        } else if (comments.length === 0) {
            return Promise.reject({ status: 200, msg: "No comments, or article doesnt exist" })
        }
        else {
            return Promise.reject({ status: 404, msg: "Not found"})
        }
    })
    .catch((err) => {
        next(err);
        });
}

exports.postCommentByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    const { username, body } = req.body

    return checkArticleIdExists(article_id).then((articleExists) => {
        if (articleExists){
                return postComment(article_id, username, body)
                .then((comment) => {
                    if (comment) { 
                       res.status(201).send({ comment });
                     } else {
                      return Promise.reject({ status: 404, msg: "Not found"}) 
                     }
                })
            }
        })
       .catch((err) => {
        next(err);
        });
        };
 
  
    exports.removeCommentById = ( req, res, next) => {
        const { comment_id } = req.params;

        return deleteCommentById(comment_id)
        .then(({ rowCount }) => {
            if (!rowCount) {
                return Promise.reject({ status: 404, msg: "Not found"})
            } else {
            res.status(204).end(); 
            }
        })
        .catch((err) => {
            next(err);
            });
    }
