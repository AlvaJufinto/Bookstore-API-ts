const mongoose = require("mongoose");

const { Schema, model } = mongoose;

require("dotenv").config();

const BookModel = new Schema({
    author: {       
        type: mongoose.Types.OnjectId,
        ref: "post",
    },
    publisher: {
        type: mongoose.Types.OnjectId,
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
    publicationYear : {
        type: String,
        required : [true, "Publication year needs to be filled"],
    },
    price : {
        type: Number,
        required : [true, "Price needs to be filled"],
    },
    profilePict : {
        imageUrl : {
            type : String
        },
        imageID : {
            type : String
        }
    },
    condition: {
        type: String,
        enum: ["good", "bad"],
        default: "good" 
    }
});

module.exports = model("book", BookModel);
