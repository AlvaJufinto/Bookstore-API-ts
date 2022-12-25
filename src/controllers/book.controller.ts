import { Request, Response } from "express";

import Book, { IBook } from "./../models/Book.model";
import Author, { IAuthor } from "../models/Author.model";
import Publisher, { IPublisher } from "../models/Publisher.model";

export async function addBook(req: Request, res: Response) {
    try {
        const { author, publisher } = req.body;

        const book: IBook = await Book.create({
            ...req.body
        }); 

        const bookAuthor: IAuthor = await Author.findOneAndUpdate(
            { _id: author },
            { 
                $push: { 
                    books: book._id 
                } 
            },
            { new: true, useFindAndModify: false }
        ).lean();
        
        const publisherAuthor: IPublisher = await Publisher.findOneAndUpdate(
            { _id: publisher },
            { 
                $push: { 
                    books: book._id 
                } 
            },
            { new: true, useFindAndModify: false }
        ).lean();

        const { author: authorBook, publisher: publisherBook, ...restBook } = book.toObject();
        const { books: booksAuthor, ...restBookAuthor } = bookAuthor;
        const { books: booksPublishers, ...restBooksPublishers } = publisherAuthor;

        return res.status(200).json({
            ok: true,
            message: "Book added successfully",
            data: { 
                ...restBook,
                author: restBookAuthor,
                publisher: restBooksPublishers,
            } 
        });
    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 

export async function showAllBook(req: Request, res: Response) {
    try {
        const books: IBook[] = await Book.find({})
            .populate("author")
            .populate("publisher");

        return res.status(200).json({
            ok: true,
            message: "Books fetched successfully",
            data: { 
                ...books,                
            } 
        });

    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 

export async function showBook(req: Request, res: Response) {
    try {
        const book: IBook = await Book.findOne({ _id: req.params.id })
            .populate("author")
            .populate("publisher")
            .lean()

        return res.status(200).json({
            ok: true,
            message: "Book fetched successfully",
            data: { 
                ...book,
            } 
        });

    } catch (err: any) {
        return res.status(404).json({
            ok: false,
            message: "Sorry, there's no book with that id",
        })
    }
} 

export async function deleteBook(req: Request, res: Response) {
    try {
        const book: IBook = await Book.findOneAndDelete({ _id: req.params.id })
            .populate("author")
            .populate("publisher")
            .lean();

        await Author.findOneAndUpdate(
            { _id: book.author },
            { 
                $pull: { 
                    books: book._id 
                } 
            },
        );
        
        await Publisher.findOneAndUpdate(
            { _id: book.publisher },
            { 
                $pull: { 
                    books: book._id 
                } 
            },
        );

        return res.status(200).json({
            ok: true,
            message: `"${book?.title}" deleted successfully`,
            data: { 
                ...book,  
            } 
        });

    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 

export async function editBook(req: Request, res: Response) {
    try {
        const { author, publisher } = req.body;        
        const oldBook: IBook = await Book.findOne({ _id: req.params.id }) as IBook;   

        if(author !== oldBook?.author?._id?.toString()) {
            await Author.findOneAndUpdate(
                { _id: author },
                { 
                    $push: { 
                        books: req.params.id
                    } 
                },
            );

            await Author.findOneAndUpdate(
                { _id: oldBook?.author?._id },
                { 
                    $pull: { 
                        books: req.params.id
                    } 
                },
            );
        }

        if(publisher !== oldBook?.publisher?._id?.toString()) {
            await Publisher.findOneAndUpdate(
                { _id: publisher },
                { 
                    $push: { 
                        books: req.params.id
                    } 
                },
            );

            await Publisher.findOneAndUpdate(
                { _id: oldBook?.publisher?._id },
                { 
                    $pull: { 
                        books: req.params.id
                    } 
                },
            );
        }

        const book: IBook = await Book.findOneAndUpdate(
            { _id: req.params.id }, 
            { 
                $set: req.body 
            },
            { new: true }

        )
        .populate("author")
        .populate("publisher")
        .lean(); 


        return res.status(200).json({
            ok: true,
            message: `${book?.title} edited successfully`,
            data: { 
                ...book
            } 
        });

    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 

