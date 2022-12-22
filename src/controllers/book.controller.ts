import { Request, Response } from "express";
import bcrypt from "bcrypt";

import Book from "./../models/Book.model";

export async function addBook(req: Request, res: Response) {
    try {
        const { author, publisher, title, ISBN, genre, price, publicationDate } = req.body;

        const book: any = await Book.create({
            author,
            publisher,
            title,
            ISBN,
            genre,
            publicationDate,
            price
        });
        const { __v, ...rest } = book?._doc;
        
        return res.status(200).json({
            ok: true,
            message: "Book added successfully",
            data: { ...rest }
        });
    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 
