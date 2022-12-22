import mongoose, { Schema, model, mongo } from 'mongoose';

interface IOrderItem {
    books?: mongoose.Types.ObjectId[];
    customer?: mongoose.Types.ObjectId;
    country: string;
    total: number;
    shippingName: string;
}

const OrderItemSchema = new Schema<IOrderItem>({
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
        required: [true, "Shipping needs to be filled"]
    },
    total: {
        type: Number,
        required: [true, "total must be filled"]
    },
})

const OrderItem = mongoose.model<IOrderItem>("OrderItem", OrderItemSchema);
export default OrderItem;
