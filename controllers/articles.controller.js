const { selectArticleById, patchArticleVotes } = require('../models/articles.model.js');

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
        res.status(200).send({ article });
      })
      .catch((err) => {
        next(err);
        });
  };