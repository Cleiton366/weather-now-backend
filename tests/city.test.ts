import { app } from "../src/App";
import supertest from 'supertest';

describe('City API', () => {
  var id: string = '';

  it('should create a city', async () => {
    const response = await supertest(app)
      .post('/city')
      .send({
        lat: 0,
        lon: 0,
        name: 'Test City',
        userId: 'test'
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    id = response.body.id;
  });

  it('should get a city', async () => {
    const response = await supertest(app)
      .get(`/city/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should get cities by user', async () => {
    const response = await supertest(app)
      .get(`/city/user/test`);
    expect(response.status).toBe(200);
  });

  it('should delete a city', async () => {
    const response = await supertest(app)
      .delete(`/city/${id}`);
    expect(response.status).toBe(204);
  });
});