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
    const { withId } = req.query;

    if(withId === undefined) {
        return res.status(400).json({
            ok: false,
            message: "You have to add '?withId=' after route",
        })
    }

    if(withId === "true" || withId === "false") {
        return next();
    }
    
    return res.status(400).json({
        ok: false,
        message: "'?withId=' value must be 'true' OR 'false'",
    })
}

export function validateEditOrder(req: Request, res: Response, next: NextFunction) {
    const { books, customer, total } = req.body;

    if(books || customer || total) {
        return res.status(400).json({
            ok: false,
            message: "You can't edit books, customer, and total",
        })
    }
    
    next()
}
