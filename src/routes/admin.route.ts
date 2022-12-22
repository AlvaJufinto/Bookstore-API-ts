import { Router } from 'express';

import { authentication, authenticationAdmin } from '../middleware/authMiddleware';

import { addAdmin, showAllAdmin, showAdmin, deleteAdmin, editAdmin } from '../controllers/admin.controller';

const adminRoute = Router();

adminRoute.get('/show', authentication, authenticationAdmin, showAllAdmin);
adminRoute.get('/show/:id', authentication, authenticationAdmin, showAdmin);
adminRoute.post('/add-admin', authentication, authenticationAdmin, addAdmin);
adminRoute.delete('/delete-admin/:id', authentication, authenticationAdmin, deleteAdmin);
adminRoute.put('/edit-admin/:id', authentication, authenticationAdmin, editAdmin);


export default adminRoute;