import { Request, Response } from "express";
import bcrypt from "bcrypt";

import AdminModel, { IAdmin } from "./../models/Admin.model";
import { signJwt } from "./../utils/jwt.util";

export async function authLogin(req: Request, res: Response) {
    const { username, password } = req.body;

    if(username && password) {
        let admin;

        admin = await AdminModel.findOne({ 
            username: username as string    
        });

        if(admin) {
            const match = await bcrypt.compare(password, admin.password);
            const token = await signJwt(admin._id as unknown as string);

            console.log("token", token);

            if(match) {
                return res.status(200).json({
                    ok : true,
                    message : "Success",
                    token: token,
                })
            }
        }
        return res.status(401).json({
            ok : false,
            message : "Wrong Password or Username"
        })
    } 
    return res.status(400).json({
        ok : false,
        message: "Dude, you fucked up the JSON body"
    })
}