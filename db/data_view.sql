\c nc_news_test
-- SELECT * FROM topics;
-- SELECT * FROM users;
-- SELECT * FROM articles;
-- SELECT * FROM comments;

-- SELECT * FROM articles;

-- SELECT * FROM articles a 
-- LEFT JOIN comments c on a.article_id = c.article_id
-- WHERE a.article_id = 1;

-- SELECT a.*, COUNT(c.article_id) as comment_count FROM articles a 
-- LEFT JOIN comments c on a.article_id = c.article_id
-- WHERE a.article_id = 1
-- GROUP BY a.article_id;


--  SELECT a.author, a.title, a.article_id, a.topic, a.created_at, a.votes, COUNT(c.article_id) as comment_count FROM articles a 
--  LEFT JOIN comments c on a.article_id = c.article_id
--  GROUP BY a.article_id 
--  ORDER BY created_at DESC;
INSERT INTO comments (article_id, author, body) VALUES (2, "new poster", "this is a new comment!") RETURNING *; 

