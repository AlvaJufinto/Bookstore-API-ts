import { NextFunction } from 'express';
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IAdmin {
    _id?: string | number;
    username: string;
    fullname: string;
    password: string;
    description: string;
    role: string;
    toObject: () => IAdmin;
} 

const AdminSchema = new Schema<IAdmin>({
    username: {
        type: String,
        required: [true, "Username needs to be filled"],
        unique: true,
    },
    fullname: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        enum: ["viewer", "editor", "admin"],
        default: "admin" 
    },
    password: {
        type: String,
        required: [true, "Password needs to be filled"],
    }
});


AdminSchema.pre("save", async function(next: NextFunction | any) {
    let admin = this;
    
    if(!admin?.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(Number(process.env.GEN_SALT));
    const hashedPassword = await bcrypt.hashSync(admin.password, salt);

    admin.password = hashedPassword;

    return next();
});

const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
export default Admin;