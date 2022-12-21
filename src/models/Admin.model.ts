import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

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
        unique: true,
    },
    fullname: {
        type: String,
    },
    description: {
        type: String,
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


AdminSchema.pre("save", async function(next: any) {
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