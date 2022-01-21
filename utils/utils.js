const db = require('../db/connection')

exports.checkArticleIdExists = (article_id) => {
    return db
    .query(`SELECT * FROM articles 
    WHERE article_id = $1;`,
    [article_id])
    .then(({ rows }) => {
        if (rows.length) {
            return true;
        } else {
            return Promise.reject({ status: 404, msg: "Not found"});
        }
    });
};

exports.checkUserExists = (username) => {
    return db
    .query(`SELECT * FROM users 
    WHERE author = $1;`,
    [username])
    .then(({ rows }) => {
        if (rows.length) {
            return true;
        } else {
            return false;
        }
    });
};