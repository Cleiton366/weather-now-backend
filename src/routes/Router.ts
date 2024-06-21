import user from './user/UserRouter';
import city from './city/CityRouter';
import auth from './auth/AuthRouter';

const router = {
    user : user,
    city : city,
    auth : auth
}

export default router;