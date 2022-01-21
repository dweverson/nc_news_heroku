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
    test('status:404, id that does not exist, return error message', () => {
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
      test('status:400, invalid input datatype, respond with error message', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes : "invalid datatype" })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Bad request");
          });
      });
      test('status:400 invalid ID, returns error message', () => {
        return request(app)
          .patch('/api/articles/invalid_id')
          .send({ inc_votes : 1 })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Bad request");
          });
      });
      test('status:404, id that does not exist, return error message', () => {
        return request(app)
          .patch('/api/articles/1000')
          .send({ inc_votes : 1 })
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("Not found")
          }); 
      });
  });

  describe('4. GET /api/articles', () => {
    test('status:200, responds with an array of article objects', () => {
      return request(app)
        .get('/api/articles')
        .expect(200) 
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeInstanceOf(Array);
          expect(articles).toHaveLength(12);
          articles.forEach((article) => {
            expect(article).toEqual(
              expect.objectContaining({
                article_id: expect.any(Number),
                author: expect.any(String),
                comment_count: expect.any(String),
                created_at: expect.any(String),
                title: expect.any(String),
                topic: expect.any(String),
                votes: expect.any(Number)
              })
            );
          });
        });
    });

    test('status:200, responds with an array of articles sorted by author', () => {
        return request(app)
          .get('/api/articles?sort_by=author')
          .expect(200)  
          .then(({ body }) => {
            const { articles } = body;
            expect(articles).toBeInstanceOf(Array);
            expect(articles).toHaveLength(12);
            articles.forEach((article) => {
              expect(article).toEqual(
                expect.objectContaining({
                  article_id: expect.any(Number),
                  author: expect.any(String),
                  comment_count: expect.any(String),
                  created_at: expect.any(String),
                  title: expect.any(String),
                  topic: expect.any(String),
                  votes: expect.any(Number)
                })
              );
            });
          });
      });
    
      test('status:200, returns array of article by topic', () => {
        return request(app)
          .get('/api/articles?topic=mitch')
          .expect(200)
          .then(({ body }) => {
            const { articles } = body;
            expect(articles).toBeInstanceOf(Array);
            expect(articles).toHaveLength(11);
            articles.forEach((article) => {
              expect(article).toEqual(
                expect.objectContaining({
                  article_id: expect.any(Number),
                  author: expect.any(String),
                  comment_count: expect.any(String),
                  created_at: expect.any(String),
                  title: expect.any(String),
                  topic: expect.any(String),
                  votes: expect.any(Number)
                })
              );
            });
          });
      });
      test('status:200, article array ordered by asc', () => {
        return request(app)
          .get('/api/articles?order_by=asc')
          .expect(200)
          .then(({ body }) => {
            const { articles } = body;
            expect(articles).toBeInstanceOf(Array);
            expect(articles).toHaveLength(12);
            articles.forEach((article) => {
              expect(article).toEqual(
                expect.objectContaining({
                  article_id: expect.any(Number),
                  author: expect.any(String),
                  comment_count: expect.any(String),
                  created_at: expect.any(String),
                  title: expect.any(String),
                  topic: expect.any(String),
                  votes: expect.any(Number)
                })
              );
            });
          });
     });
     test('status:400, Bad request invalid sort_by query', () => {
        return request(app)
          .get('/api/articles?sort_by=')
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Bad request")
     });
    })
    test('status:400, Bad request invalid order_by query', () => {
        return request(app)
          .get('/api/articles?order_by=')
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Bad request")
     });
    })
    test('status:200, non existing topic query returns 0 results empty array', () => {
        return request(app)
          .get('/api/articles?topic=heck')
          .expect(200)
          .then((res) => {
            expect(res.body.msg).toBe("no topic, or articles do not exist")
     });
    })
    test('status:200, topic query with no articles returns 0 results empty array', () => {
        return request(app)
          .get('/api/articles?topic=paper')
          .expect(200)
          .then((res) => {
            expect(res.body.msg).toBe("no topic, or articles do not exist")
     });
    })
    test('status:400, Bad request invalid query', () => {
        return request(app)
          .get('/api/articles?invalid_query=')
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Bad request")
     });
    })
    test("status:404 invalid url and error message", () => {
        return request(app)
            .get('/api/articlesinvalid')
            .expect(404)
            .then((res) => {
                expect(res.body.msg).toBe("Invalid URL")
            })
    })
})

