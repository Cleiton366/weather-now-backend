import { app } from "../src/App";
import supertest from 'supertest';

describe('User API', () => {
  var id: string = '';

  it.skip('should create a user', async () => {
    const response = await supertest(app)
      .post('/user')
      .send({
        id: 'user test',
        name: 'Test User',
        email: 'test@test.com',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    
    id = response.body.id;
  });

  it.skip('should get a user', async () => {
    const response = await supertest(app)
      .get(`/user/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it.skip('should delete a user', async () => {
    const response = await supertest(app)
      .delete(`/user/${id}`);
    expect(response.status).toBe(204);
  });
}); 