import mongoose, { Schema } from 'mongoose';

import { IAuthor } from "../models/Author.model";
import { IPublisher } from "../models/Publisher.model";

export interface IBook {
    _id?: string | number;
    author?: IAuthor;
    publisher?: IPublisher;
    title: string;
    ISBN: string;
    genre: string[];
    publicationDate: Date;
    price: number;
    toObject: () => IBook;
}

const BookSchema = new Schema<IBook>({
    author: {       
        type: mongoose.Types.ObjectId,
        required : [true, "Title needs to be filled"],
        ref: "Author",
    },
    publisher: {
        type: mongoose.Types.ObjectId,
        ref: "Publisher",
    },
    title: {
        type : String,
        required : [true, "Title needs to be filled"],
        unique : true,
    },
    ISBN : {
        type : String,
        required : [true, "ISBN needs to be filled"],
    },
    genre : [
        {
            type: String,
            required : [true, "Genre needs to be filled"]
        }
    ],
    publicationDate : {
        type: Date,
        required : [true, "Publication date needs to be filled"],
    },
    price : {
        type: Number,
        required : [true, "Price needs to be filled"],
    },
});


const Book = mongoose.model<IBook>("Book", BookSchema);
export default Book;
