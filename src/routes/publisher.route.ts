import { Router } from 'express';

import { authentication, authenticationViewer } from '../middleware/authMiddleware';

import { addPublisher, showAllPublisher, showPublisher, deletePublisher, editPublisher } from '../controllers/publisher.controller';

const publisherRoute = Router();

publisherRoute.get('/show', authentication, showAllPublisher);
publisherRoute.get('/show/:id', authentication, showPublisher);
publisherRoute.post('/add', authentication, authenticationViewer, addPublisher);
publisherRoute.delete('/delete/:id', authentication, authenticationViewer, deletePublisher);
publisherRoute.put('/edit/:id', authentication, authenticationViewer, editPublisher);


export default publisherRoute;