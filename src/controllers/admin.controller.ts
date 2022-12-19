import { Request, Response } from "express";
import bcrypt from "bcrypt";

import AdminModel from "../models/Admin.model";

export async function addAdmin(req: Request, res: Response) {
    try {
        const { username, fullname, password, description, role } = req.body;

        console.log(req.body);

        const user = await AdminModel.create({
            username,
            fullname,
            password,
            description,
            role,
        }); 

        return res.status(200).json({
            ok: true,
            message: "Admin added successfully",
        });
    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message
        })
        
    }

} 

