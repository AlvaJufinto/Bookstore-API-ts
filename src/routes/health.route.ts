import { Response, Request } from 'express';
import { Router } from 'express';

const healthRoute = Router();

healthRoute.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

export default healthRoute;