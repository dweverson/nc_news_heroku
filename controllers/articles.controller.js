const { selectArticleById, patchArticleVotes } = require('../models/articles.model.js');

exports.getArticleById = ( req, res, next) => {
    const { article_id } = req.params;
    selectArticleById(article_id).then((article) => {
        res.status(200).send({ article }) 
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