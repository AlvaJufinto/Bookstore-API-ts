import mongoose, { Schema, model } from 'mongoose';

require("dotenv").config();

interface IBook {
    author?: mongoose.Types.ObjectId;
    publisher?: mongoose.Types.ObjectId;
    title?: string;
    ISBN: string;
    genre: string[];
    publicationDate: Date;
    price: Number;
    profilePict: String;
    condition: String;
}

const BookModel = new Schema<IBook>({
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

module.exports = model("book", BookModel);
