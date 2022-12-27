import { Request, Response } from "express";

import Customer, { ICustomer } from "../models/Customer.model";
import Order, { IOrder } from "../models/Order.model";

export async function addCustomer(req: Request, res: Response) {
    try {
        const customer: ICustomer = await Customer.create({
            ...req.body
        });
    
        return res.status(200).json({
            ok: true,
            message: "Customer added successfully",
            data: customer,
        });
    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 

export async function showAllCustomer(req: Request, res: Response) {
    try {
        const customers: ICustomer[] = await Customer.find()
            .populate("orders")
            .lean();

        return res.status(200).json({
            ok: true,
            message: "Customers fetched successfully",
            data: customers,
        });
    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 

export async function showCustomer(req: Request, res: Response) {
    try {
        const customer: ICustomer = await Customer.findOne({ _id: req.params.id })
            .populate('orders')
            .lean();

    return res.status(200).json({
        ok: true,
        message: `${customer.firstName} ${customer.lastName} fetched successfully`,
        data: customer,
    });
    } catch (err: any) {
        return res.status(404).json({
            ok: false,
            message: "Sorry, there's no Customer with that id",
        })
    }
} 

export async function deleteCustomer(req: Request, res: Response) {
    try {
        const orders: IOrder[] = await Order.find({ 
            "customer": { 
                "$in": req.params.id 
            } 
        }).populate('customer');

        if(orders.length > 0) {
            return res.status(409).json({
                ok: false,
                message: `This customer can't be deleted because they have ${orders.length} order${orders.length > 1 ? 's': ''}`,
                data: orders,
            });
        }

        const customer: ICustomer = await Customer.findOneAndDelete({ _id: req.params.id })
            .populate("orders")
            .lean();

        return res.status(200).json({
            ok: true,
            message: `${customer.firstName} ${customer.lastName} deleted successfully`,
            data: customer,
        });
    } catch (err: any) {
        return res.status(404).json({
            ok: false,
            message: "Sorry, there's no Customer with that id",
        })
    }
} 

export async function editCustomer(req: Request, res: Response) {
    try {
        const customer: ICustomer = await Customer.findOneAndUpdate(
            { _id: req.params.id }, 
            { 
                $set: {     
                    ...req.body
                }
            }, 
            { new: true }
        ) as ICustomer;
        
        return res.status(200).json({
            ok: true,
            message: `${customer.firstName} ${customer.lastName} edited successfully`,
            data: customer,
        });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            message: `Sorry, we can't edit that Customer ${err}`,
        })
    }
} 