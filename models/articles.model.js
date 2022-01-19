const db = require('../db/connection')

exports.selectArticleById = (article_id) => {
    return db
    .query(
        `
        SELECT * FROM articles
        WHERE article_id = $1
        `,
        [article_id]
    )
    .then(({ rows }) => {
        return rows[0];
    });
};

exports.patchArticleVotes = (article_id, voteIncrement) => {
    return db.query(
        `UPDATE articles
            SET votes = votes + $1
            WHERE article_id = $2
            RETURNING *;`,
            [voteIncrement.inc_votes, article_id]
    )
    .then(({ rows }) => {
        return rows[0]
    })
}