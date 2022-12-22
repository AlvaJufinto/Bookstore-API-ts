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

export function validateEditAdmin(req: Request, res: Response, next: NextFunction) {
    const { username, password,  } = req.body;     

    if(username && password) {
        return next();
    } else {
        return res.status(400).json({
            ok : false,
            message: "Dude, you fucked up the JSON Login body"
        })
    }
}

