import { Request, Response } from "express";

import Admin, { IAdmin } from "../models/Admin.model";

export async function addAdmin(req: Request, res: Response) {
    try {
        const { username, fullname, password, description, role } = req.body;

        const user: any = await Admin.create({
            username,
            fullname,
            password,
            description,
            role,
        });

        const { password: returnedPassword, __v, ...rest } = user?._doc;

        return res.status(200).json({
            ok: true,
            message: "Admin added successfully",
            data: { ...rest }
        });
    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 


export async function showAllAdmin(req: Request, res: Response) {
    try {
        const allAdmin: IAdmin[] = await Admin.find({});
        const admins: IAdmin[] = [];

        allAdmin?.map((admin: any) => {
            const { password, __v, ...formattedAdmin} = admin?._doc;
            admins.push(formattedAdmin as unknown as IAdmin);
        })

        return res.status(200).json({
            ok: true,
            message: "Admins fetched successfully",
            data: admins,
        });
    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 


