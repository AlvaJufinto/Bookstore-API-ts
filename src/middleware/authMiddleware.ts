import { Request, Response, NextFunction } from "express";

import Admin, { IAdmin } from "../models/Admin.model";
import { verifyJwt } from "../utils/jwt.util";
import { getAdminById } from "src/utils/connect.util";

export async function authentication(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if(authorization) {
        const authToken = authorization.split(" ")[1];
        const { decoded } = await verifyJwt(authToken);
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
} 

export async function authenticationAdmin(req: Request, res: Response, next: NextFunction) {
    const admin: IAdmin = await getAdminById(res.locals.user.uid);

    if(admin?.role !== 'admin') {
        return res.status(403).json({
            ok: false,
            message: "Access denied"
        });
    }
    next();
} 

export async function authenticationViewer(req: Request, res: Response, next: NextFunction) {
    const admin: IAdmin = await getAdminById(res.locals.user.uid);

    if(admin?.role === 'viewer') {
        return res.status(403).json({
            ok: false,
            message: "Access denied"
        });
    }
    next();
}
