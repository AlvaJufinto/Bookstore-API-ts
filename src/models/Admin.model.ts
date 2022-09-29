import mongoose, { Schema, model } from 'mongoose';

require("dotenv").config();

interface IAdmin {
    username: string;
    password: string;
    role: string;
} 

const AdminModel = new Schema<IAdmin>({
    username: {
        type: String,
        required: [true, "Username needs to be filled"],
    },
    password: {
        type: String,
        required: [true, "Password needs to be filled"],
    },
    role: {
        type: String,
        enum: ["viewer", "editor", "admin"],
        default: "admin" 
    }
});

module.exports = model("Admin", AdminModel);
