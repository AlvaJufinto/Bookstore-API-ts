import mongoose, { Schema, model } from 'mongoose';

export interface IAdmin {
    username: string;
    fullname: string;
    password: string;
    description: string;
    role: string;
} 

const AdminSchema = new Schema<IAdmin>({
    username: {
        type: String,
        required: [true, "Username needs to be filled"],
    },
    fullname: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
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

const AdminModel = mongoose.model<IAdmin>("Admin", AdminSchema);
export default AdminModel;