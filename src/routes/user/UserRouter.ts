import { Router } from 'express';
import { UserController } from '../../controllers/UserController';

const user = Router();
const userController = new UserController();

user.get('/user/:id', userController.getUser);
user.post('/user', userController.createUser);
user.delete('/user/:id', userController.deleteUser);

export default user;