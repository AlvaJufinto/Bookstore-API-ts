import { Router } from 'express';

import { authentication, authenticationViewer } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validateResource';

import { addBook, showBook, showAllBook, deleteBook, editBook } from '../controllers/book.controller';

const bookRoute = Router();

bookRoute.get('/show', authentication, showAllBook);
bookRoute.get('/show/:id', authentication, showBook);
bookRoute.post('/add', authentication, authenticationViewer, addBook);
bookRoute.delete('/delete/:id', authentication, authenticationViewer, deleteBook);
bookRoute.put('/edit/:id', authentication, authenticationViewer, validateBody, editBook);
 

export default bookRoute;