import mongoose, { Schema, model } from 'mongoose';

export interface IAuthor {
    books?: mongoose.Types.ObjectId;
    firstName: string;
    lastName?: string;
    country: string;
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
        unique: true,
    },
    country: {
        type: String,
        required: [true, "Country needs to be filled"],
    }
});

const Author = mongoose.model<IAuthor>("Author", AuthorSchema);
export default Author;
