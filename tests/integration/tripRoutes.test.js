import app from '../../app.js';
import Trip from '../../models/Trip.js';
import User from '../../models/User.js';
import { expect } from 'chai';
import request from 'supertest';
import { connectDB, disconnectDB } from '../../utils/memoryDb.js';
import { mockExternalApi } from '../../utils/mockExternalApi.js';

describe('Trip Endpoints Tests', () => {
  let token;

  before(function () {
    this.timeout(10000);
    return (async () => {
      await connectDB();
      await Trip.deleteMany({});
      await User.deleteMany({});

      // Create a user for authentication
      const user = {
        username: 'testuser',
        password: 'password',
        passwordConf: 'password',
        email: 'test@example.com',
      };
      await request(app).post('/api/auth/register').send(user);

      // Log in to obtain a token
      const response = await request(app).post('/api/auth/login').send({
        username: user.username,
        password: user.password,
      });
      token = response.body.token;
    })();
  });

  after(function () {
    this.timeout(10000);
    return (async () => {
      await Trip.deleteMany({});
      await User.deleteMany({});
      await disconnectDB();
    })();
  });

  const api = request(app);

  it('Should save a new trip in the db', async () => {
    const response = await api
      .post('/api/trips')
      .set('Authorization', `Bearer ${token}`)
      .send({
        origin: 'LAX',
        destination: 'JFK',
        cost: 200,
        duration: 300,
        type: 'flight',
        display_name: 'Flight from LAX to JFK by flight',
        id: '963cb400-1456-4bb0-aa44-8165b7b359e9',
      })
      .expect(201);
    const savedTrip = await Trip.findOne({
      origin: 'LAX',
      destination: 'JFK',
    }).exec();
    expect(savedTrip.origin).equal('LAX');
  });

  it('Should not save a trip if a required field is missing in the req.body', async () => {
    const response = await api
      .post('/api/trips')
      .set('Authorization', `Bearer ${token}`)
      .send({
        origin: 'LAX',
        destination: 'JFK',
        cost: 200,
      })
      .expect(400);
  });

  it('Should not save a trip if the token is missing', async () => {
    await api
      .post('/api/trips')
      .send({
        origin: 'LAX',
        destination: 'JFK',
        cost: 200,
        duration: 300,
        type: 'flight',
        display_name: 'Flight from LAX to JFK by flight',
        id: '963cb400-1456-4bb0-aa44-8165b7b359e9',
      })
      .expect(401);
  });

  it('Should list all trips', async () => {
    const response = await api
      .get('/api/trips')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body).to.be.an('array');
    expect(response.body.length).to.equal(1);
  });

  it('Should not delete a trip if token is invalid', async () => {
    const response = await api
      .delete(`/api/trips/963cb400-1456-4bb0-aa44-8165b7b359e9`)
      .set('Authorization', `Bearer invalidtoken`)
      .expect(401);
  });

  it('Should not delete a trip if bearer token is not present', async () => {
    const response = await api
      .delete(`/api/trips/963cb400-1456-4bb0-aa44-8165b7b359e9`)
      .expect(401);
  });

  it('Should delete a trip from the db', async () => {
    await api.post('/api/trips').set('Authorization', `Bearer ${token}`).send({
      origin: 'LAX',
      destination: 'JFK',
      cost: 200,
      duration: 300,
      type: 'flight',
      display_name: 'Flight from LAX to JFK by flight',
      id: '963cb400-1456-4bb0-aa44-8165b7b359e9',
    });
    const response = await api
      .delete(`/api/trips/963cb400-1456-4bb0-aa44-8165b7b359e9`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    const deletedTrip = await Trip.findOne({
      id: '963cb400-1456-4bb0-aa44-8165b7b359e9',
    }).exec();
    expect(deletedTrip).to.be.null;
  });

  it('Should not delete a trip if not found in the db', async () => {
    const response = await api
      .delete(`/api/trips/123`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
  });

  it('Should search trips based on origin, destination and sort_by fastest', async () => {
    mockExternalApi();

    const response = await api
      .get('/api/trips/search?origin=LAX&destination=JFK&sort_by=fastest')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body).to.be.an('array');
    expect(response.body.length).to.equal(2);
    expect(response.body[0].duration).to.equal(10);
    expect(response.body[0].cost).to.equal(250);
  });

  it('Should search trips based on origin, destination and sort_by cheapest', async () => {
    mockExternalApi();

    const response = await api
      .get('/api/trips/search?origin=LAX&destination=JFK&sort_by=cheapest')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body).to.be.an('array');
    expect(response.body.length).to.equal(2);
    expect(response.body[0].duration).to.equal(15);
    expect(response.body[0].cost).to.equal(200);
  });

  it('Should respond with 400 if origin or destination is missing in the query params', async () => {
    const response = await api
      .get('/api/trips/search?origin=JFK')
      .set('Authorization', `Bearer ${token}`)
      .expect(400);
  });

  it('Should respond with 400 if sort_by parameter is invalid', async () => {
    const response = await api
      .get('/api/trips/search?origin=JFK&destination=LAX&sort_by=invalid')
      .set('Authorization', `Bearer ${token}`)
      .expect(400);
  });
});
