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
            type: mongoose.Types.ObjectId,
            required : [true, "Field needs to be filled"],
            ref : "book"
        }
    ],
    customer: {
        type: mongoose.Types.ObjectId,
        required : [true, "Field needs to be filled"],
        ref : "customer"
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
