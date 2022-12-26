import { Request, Response } from "express";
import bcrypt from "bcrypt";

import Admin, { IAdmin } from "./../models/Admin.model";
import { signJwt } from "./../utils/jwt.util";
import { getAdminById } from "..//utils/connect.util";

export async function authLogin(req: Request, res: Response) {
    const { username, password } = req.body;

    const admin: IAdmin = await Admin.findOne({ 
        username: username as string    
    }) as IAdmin;

    if(admin) {
        const match: boolean = await bcrypt.compare(password, admin.password);
        const token: string | boolean = await signJwt(admin._id as unknown as string);

        if(match) {
            return res.status(200).json({
                ok : true,
                message : "Login Success",
                token,
            })
        }
    }
    return res.status(401).json({
        ok: false,
        message: "Wrong password or username"
    })
} 

export async function authData(req: Request, res: Response) {
    const admin: IAdmin = await getAdminById(res.locals.user.uid);

    if(admin) {
        return res.status(200).json({
            ok: true,
            message: "Data retrieved successfully",
            data: {
                username: admin?.username,
                fullname: admin?.fullname,
                description: admin?.description,
                role: admin?.role,
            }
        })
    }
    
    return res.status(404).json({
        ok: false,
        message: "Admin not found",
    })
} 

