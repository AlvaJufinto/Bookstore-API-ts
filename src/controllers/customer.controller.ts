import { Request, Response } from "express";

import Customer, { ICustomer } from "../models/Customer.model";

export async function addCustomer(req: Request, res: Response) {
    try {
       
    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 

export async function showAllCustomer(req: Request, res: Response) {
    try {
        
    } catch (err: any) {
        
    }
} 

export async function showCustomer(req: Request, res: Response) {
    try {
        
    } catch (err: any) {
        return res.status(404).json({
            ok: false,
            message: "Sorry, there's no Customer with that id",
        })
    }
} 

export async function deleteCustomer(req: Request, res: Response) {
    try {
       
    } catch (err: any) {
        return res.status(404).json({
            ok: false,
            message: "Sorry, there's no Customer with that id",
        })
    }
} 

export async function editCustomer(req: Request, res: Response) {
    try {
        
    } catch (err) {
        return res.status(404).json({
            ok: false,
            message: "Sorry, we can't edit that Customer",
        })
    }
} 