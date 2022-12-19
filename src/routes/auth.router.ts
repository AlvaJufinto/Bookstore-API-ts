import express from 'express';
import { Router } from 'express';

import { validateLogin } from '../middleware/validateResource';
import { authentication } from '../middleware/authMiddleware';
import { authLogin, getAuthData } from './../controllers/auth.controller';

const authRoute = Router();

authRoute.post('/login', validateLogin, authLogin)
authRoute.get('/get-data', authentication, getAuthData)

export default authRoute;