import { Request, Response } from "express";

import Publisher, { IPublisher } from "../models/Publisher.model";

export async function addPublisher(req: Request, res: Response) {
    try {
        const { books, ...restPublishers } = req.body;

        const publisher: IPublisher = await Publisher.create({
            ...req.body
        })

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
    } catch (err: any) {
        return res.status(400).json({
            ok: false,
            message: "Sorry, We can't fetch Publishers for now",
        })
    }
} 

export async function showPublisher(req: Request, res: Response) {
    try {
    } catch (err: any) {
        return res.status(404).json({
            ok: false,
            message: "Sorry, there's no Publisher with that id",
        })
    }
} 

export async function deletePublisher(req: Request, res: Response) {
    try {
    } catch (err: any) {
        return res.status(404).json({
            ok: false,
            message: "Sorry, there's no Publisher with that id",
        })
    }
} 

export async function editPublisher(req: Request, res: Response) {
    try {
    } catch (err) {
        return res.status(404).json({
            ok: false,
            message: "Sorry, we can't edit that Publisher",
        })
    }
} 