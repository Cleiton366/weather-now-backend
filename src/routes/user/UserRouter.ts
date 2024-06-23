import { Router } from 'express';
import { UserController } from '../../controllers/UserController';
import isAuthenticated from '../../midleware/IsAuthenticated';

const user = Router();
const userController = new UserController();

user.get('/user/:id', isAuthenticated, userController.getUser);
user.post('/user', userController.createUser);
user.delete('/user/:id', isAuthenticated, userController.deleteUser);
user.patch('/user/update-unit/:id', isAuthenticated, userController.updateUserUnit);

export default user;