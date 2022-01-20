const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed  = require('../db/seeds/seed.js');
const app = require('../app');
const request = require('supertest');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/invalid_url", () =>{
    test("status 404 and message", () => {
        return request(app)
            .get("/invalid_url")
            .expect(404)
            .then((res) => {
                expect(res.body.msg).toBe("Invalid URL")
            })
    })
})

describe('1. GET /api/topics', () => {
    test('status:200, responds with an array of topic objects', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          const { topics } = body;
          expect(topics).toBeInstanceOf(Array);
          expect(topics).toHaveLength(3);
          topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
              })
            );
          });
        });
    });
  });

  describe('2. GET /api/articles/:article_id', () => {
    test('status:200, responds with article object selected by url id param', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
            expect(article).toEqual(
              expect.objectContaining({
                article_id: 1,
                author: expect.any(String),
                body: expect.any(String),
                comment_count: expect.any(String),
                created_at: expect.any(String),
                title: expect.any(String),
                topic: expect.any(String),
                votes: expect.any(Number)
              })
            );
        }); 
    });
    test('status: 404, id that does not exist, return error message', () => {
        return request(app)
          .get('/api/articles/1000')
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("Not found")
          }); 
      });
    test('status:400 invalid ID, returns error message', () => {
        return request(app)
          .get('/api/articles/invalid_id')
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Bad request");
          });
      });
  });

  describe('3. PATCH /api/articles/:article_id', () => {
    test('status:200, increments vote count and responds with updated article', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ inc_votes : 1 })
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
            expect(article).toEqual(
              expect.objectContaining({
                article_id: 1,
                author: expect.any(String),
                body: expect.any(String),
                created_at: expect.any(String),
                title: expect.any(String),
                topic: expect.any(String),
                votes: 101
              })
            );
        });
    });
    test('status:200, increments minus vote count and responds with updated article', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes : -1 })
          .expect(200)
          .then(({ body }) => {
            const { article } = body;
              expect(article).toEqual(
                expect.objectContaining({
                  article_id: 1,
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  title: expect.any(String),
                  topic: expect.any(String),
                  votes: 99
                })
              );
          });
      });
      test('status:200, ignores additional key/value pairs', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes : -1, additionl_key : "pair" })
          .expect(200)
          .then(({ body }) => {
            const { article } = body;
              expect(article).toEqual(
                expect.objectContaining({
                  article_id: 1,
                  author: expect.any(String),
                  body: expect.any(String),
                  created_at: expect.any(String),
                  title: expect.any(String),
                  topic: expect.any(String),
                  votes: 99
                })
              );
          });
      });
  });




