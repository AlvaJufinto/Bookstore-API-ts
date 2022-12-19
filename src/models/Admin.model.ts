import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

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

AdminSchema.pre("save", async function(next: any) {
    let admin = this as IAdmin;
    
    // if(!admin?.isModified('password')) {
    //     return next();
    // }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hashSync(admin.password, salt);

    console.log("hashedPassword", hashedPassword)

    admin.password = hashedPassword;

    return next();
});

const AdminModel = mongoose.model<IAdmin>("Admin", AdminSchema);
export default AdminModel;