import mongoose, { Schema, model, mongo } from 'mongoose';
interface ICustomer {
    orderItems?: mongoose.Types.ObjectId;
    firstName: string;
    lastName?: string;
    address: string;
    postalCode: string;
    country: string;
    province: string;
    phoneNumber: string;
}

const CustomerSchema = new Schema<ICustomer>({
    orderItems: [
        {
            type : mongoose.Types.ObjectId,
            ref : "OrderItem",
        }  
    ],
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    }
})

const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);
export default Customer;