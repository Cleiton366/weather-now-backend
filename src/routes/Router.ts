import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { CityController } from '../controllers/CityController';

const router = Router();
const userController = new UserController();
const cityController = new CityController();

router.get('/user/:id', userController.getUser);
router.post('/user', userController.createUser);
router.delete('/user/:id', userController.deleteUser);

router.post('/city/weather', cityController.getCitiesWeather);
router.get('/city/:id', cityController.getCity);
router.get('/city/user/:id', cityController.getCities);
router.post('/city', cityController.createCity);
router.delete('/city/:id', cityController.deleteCity);

export default router;