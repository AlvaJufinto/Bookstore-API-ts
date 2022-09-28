import mongoose, { Schema, model } from 'mongoose';

require("dotenv").config();

interface IPublisher {
    belongsto?: mongoose.Types.ObjectId;
    country: string;
}

const PublisherModel = new Schema<IPublisher>({
    belongsto: {
        type: mongoose.Types.ObjectId,
        required: [true, "Field needs to be filled"],
        ref: 'book'
    },
    country: {
        type: String,
        required: [true, "Country needs to be filled"]
    }
});

module.exports = model("publisher", PublisherModel);
