import express from 'express';
import { Router } from 'express';

import { authentication, authenticationAdmin } from '../middleware/authMiddleware';

import { addAdmin } from '../controllers/admin.controller';

const adminRoute = Router();

adminRoute.post('/show', authentication, authenticationAdmin, );
adminRoute.post('/add-admin', authentication, authenticationAdmin, addAdmin);
adminRoute.post('/delete-admin/:id', authentication, authenticationAdmin, );
adminRoute.post('/edit-admin/:id', authentication, authenticationAdmin, );


export default adminRoute;