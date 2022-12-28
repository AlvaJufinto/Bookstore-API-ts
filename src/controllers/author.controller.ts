import { Request, Response } from "express";

import Author, { IAuthor } from "../models/Author.model";
import Book, { IBook } from "../models/Book.model";

export async function addAuthor(req: Request, res: Response) {
    try {
        const author: IAuthor = await Author.create({
            ...req.body
        })

        return res.status(200).json({
            ok: true,
            message: "Author added successfully",
            data: author, 
        });
    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 

export async function showAllAuthor(req: Request, res: Response) {
    try {
        const authors: IAuthor[] = await Author.find()
            .populate("books")
            .lean();
        
        return res.status(200).json({
            ok: true,
            message: "Authors fetched successfully",
            data: authors,
        });
    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 

export async function showAuthor(req: Request, res: Response) {
    try {
        const author: IAuthor = await Author.findOne({ _id: req.params.id })
            .populate("books")
            .lean();
        
        return res.status(200).json({
            ok: true,
            message: `${author.firstName} ${author.lastName} fetched successfully`,
            data: author,
        });

    } catch (err: any) {
        return res.status(404).json({
            ok: false,
            message: "Sorry, there's no Author with that id",
        })
    }
} 

export async function deleteAuthor(req: Request, res: Response) {
    try {
        const books: IBook[] = await Book.find({ 
            "author": { 
                "$in": req.params.id 
            } 
        }).populate('author');

        if(books.length > 0) {
            return res.status(409).json({
                ok: false,
                message: `This author can't be deleted because they have ${books.length} book${books.length > 1 ? 's': ''}`,
                data: books,
            });
        }

        const author: IAuthor = await Author.findOneAndDelete({ _id: req.params.id })
            .populate("books")
            .lean();

        return res.status(200).json({
            ok: true,
            message: `${author.firstName} ${author.lastName} deleted successfully`,
            data: author,
        });

    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 

export async function editAuthor(req: Request, res: Response) {
    try {
        const { books, ...restAuthor } = req.body;        

        const author: IAuthor = await Author.findOneAndUpdate(
            { _id: req.params.id }, 
            { 
                $set: restAuthor 
            },
            { new: true }
        )
            .populate("books")
            .lean(); 

        return res.status(200).json({
            ok: true,
            message: `Author edited successfully`,
            data: author
        });

    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 

