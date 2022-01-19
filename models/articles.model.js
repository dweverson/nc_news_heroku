const db = require('../db/connection')

exports.selectArticleById = (article_id) => {
    return db
    .query(
        `
        SELECT a.*, COUNT(c.article_id) as comment_count FROM articles a 
        LEFT JOIN comments c on a.article_id = c.article_id
        WHERE a.article_id = $1
        GROUP BY a.article_id;
        `,
        [article_id]
    )
    .then(({ rows }) => {
        return rows[0];
    });
};

exports.patchArticleVotes = (article_id, vote_increment) => {   
    return db.query(
        `UPDATE articles
            SET votes = votes + $1
            WHERE article_id = $2
            RETURNING *;`,
            [vote_increment, article_id]
    )
    .then(({ rows }) => {
        return rows[0]
    })
}