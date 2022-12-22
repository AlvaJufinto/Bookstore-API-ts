import { Request, Response, NextFunction } from "express";

export function validateLogin(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;     

    if(username && password) {
        return next();
    } else {
        return res.status(400).json({
            ok : false,
            message: "Dude, you fucked up the JSON Login body"
        })
    }
}

export function validateAddAdmin(req: Request, res: Response, next: NextFunction) {
    const { username, fullname, password, description, role } = req.body;

    if(username.includes(" ")) {
        return res.status(400).json({
            ok: false,
            message: "Username can't contain spaces",
        })
    }
    next();
}

export function strictBelongsTo(req: Request, res: Response, next: NextFunction) {
    const { belongsTo } = req.body;

    if(belongsTo){
        return res.status(401).json({
            ok : false,
            message: "belongsTo detected"
        })
    }
    return next();
}
