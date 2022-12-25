import { Request, Response } from "express";

import Order, { IOrder } from "../models/Order.model";
import Book, { IBook } from "../models/Book.model";
import Customer from "../models/Customer.model";

export async function addOrder(req: Request, res: Response) {
    try {
        let withId: boolean = req.query.withId === 'true' ? true : false;
        const { customer, books, ...restBody } = req.body;
        let formattedBooks: IBook[] = [];
        let formattedOrders: IOrder[] = [];


        if(withId) {
            const order: IOrder = await Order.create({
                customer,
                books: {
                    _id: req.params.id,
                },
                ...restBody
            }); 

            books?.map(async (book: IBook) => {
                formattedBooks?.push(await Book.findOne({ _id: book })?.lean());
            });

            console.log(await formattedBooks)

            const orderCustomer: IOrder = await Customer.findOneAndUpdate(
                { _id: customer },
                { 
                    $push: { 
                        orders: order?._id 
                    } 
                },
                { new: true, useFindAndModify: false }
            ).lean();
                
            const { customer: customerOrder, books: booksOrder, ...restOrder } = order;
            
            return res.status(200).json({
                ok: true,
                messsage: {
                    ...restOrder,
                    books: formattedBooks,
                    customer: orderCustomer
                }
            })
        }

        // TODO: Make order without ID

        // return res.status(200).json({
        //     ok: false,
        //     message: withId,
        //     data: {
        //         books: formattedBooks
        //     }
        // })

    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 

export async function showAllOrder(req: Request, res: Response) {
    try {
        const order: IOrder[] = await Order.find()
            .populate('customer')
            .populate('books')
            .lean();
        
        return res.status(200).json({
            ok: true,
            message: "Orders fetched successfully",
            data: order,
        });
    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 

export async function showOrder(req: Request, res: Response) {
    try {
        const order: IOrder = await Order.findOne({ _id: req.params.id })
            .populate('customer')
            .populate('books')
            .lean();
    
        return res.status(200).json({
            ok: true,
            message: `Order fetched successfully`,
            data: order,
        });
    } catch (err: any) {
        return res.status(404).json({
            ok: false,
            message: "Sorry, there's no Order with that id",
        })
    }
} 

export async function deleteOrder(req: Request, res: Response) {
    try {
        const order: IOrder = await Order.findOneAndDelete({ _id: req.params.id })
            .populate('customer')
            .populate('books')
            .lean();
        
        await Customer.findOneAndUpdate(
            { _id: order?.customer },
            { 
                $pull: { 
                    orders: order?._id 
                } 
            },
        );
        
        return res.status(200).json({
            ok: true,
            message: `${order?.customer?.firstName} ${order?.customer?.lastName}'s order deleted successfully`,
            data: order,
        });
    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 

export async function editOrder(req: Request, res: Response) {
    try {
        const { books, customer, total, ...restOrder } = req.body
        
        const order: IOrder = await Order.findOneAndUpdate(
            { _id: req.params.id }, 
            { 
                $set: {     
                    ...restOrder, 
                }
            }, 
            { new: true }
        ).lean();
        
        return res.status(200).json({
            ok: true,
            message: `Order edited successfully`,
            data: order,
        });
    
    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 

