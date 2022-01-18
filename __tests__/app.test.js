const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed  = require('../db/seeds/seed.js');
const app = require('../app');
const request = require('supertest');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("test connection", () => {
    test(" test ", () => {

    })
})

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