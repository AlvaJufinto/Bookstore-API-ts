import { Router } from 'express';

import { authentication, authenticationViewer } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validateResource';

import { addAuthor, showAuthor, showAllAuthor, deleteAuthor, editAuthor } from '../controllers/author.controller';

const authorRoute = Router();

authorRoute.get('/show', authentication, showAllAuthor);
authorRoute.get('/show/:id', authentication, showAuthor);
authorRoute.post('/add', authentication, authenticationViewer, validateBody, addAuthor);
authorRoute.delete('/delete/:id', authentication, authenticationViewer, deleteAuthor);
authorRoute.put('/edit/:id', authentication, authenticationViewer, validateBody, editAuthor);
 

export default authorRoute;