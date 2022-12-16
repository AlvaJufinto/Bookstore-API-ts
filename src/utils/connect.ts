import mongoose from "mongoose";

async function connect() {
    const dbUri: string = process.env.DB_URI as string;

    try {
        await mongoose.connect(dbUri);
        console.log('DB Connected');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

export default connect;