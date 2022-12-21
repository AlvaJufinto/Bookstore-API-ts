import { Router } from 'express';

import { authentication, authenticationAdmin } from '../middleware/authMiddleware';

import { showAllAdmin, addAdmin } from '../controllers/admin.controller';

const adminRoute = Router();

adminRoute.post('/show', authentication, authenticationAdmin, showAllAdmin);
adminRoute.post('/show/:id', authentication, authenticationAdmin, );
adminRoute.post('/add-admin', authentication, authenticationAdmin, addAdmin);
adminRoute.post('/delete-admin/:id', authentication, authenticationAdmin, );
adminRoute.post('/edit-admin/:id', authentication, authenticationAdmin, );


export default adminRoute;