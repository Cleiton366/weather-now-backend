import { Router } from 'express';
import { CityController } from '../../controllers/CityController';

const city = Router();
const cityController = new CityController();

city.post('/city/weather', cityController.getCitiesWeather);
city.get('/city/:id', cityController.getCity);
city.get('/city/user/:id', cityController.getCities);
city.post('/city', cityController.createCity);
city.delete('/city/:id', cityController.deleteCity);

export default city;