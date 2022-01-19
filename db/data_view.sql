\c nc_news_test
-- SELECT * FROM topics;
-- SELECT * FROM users;
-- SELECT * FROM articles;
-- SELECT * FROM comments;

SELECT * FROM articles;

SELECT * FROM articles a 
LEFT JOIN comments c on a.article_id = c.article_id
WHERE a.article_id = 1;

SELECT a.*, COUNT(c.article_id) as comment_count FROM articles a 
LEFT JOIN comments c on a.article_id = c.article_id
WHERE a.article_id = 1
GROUP BY a.article_id;

