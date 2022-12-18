import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config();

async function connect() {
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

export default connect;