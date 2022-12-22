import { Router } from 'express';

import { authentication, authenticationViewer } from '../middleware/authMiddleware';

import { addBook, showBook, showAllBook } from '../controllers/book.controller';

const bookRoute = Router();

bookRoute.get('/show', authentication, showAllBook);
bookRoute.get('/show/:id', authentication, showBook);
bookRoute.post('/add', authentication, authenticationViewer, addBook);
bookRoute.delete('/delete/:id', authentication, authenticationViewer, );
bookRoute.put('/edit/:id', authentication, authenticationViewer, );


export default bookRoute;