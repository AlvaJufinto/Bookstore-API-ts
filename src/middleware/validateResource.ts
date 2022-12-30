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
    const { username } = req.body;

    if(username.includes(" ")) {
        return res.status(400).json({
            ok: false,
            message: "Username can't contain spaces",
        })
    }
    next();
}

export function validateQuery(req: Request, res: Response, next: NextFunction) {
    const { withCustomerId } = req.query;

    if(withCustomerId === undefined) {
        return res.status(400).json({
            ok: false,
            message: "You have to add '?withCustomerId=' after route",
        })
    }

    if(withCustomerId === "true" || withCustomerId === "false") {
        return next();
    }
    
    return res.status(400).json({
        ok: false,
        message: "'?withCustomerId=' value must be 'true' OR 'false'",
    })
}

export function validateBody(req: Request, res: Response, next: NextFunction) {
    const { books, customer, total, orders } = req.body;

    if(books || customer || total || orders) {
        return res.status(400).json({
            ok: false,
            message: "You can't add or edit books, customer, orders, and total",
        })
    }
    
    next()
}