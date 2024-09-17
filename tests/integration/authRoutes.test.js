import app from '../../app.js';
import User from '../../models/User.js';
import { expect } from 'chai';
import request from 'supertest';
import { connectDB, disconnectDB } from '../../utils/memoryDb.js';

let token = '';

describe('Auth Endpoints Tests', () => {
  before(function () {
    this.timeout(10000);
    return (async () => {
      await connectDB();
      await User.deleteMany({});
    })();
  });

  after(function () {
    this.timeout(10000);
    return (async () => {
      await User.deleteMany({});
      await disconnectDB();
    })();
  });

  const api = request(app);

  it('Should register a new user saving it in the db', async () => {
    const response = await api
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'test123',
        passwordConf: 'test123',
        email: 'testuser@gmail.com',
      })
      .expect(201);
    const savedUser = await User.findOne({
      username: 'testuser',
    }).exec();
    expect(savedUser.username).equal('testuser');
  });
  it('Should not register a user if already present in db', async () => {
    const response = await api
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'test123',
        passwordConf: 'test123',
        email: 'testuser@gmail.com',
      })
      .expect(409);
  });
  it('Should not register a user if a required field is missing in the req.body', async () => {
    const response = await api
      .post('/api/auth/register')
      .send({
        username: '',
        password: 'test123',
        passwordConf: 'test123',
        email: 'testuser@gmail.com',
      })
      .expect(400);
  });
  it('Should authenticate the user if found in db', async () => {
    const response = await api
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'test123' })
      .expect(200);
    token = response.body.token;
    expect(token).to.be.a('string');
    expect(token).to.have.length.greaterThan(0);
  });
  it('Should respond with 401 if user not found in db', async () => {
    const response = await api
      .post('/api/auth/login')
      .send({ username: 'testuser33', password: 'test123' })
      .expect(401);
  });
  it('Should respond with 400 if username or password is not provided in req.body', async () => {
    const response = await api
      .post('/api/auth/login')
      .send({ username: 'testuser', password: '' })
      .expect(400);
  });
  it('Should respond with 401 if password is incorrect', async () => {
    const response = await api
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'test1234' })
      .expect(401);
  });
});
