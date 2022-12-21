import { Response, Request } from 'express';
import { Router } from 'express';

const healthRoute = Router();

healthRoute.get('', (req: Request, res: Response) => {
    return res.status(200).json({
        ok: true,
        message: "Im good brotha",
    })
})

export default healthRoute;