import { Router } from 'express';

import { authentication, authenticationAdmin } from '../middleware/authMiddleware';
import { validateAddAdmin } from 'src/middleware/validateResource';

import { addAdmin, showAllAdmin, showAdmin, deleteAdmin, editAdmin } from '../controllers/admin.controller';

const adminRoute = Router();

adminRoute.get('/show', authentication, authenticationAdmin, showAllAdmin);
adminRoute.get('/show/:id', authentication, authenticationAdmin, showAdmin);
adminRoute.post('/add', authentication, authenticationAdmin, validateAddAdmin, addAdmin);
adminRoute.delete('/delete/:id', authentication, authenticationAdmin, deleteAdmin);
adminRoute.put('/edit/:id', authentication, authenticationAdmin, editAdmin);


export default adminRoute;