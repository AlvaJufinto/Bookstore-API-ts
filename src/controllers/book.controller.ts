import { Request, Response } from "express";

import Book, { IBook } from "./../models/Book.model";
import Author from "../models/Author.model";
import Publisher from "../models/Publisher.model";

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

        const bookAuthor: any = await Author.findOneAndUpdate(
            { _id: author },
            { 
                $push: { 
                    books: book._id 
                } 
            },
            { new: true, useFindAndModify: false }
        ).lean();
        
        const publisherAuthor: any = await Publisher.findOneAndUpdate(
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
        const book: any = await Book.findOne({ _id: req.params.id })
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
        const book: any = await Book.findOneAndDelete({ _id: req.params.id })
            .populate("author")
            .populate("publisher")


        const bookAuthor: any = await Author.findOneAndUpdate(
            { _id: book.author },
            { 
                $pull: { 
                    books: book._id 
                } 
            },
        );
        
        const publisherAuthor: any = await Publisher.findOneAndUpdate(
            { _id: book.publisher },
            { 
                $pull: { 
                    books: book._id 
                } 
            },
        );

        return res.status(200).json({
            ok: true,
            message: "Book deleted successfully",
            data: { 
                book, bookAuthor, publisherAuthor, 
            } 
        });

    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 
