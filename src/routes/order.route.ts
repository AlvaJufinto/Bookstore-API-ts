import { Router } from 'express';

import { authentication, authenticationViewer } from '../middleware/authMiddleware';
import { validateQuery, validateEditOrder } from '../middleware/validateResource';

import { addOrder, showOrder, showAllOrder, deleteOrder, editOrder } from '../controllers/order.controller';

const orderRoute = Router();

orderRoute.get('/show', authentication, showAllOrder);
orderRoute.get('/show/:id', authentication, showOrder);
orderRoute.post('/add', authentication, authenticationViewer, validateQuery, addOrder);
orderRoute.delete('/delete/:id', authentication, authenticationViewer, deleteOrder);
orderRoute.put('/edit/:id', authentication, authenticationViewer, validateEditOrder, editOrder);


export default orderRoute;