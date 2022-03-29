const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('should be able to sign up a user using POST', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({ username: 'miklo', password: 'imkindacute' });

    expect(res.body).toEqual({ id: expect.any(String), username: 'miklo' });
  });
});
