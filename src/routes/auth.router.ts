import { Router } from 'express';

import { validateLogin } from '../middleware/validateResource';
import { authentication } from '../middleware/authMiddleware';
import { authLogin, authData } from './../controllers/auth.controller';

const authRoute = Router();

authRoute.post('/login', validateLogin, authLogin);
authRoute.get('/get', authentication, authData);

export default authRoute;