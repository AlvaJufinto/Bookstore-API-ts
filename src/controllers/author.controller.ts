import { Request, Response } from "express";

import Author, { IAuthor } from "../models/Author.model";
import Book, { IBook } from "../models/Book.model";

export async function addAuthor(req: Request, res: Response) {
    try {
        const author = await Author.create({
            
        })

        return res.status(200).json({
            ok: true,
            message: "Author added successfully",
            data: {}, 
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
      

    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 

export async function showAuthor(req: Request, res: Response) {
    try {

        return res.status(200).json({
            ok: true,
            message: `fetched successfully`,
            data: {} 
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
    
        return res.status(200).json({
            ok: true,
            message: ` deleted successfully`,
            data: {},
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

        return res.status(200).json({
            ok: true,
            message: ` edited successfully`,
            data: {  } 
        });

    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: err.message,
        })
    }
} 

