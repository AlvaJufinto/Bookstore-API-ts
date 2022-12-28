import { Request, Response } from "express";

import Admin, { IAdmin } from "../models/Admin.model";

export async function addAdmin(req: Request, res: Response) {
    try {
        const admin: IAdmin = await Admin.create({
            ...req.body
        });
        
        const { password: returnedPassword, ...rest } = admin.toObject();
    
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
        const admins: IAdmin[] = await Admin.find().lean();
        const formattedAdmins: IAdmin[] = admins?.map((admin: IAdmin) => {
            const { password, ...formattedAdmin} = admin;
            return formattedAdmin as IAdmin;
        })

        return res.status(200).json({
            ok: true,
            message: "Admins fetched successfully",
            data: formattedAdmins,
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
        const admin: IAdmin = await Admin.findOne({ _id: req.params.id }).lean();

        const { password: returnedPassword, ...rest } = admin;

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
        const admin: IAdmin = await Admin.findOneAndDelete({ _id: req.params.id }).lean();

        if(req.params.id === res.locals.user.uid) {
            return res.status(403).json({
                ok : false,
                message : "You can't delete yourself"
            })
        }
        return res.status(200).json({
            ok: true,
            message: `${admin.username} deleted successfully`,
            data: admin
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
        const admin: IAdmin = await Admin.findOneAndUpdate(
            { _id: req.params.id }, 
            { 
                $set: {     
                    ...req.body
                }
            }, 
            { new: true }   
        ).lean();
        
        return res.status(200).json({
            ok: true,
            message: `${admin.username} edited successfully`,
            data: admin
        });
    } catch (err) {
        return res.status(404).json({
            ok: false,
            message: "Sorry, we can't edit that admin",
        })
    }
} 