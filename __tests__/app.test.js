const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const req = require('express/lib/request');
const secrets = require('../lib/controllers/secrets');

describe('backend-top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('should be able to sign up a user using POST', async () => {
    const res = await request(app)
      .post('/api/v1/auth')
      .send({ email: 'miklo', password: 'imkindacute' });

    expect(res.body).toEqual({ id: expect.any(String), email: 'miklo' });
  });

  it('should be able to sign in existing user', async () => {
    const user = await UserService.create({
      email: 'miklo',
      password: 'imkindacute',
    });
    const res = await request(app)
      .post('/api/v1/auth/sessions')
      .send({ email: 'miklo', password: 'imkindacute' });
    expect(res.body).toEqual({
      message: 'Signed in successfully',
      user,
    });
  });

  it('should be able to log out the user', async () => {
    await UserService.create({
      email: 'miklo',
      password: 'imkindacute',
    });
    const res = await request(app).delete('/api/v1/auth/sessions');

    expect(res.body).toEqual({
      message: 'Signed out successfully',
      success: true,
    });
  });

  it('should be able to get all secrets if signed in', async () => {
    const agent = request.agent(app);

    await UserService.create({ email: 'miklo', password: 'imkindacute' });

    let res = await agent.get('/api/v1/secrets');
    expect(res.status).toEqual(401);

    await agent
      .post('/api/v1/auth/sessions')
      .send({ email: 'miklo', password: 'imkindacute' });

    res = await agent.get('/api/v1/secrets');
    expect(res.body).toEqual([
      {
        id: '1',
        title: 'thing 1',
        description: 'i am thing 1',
        createdAt: expect.any(String),
      },

      {
        id: '2',
        title: 'thing 2',
        description: 'i am thing 2',
        createdAt: expect.any(String),
      },
    ]);
    expect(res.status).toEqual(200);
  });

  it('should be able to create a secret if user is signed in', async () => {
    const agent = request.agent(app);
    await UserService.create({ email: 'miklo', password: 'imkindacute' });

    await agent
      .post('/api/v1/auth/sessions')
      .send({ email: 'miklo', password: 'imkindacute' });

    const res = await agent
      .post('/api/v1/secrets')
      .send({ title: 'test thing', description: 'testing things' });

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'test thing',
      description: 'testing things',
      createdAt: expect.any(String),
    });
  });
});
