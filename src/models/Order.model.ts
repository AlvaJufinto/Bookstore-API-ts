import mongoose, { Schema, model, mongo } from 'mongoose';

export interface IOrder {
    books?: mongoose.Types.ObjectId[];
    customer?: mongoose.Types.ObjectId;
    country: string;
    total: number;
    shippingName: string;
}

const OrderSchema = new Schema<IOrder>({
    books: [
        {
            type : mongoose.Types.ObjectId,
            ref : "Book"
        }
    ],
    customer: {
        type: mongoose.Types.ObjectId,
        ref: "Customer"
    },
    country: {
        type: String,
        required: [true, "Country needs to be filled"],
    },
    shippingName: {
        type: String,
        required: [true, "Shipping Name needs to be filled"]
    },
    total: {
        type: Number,
        required: [true, "total must be filled"]
    },
})

const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
