import mongoose, { Schema, model, mongo } from 'mongoose';
interface ICustomer {
    orders?: mongoose.Types.ObjectId;
    firstName: string;
    lastName?: string;
    address: string;
    postalCode: string;
    country: string;
    province: string;
    phoneNumber: string;
}

const CustomerSchema = new Schema<ICustomer>({
    orders: [
        {
            type : mongoose.Types.ObjectId,
            ref : "Order",
        }  
    ],
    firstName: {
        type: String,
        required: [true, "First Name needs to be filled"],
    },
    lastName: {
        type: String,
        required: [true, "Last Name needs to be filled"],
        unique: true,
    },
    address: {
        type: String,
        required: [true, "Address needs to be filled"],
    },
    postalCode: {
        type: String,
        required: [true, "Postal Code needs to be filled"],
    },
    country: {
        type: String,
        required: [true, "Country needs to be filled"],
    },
    province: {
        type: String,
        required: [true, "Province Code needs to be filled"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Postal Code needs to be filled"],
    }
});

const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);
export default Customer;