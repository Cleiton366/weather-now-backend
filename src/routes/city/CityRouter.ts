import { Router } from 'express';
import { CityController } from '../../controllers/CityController';
import isAuthenticated from '../../midleware/IsAuthenticated';

const city = Router();
const cityController = new CityController();

city.post('/city/weather', isAuthenticated, cityController.getCitiesWeather);
city.get('/city/:id', isAuthenticated, cityController.getCity);
city.get('/city/user/:id', isAuthenticated, cityController.getCities);
city.post('/city', isAuthenticated, cityController.createCity);
city.delete('/city/:id', isAuthenticated, cityController.deleteCity);

export default city;