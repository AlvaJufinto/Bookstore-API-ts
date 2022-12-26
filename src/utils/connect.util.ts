import mongoose from "mongoose";

import Admin, { IAdmin } from "../models/Admin.model";

export async function connect() {
    const dbUri: string = process.env.DB_URI as string;
    
    try {
        await mongoose.connect(dbUri);
        console.log('DB Connected');
    } catch (err) {
        console.log(err);
        console.log('DB Failed to connect');
        process.exit(1);
    }
}

export async function getAdminById(id: string) {
    try {
        let admin: IAdmin = await Admin.findOne({ 
            _id: id    
        }) as IAdmin;
        
        return admin;
    } catch (err) {
        console.log(err);
        console.log("Can't find admin with that id");
        process.exit(1);
    }
}

