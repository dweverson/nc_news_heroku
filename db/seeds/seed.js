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
          name TEXT NOT NULL
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
            created_at DATE 
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
            body TEXT
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

  // 1. create tables
  // 2. insert data
};


module.exports = seed;
