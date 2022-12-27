import mongoose, { Schema, model } from 'mongoose';
import { IBook } from './Book.model';

export interface IAuthor {
    _id?: string | number;
    books?: IBook[];
    firstName: string;
    lastName?: string;
    country: string;
    toObject(): IAuthor;
} 

const AuthorSchema = new Schema<IAuthor>({
    books: [
        {
            type: mongoose.Types.ObjectId,
            ref : "Book"
        },
    ],
    firstName: {
        type: String,
        required: [true, "Firstname needs to be filled"],
    },
    lastName: {
        type: String,
        required: [true, "Firstname needs to be filled"],
    },
    country: {
        type: String,
        required: [true, "Country needs to be filled"],
    }
});

const Author = mongoose.model<IAuthor>("Author", AuthorSchema);
export default Author;
