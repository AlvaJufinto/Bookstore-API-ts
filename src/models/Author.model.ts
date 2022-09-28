import mongoose, { Schema, model } from 'mongoose';

require("dotenv").config();

interface IAuthor {
    belongsto?: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    country: string;
} 

const AuthorModel = new Schema<IAuthor>({
    belongsto : {
        type : mongoose.Types.ObjectId,
        required : [true, "Field needs to be filled"],
        ref : "Book"
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    }
});

module.exports = model("author", AuthorModel);
