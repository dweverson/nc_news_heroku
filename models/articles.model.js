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

exports.selectArticles = (sort_by = "created_at", order_by = "desc", topic) => {

    let qryString = `SELECT a.author, a.title, a.article_id, a.topic, a.created_at, a.votes, 
                    COUNT(c.article_id) as comment_count FROM articles a 
                    LEFT JOIN comments c on a.article_id = c.article_id `

// if topic add in where clause, 
if (topic != undefined ) {
    qryString += `WHERE topic = '${topic}' `
    }

qryString += `GROUP BY a.article_id
             ORDER BY ${sort_by} ${order_by};`
           //  console.log(qryString)
    return db.query(qryString)
        .then(({ rows }) => {
        return rows
    });
}

exports.selectCommentsByArticleId = (article_id) => {
    return db
    .query(
        `
        SELECT comment_id, author, body, created_at, votes FROM comments
        WHERE article_id = $1
        `,
        [article_id]
    )
    .then(({ rows }) => {
        return rows;
    });
};

exports.postComment = (article_id, author, body) => {   
    return db.query(
        `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
            [article_id, author, body]
    )
    .then(({ rows }) => {
        return rows[0]
    })
}
