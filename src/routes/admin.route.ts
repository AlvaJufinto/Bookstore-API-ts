import express from 'express';
import { Router } from 'express';

import { authentication, authenticationAdmin } from '../middleware/authMiddleware';

import { addAdmin } from '../controllers/admin.controller';

const adminRoute = Router();

adminRoute.post('/add-admin', authentication, authenticationAdmin, addAdmin);

export default adminRoute;