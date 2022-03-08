const { deleteCommentById } = require('../models/articles.model.js');


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