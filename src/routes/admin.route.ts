import { Router } from 'express';

import { authentication, authenticationAdmin } from '../middleware/authMiddleware';

import { showAllAdmin, addAdmin } from '../controllers/admin.controller';

const adminRoute = Router();

adminRoute.get('/show', authentication, authenticationAdmin, showAllAdmin);
adminRoute.get('/show/:id', authentication, authenticationAdmin, );
adminRoute.post('/add-admin', authentication, authenticationAdmin, addAdmin);
adminRoute.delete('/delete-admin/:id', authentication, authenticationAdmin, );
adminRoute.put('/edit-admin/:id', authentication, authenticationAdmin, );


export default adminRoute;