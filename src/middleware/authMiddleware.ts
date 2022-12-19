import { Request, Response, NextFunction } from "express";

import { verifyJwt } from "..//utils/jwt.util";

export async function authentication(req: Request, res: Response, next: NextFunction) {
    // try {
        const { authorization } = req.headers;
        if(authorization) {
            const { decoded, expired } = await verifyJwt(authorization);
            console.log('decode', decoded, expired);
            if(decoded) {
                res.locals.user = decoded;
                return next();
            }
            return res.status(501).json({
                ok : false,
                message : "Token invalid"
            })
        }
        return res.status(404).json({
            ok : false,
            message : "Token not found"
        })
    // } catch (err) {
    //     console.log(err);
    // }
} 