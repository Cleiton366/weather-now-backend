import { app } from "../src/App";
import supertest from 'supertest';

describe('Weather Service', () => {

   it('should return array of weather data', async () => {
    const response = await supertest(app).post('/city/weather').send({
      cities: [
        {
          id: '1',
          name: 'New York',
          lat: 40.7128,
          lon: 74.0060,
          userId: '1'
        },
        {
          id: '2',
          name: 'New York',
          lat: 40.7128,
          lon: 74.0060,
          userId: '1'
        }
      ]
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('lat');
    expect(response.body[0]).toHaveProperty('lon');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('userId');
    expect(response.body[0].weather).toHaveProperty('coord');
    expect(response.body[0].weather).toHaveProperty('weather');
    expect(response.body[0].weather).toHaveProperty('base');
    expect(response.body[0].weather).toHaveProperty('main');
    expect(response.body[0].weather).toHaveProperty('visibility');
    expect(response.body[0].weather).toHaveProperty('wind');
    expect(response.body[0].weather).toHaveProperty('clouds');
    expect(response.body[0].weather).toHaveProperty('dt');
    expect(response.body[0].weather).toHaveProperty('sys');
    expect(response.body[0].weather).toHaveProperty('timezone');
    expect(response.body[0].weather).toHaveProperty('id');
    expect(response.body[0].weather).toHaveProperty('name');
    expect(response.body[0].weather).toHaveProperty('cod');
    expect(response.body[1]).toHaveProperty('id');
    expect(response.body[1]).toHaveProperty('lat');
    expect(response.body[1]).toHaveProperty('lon');
    expect(response.body[1]).toHaveProperty('name');
    expect(response.body[1]).toHaveProperty('userId');
    expect(response.body[1].weather).toHaveProperty('coord');
    expect(response.body[1].weather).toHaveProperty('weather');
    expect(response.body[1].weather).toHaveProperty('base');
    expect(response.body[1].weather).toHaveProperty('main');
    expect(response.body[1].weather).toHaveProperty('visibility');
    expect(response.body[1].weather).toHaveProperty('wind');
    expect(response.body[1].weather).toHaveProperty('clouds');
    expect(response.body[1].weather).toHaveProperty('dt');
    expect(response.body[1].weather).toHaveProperty('sys');
    expect(response.body[1].weather).toHaveProperty('timezone');
    expect(response.body[1].weather).toHaveProperty('id');
    expect(response.body[1].weather).toHaveProperty('name');
    expect(response.body[1].weather).toHaveProperty('cod');
   });
});