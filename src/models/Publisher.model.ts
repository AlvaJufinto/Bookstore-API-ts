import mongoose, { Schema, model } from 'mongoose';

import { IBook } from './Book.model';

export interface IPublisher {
    _id?: string | number;
    books?: IBook;
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
