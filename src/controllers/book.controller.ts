import { Request, Response } from "express";

import Book from "./../models/Book.model";
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
        );
        
        const publisherAuthor: any = await Publisher.findOneAndUpdate(
            { _id: publisher },
            { 
                $push: { 
                    books: book._id 
                } 
            },
            { new: true, useFindAndModify: false }
        );

        const { author: authorBook, publisher: publisherBook, ...restBook } = book?._doc;
        const { books: booksAuthor, ...restBookAuthor } = bookAuthor?._doc;
        const { books: booksPublishers, ...restBooksPublishers } = publisherAuthor?._doc;

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