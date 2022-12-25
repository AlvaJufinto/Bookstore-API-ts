import mongoose, { Schema, model } from 'mongoose';

export interface IPublisher {
    books?: mongoose.Types.ObjectId;
    name: string;
    country: string;
}

const PublisherSchema = new Schema<IPublisher>({
    books: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Book'
        }
    ],
    name: {
        type: String,
        required: [true, "Name needs to be filled"]
    },
    country: {
        type: String,
        required: [true, "Country needs to be filled"]
    }
});

const Publisher = mongoose.model<IPublisher>("Publisher", PublisherSchema);
export default Publisher;
