import mongoose, { Schema, model, mongo } from 'mongoose';

import { IOrder } from './Order.model';

export interface ICustomer {
    _id?: string | number;
    orders: IOrder[];
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    country: string;
    province: string;
    phoneNumber: string;
    toObject(): ICustomer;
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