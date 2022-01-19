const { selectArticleById, patchArticleVotes } = require('../models/articles.model.js');

exports.getArticleById = ( req, res) => {
    const { article_id } = req.params;
    selectArticleById(article_id).then((article) => {
        res.status(200).send({ article }) 
    })
}

exports.patchVotesByArticleId = (req, res) => {
    const { article_id } = req.params;
    
    if (Object.keys(req.body).length === 1) {
      patchArticleVotes(article_id, req.body).then((article) => {
        res.status(200).send({ article });
      });
    } else {
      res.status(400).send({});
    }
  };