describe('5. GET /api/articles/:article_id/comments', () => {
    test('status:200, responds with an array of comments for given article ID', () => {
      return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toBeInstanceOf(Array);
          expect(comments).toHaveLength(11);
          comments.forEach((comment) => {
            expect(comment).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                author: expect.any(String),
                body: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number)
              })
            );
          });
        });
    });
    test('status:200, id that does not exist, return error message', () => {
        return request(app)
          .get('/api/articles/1000/comments')
          .expect(200)
          .then((res) => {
            expect(res.body.msg).toBe("No comments, or article doesnt exist")
          }); 
      });
    test('status:400 invalid ID, returns error message', () => {
        return request(app)
          .get('/api/articles/invalid_id/comments')
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Bad request");
          });
      });
      test("status:404 invalid url and error message", () => {
        return request(app)
            .get('/api/article/1/invalid')
            .expect(404)
            .then((res) => {
                expect(res.body.msg).toBe("Invalid URL")
            })
    })
});

describe('6. POST /api/articles/:article_id/comments', () => {
    test('status:201, posts new comment to article by id, returns new comment', () => {
      return request(app)
        .post('/api/articles/2/comments')
        .send({ username : 'butter_bridge', body : 'this is a new comment!' })
        .expect(201)
        .then(({ body }) => {
          const { comment } = body;
            expect(comment).toEqual(
              expect.objectContaining({
                author: 'butter_bridge',
                body: 'this is a new comment!'
              })
            );
        });
    });
    test('status:201, ignores additional key/value pairs, returns new comment', () => {
        return request(app)
          .post('/api/articles/2/comments')
          .send({ username : 'butter_bridge', body : 'this is a new comment!', extrakey : "value" })
          .expect(201)
          .then(({ body }) => {
            const { comment } = body;
              expect(comment).toEqual(
                expect.objectContaining({
                  author: 'butter_bridge',
                  body: 'this is a new comment!'
                })
              );
          });
        });
        test('status:400, non-existing username, returns error message', () => {
            return request(app)
              .post('/api/articles/2/comments')
              .send({ username : 'steve', body : 'this is a new comment!' })
              .expect(400)
              .then((res) => {
                expect(res.body.msg).toBe("Bad request")
              }); 
          });
          test('status:400, invalid body key, returns error message', () => {
            return request(app)
              .post('/api/articles/2/comments')
              .send({ username : 'butter_bridge', title : "new comment" })
              .expect(400)
              .then((res) => {
                expect(res.body.msg).toBe("Bad request")
              }); 
          });
          test('status:400, invalid username key, returns error message', () => {
            return request(app)
              .post('/api/articles/2/comments')
              .send({ notname : 'butter_bridge', body : "new comment" })
              .expect(400)
              .then((res) => {
                expect(res.body.msg).toBe("Bad request")
              }); 
          });
    test('status:404, article id that does not exist, return error message', () => {
        return request(app)
          .post('/api/articles/1000/comments')
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("Not found")
          }); 
      });
    test('status:400 invalid ID, returns error message', () => {
        return request(app)
          .post('/api/articles/invalid_id/comments')
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Bad request");
          });
      });
      test("status:404 invalid url and error message", () => {
        return request(app)
            .post('/api/article/1/invalid')
            .expect(404)
            .then((res) => {
                expect(res.body.msg).toBe("Invalid URL")
            })
    })
});

describe('7. DELETE /api/comments/:comment_id', () => {
    test('status:201, posts new comment to article by id, returns new comment', () => {
      return request(app)
        .post('/api/articles/2/comments')
        .send({ username : 'butter_bridge', body : 'this is a new comment!' })
        .expect(201)
        .then(({ body }) => {
          const { comment } = body;
            expect(comment).toEqual(
              expect.objectContaining({
                author: 'butter_bridge',
                body: 'this is a new comment!'
              })
            );
        });
    });
});

