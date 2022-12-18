import { Response, Request } from 'express';
import { Router } from 'express';

const healthRoute = Router();

healthRoute.post('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

export default healthRoute;