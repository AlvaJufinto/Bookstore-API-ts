import { Request, Response } from "express";

import Book, { IBook }  from "../models/Book.model";
import Publisher, { IPublisher } from "../models/Publisher.model";

export async function addPublisher(req: Request, res: Response) {
    try {
        const publisher: IPublisher = await Publisher.create({
            ...req.body
        });

        return res.status(200).json({
            ok: true,
            message: "Publisher added successfully",
            data: publisher, 
        });
    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 

export async function showAllPublisher(req: Request, res: Response) {
    try {
        const publishers: IPublisher[] = await Publisher.find()
            .populate("books")
            .lean();
        
        return res.status(200).json({
            ok: true,
            message: "Publishers fetched successfully",
            data: publishers,
        });
    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: "Sorry, We can't fetch Publishers for now",
        })
    }
} 

export async function showPublisher(req: Request, res: Response) {
    try {
        const publisher: IPublisher = await Publisher.findOne({ _id: req.params.id })
            .populate("books")
            .lean()

        return res.status(200).json({
            ok: true,
            message: `${publisher.name} fetched successfully`,
            data: publisher,
        });
    } catch (err: any) {
        return res.status(404).json({
            ok: false,
            message: "Sorry, there's no Publisher with that id",
        })
    }
} 

export async function deletePublisher(req: Request, res: Response) {
    try {
        const books: IBook[] = await Book.find({ 
            "publisher": { 
                "$in": req.params.id 
            } 
        }).populate('publisher');

        if(books.length > 0) {
            return res.status(409).json({
                ok: false,
                message: `This publisher can't be deleted because they have ${books.length} book${books.length > 1 ? 's': ''}`,
                data: books,
            });
        }

        const publisher: IPublisher = await Publisher.findOneAndDelete({ _id: req.params.id })
            .populate("books")
            .lean();

        return res.status(200).json({
            ok: true,
            message: `${publisher.name} deleted successfully`,
            data: publisher,
        });
    } catch (err: any) {
        return res.status(404).json({
            ok: false,
            message: "Sorry, there's no Publisher with that id",
        })
    }
} 

export async function editPublisher(req: Request, res: Response) {
    try {
        const { books, ...restPublisher } = req.body;        

        const publisher: IPublisher = await Publisher.findOneAndUpdate(
            { _id: req.params.id }, 
            { 
                $set: restPublisher 
            },
            { new: true }
        )
            .populate("books")
            .lean(); 

        return res.status(200).json({
            ok: true,
            message: "publisher edited successfully",
            data: publisher
        });
    } catch (err) {
        return res.status(404).json({
            ok: false,
            message: "Sorry, we can't edit that Publisher",
        })
    }
} 