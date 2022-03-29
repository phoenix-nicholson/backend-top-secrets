const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const req = require('express/lib/request');

describe('backend-top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('should be able to sign up a user using POST', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ email: 'miklo', password: 'imkindacute' });

    expect(res.body).toEqual({ id: expect.any(String), email: 'miklo' });
  });

  it('should be able to sign in existing user', async () => {
    const user = await UserService.create({
      email: 'miklo',
      password: 'imkindacute',
    });
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'miklo', password: 'imkindacute' });
    expect(res.body).toEqual({
      message: 'Signed in successfully',
      user,
    });
  });
});
