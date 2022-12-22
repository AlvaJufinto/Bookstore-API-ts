import { Router } from 'express';

import { authentication, authenticationViewer } from '../middleware/authMiddleware';

import { addBook } from '../controllers/book.controller';

const bookRoute = Router();

bookRoute.get('/show', authentication, );
bookRoute.get('/show/:id', authentication, );
bookRoute.post('/add', authentication, authenticationViewer, addBook);
bookRoute.delete('/delete/:id', authentication, authenticationViewer, );
bookRoute.put('/edit/:id', authentication, authenticationViewer, );


export default bookRoute;