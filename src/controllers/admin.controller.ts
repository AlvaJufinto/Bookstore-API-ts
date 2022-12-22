import { Request, Response } from "express";

import Admin, { IAdmin } from "../models/Admin.model";

export async function addAdmin(req: Request, res: Response) {
    try {
        const { username, fullname, password, description, role } = req.body;

        const admin: any = await Admin.create({
            username,
            fullname,
            password,
            description,
            role,
        });
        const { password: returnedPassword, __v, ...rest } = admin?._doc;
    
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
            message: "Sorry, We can't fetch admins for now",
        })
    }
} 

export async function showAdmin(req: Request, res: Response) {
    try {
        const admin: any = await Admin.findOne({ _id: req.params.id }).lean();

        const { password: returnedPassword, __v, ...rest } = admin;

        return res.status(200).json({
            ok: true,
            message: "Admin fetched successfully",
            data: { ...rest },
        });
    } catch (err: any) {
        return res.status(404).json({
            ok: false,
            message: "Sorry, there's no admin with that id",
        })
    }
} 

export async function deleteAdmin(req: Request, res: Response) {
    try {
        const admin: any = await Admin.findOneAndDelete({ _id: req.params.id }).lean();

        if(req.params.id === res.locals.user.uid) {
            return res.status(403).json({
                ok : false,
                message : "You can't delete yourself"
            })
        }
        return res.status(200).json({
            ok: true,
            message: `${admin.username} deleted successfully`,
        });
    } catch (err: any) {
        return res.status(404).json({
            ok: false,
            message: "Sorry, there's no admin with that id",
        })
    }
} 

export async function editAdmin(req: Request, res: Response) {
    try {
        const { username, fullname, description, role } = req.body;
        
        const admin: any = await Admin.findOneAndUpdate({ _id: req.params.id }, { 
            $set: {     
                username,
                fullname,
                description,
                role,
            }
        }, { new: true });

        return res.status(200).json({
            ok: true,
            message: admin,
        });
    } catch (err) {
        return res.status(404).json({
            ok: false,
            message: "Sorry, we can't edit that admin",
        })
    }
} 