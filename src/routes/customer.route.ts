import { Router } from 'express';

import { authentication, authenticationViewer } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validateResource';

import { addCustomer, showCustomer, showAllCustomer, deleteCustomer, editCustomer } from '../controllers/customer.controller';

const customerRoute = Router();

customerRoute.get('/show', authentication, showAllCustomer);
customerRoute.get('/show/:id', authentication, showCustomer);
customerRoute.post('/add', authentication, authenticationViewer, addCustomer);
customerRoute.delete('/delete/:id', authentication, authenticationViewer, deleteCustomer);
customerRoute.put('/edit/:id', authentication, authenticationViewer, validateBody, editCustomer);


export default customerRoute;