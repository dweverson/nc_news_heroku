const db = require('../connection')
const format = require('pg-format');

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
    return db
      .query('DROP TABLE IF EXISTS comments, articles, users, topics;')
      .then (() => {
        return db.query(
          `CREATE TABLE topics (
            slug TEXT PRIMARY KEY,
            description TEXT
          );`
        )
      })
      .then (() => {
        return db.query(
        `CREATE TABLE users (
          username TEXT PRIMARY KEY,
          avatar_url TEXT,
          name TEXT
          );`
        )
      })
      .then (() => {
        return db.query(
          `CREATE TABLE articles (
            article_id SERIAL PRIMARY KEY,
            title TEXT,
            body TEXT,
            votes INT,
            topic TEXT,
            author TEXT,
            created_at DATE, 
            FOREIGN KEY (topic) REFERENCES topics(slug),
            FOREIGN KEY (author) REFERENCES users(username)
            );`
        )
      })
      .then (() => {
        return db.query(
           `CREATE TABLE comments (
            comment_id SERIAL PRIMARY KEY,
            author TEXT,
            article_id INT,
            votes INT,
            created_at DATE,
            body TEXT,
            FOREIGN KEY (author) REFERENCES users(username),
            FOREIGN KEY (article_id) REFERENCES articles(article_id)
          );`
        )
      })
       .then (() => {
        const queryStr = format(
          `INSERT INTO topics
          (description, slug)
          VALUES
          %L
          RETURNING *;`,
          topicData.map((topic) => [
          topic.description,
          topic.slug
          ])
        )
        return db.query(queryStr);
       }) 
       .then (() => {
        const queryStr = format(
          `INSERT INTO users
          (username, avatar_url, name)
          VALUES
          %L
          RETURNING *;`,
          userData.map((user) => [
          user.username,
          user.avatar_url,
          user.name
          ])
        )
        return db.query(queryStr);
       }) 
       .then (() => {
        const queryStr = format(
          `INSERT INTO articles
          (title, topic, author, body, created_at, votes)
          VALUES
          %L
          RETURNING *;`,
          articleData.map((article) => [
          article.title,
          article.topic,
          article.author,
          article.body,
          article.created_at,
          article.votes
          ])
        )
        return db.query(queryStr);
       }) 
       .then (() => {
        const queryStr = format(
          `INSERT INTO comments
          (body, votes, author, article_id, created_at)
          VALUES
          %L
          RETURNING *;`,
          commentData.map((comment) => [
          comment.body,
          comment.votes,
          comment.author,
          comment.article_id,
          comment.created_at
          ])
        )
        return db.query(queryStr);
       }) 
};


module.exports = seed;
