import express from 'express';
import { Router } from 'express';

import { authLogin } from './../controllers/auth.controller';

const authRoute = Router();

authRoute.post('/login', authLogin)

export default authRoute;