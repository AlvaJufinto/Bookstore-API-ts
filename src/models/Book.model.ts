import mongoose, { Schema, model } from 'mongoose';

interface IBook {
    author?: mongoose.Types.ObjectId;
    publisher?: mongoose.Types.ObjectId;
    title?: string;
    ISBN: string;
    genre: string[];
    publicationDate: Date;
    price: number;
    profilePict: string;
    condition: string;
}

const BookSchema = new Schema<IBook>({
    author: {       
        type: mongoose.Types.ObjectId,
        ref: "post",
    },
    publisher: {
        type: mongoose.Types.ObjectId,
        ref: "publisher",
    },
    title: {
        type : String,
        required : [true, "Title needs to be filled"],
        unique : [true, "Title must unique"],
    },
    ISBN : {
        type : String,
        required : [true,"ISBN needs to be filled"],
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
    profilePict : {
        type: String,
    },
    condition: {
        type: String,
        enum: ["good", "bad"],
        default: "good" 
    }
});

const Book = mongoose.model<IBook>("Book", BookSchema);
export default Book;
