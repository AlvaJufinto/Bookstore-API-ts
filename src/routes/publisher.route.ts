import { Router } from 'express';

import { authentication, authenticationViewer } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validateResource';

import { addPublisher, showAllPublisher, showPublisher, deletePublisher, editPublisher } from '../controllers/publisher.controller';

const publisherRoute = Router();

publisherRoute.get('/show', authentication, showAllPublisher);
publisherRoute.get('/show/:id', authentication, showPublisher);
publisherRoute.post('/add', authentication, authenticationViewer, validateBody, addPublisher);
publisherRoute.delete('/delete/:id', authentication, authenticationViewer, deletePublisher);
publisherRoute.put('/edit/:id', authentication, authenticationViewer, validateBody, editPublisher);


export default publisherRoute;