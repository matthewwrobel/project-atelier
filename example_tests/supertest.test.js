const request = require('supertest');

describe('Supertest test', () => {
  it ('responds with 200', (done) => {
    request('http://localhost:8080')
      .get('/')
      .expect(200, done);
  });
});