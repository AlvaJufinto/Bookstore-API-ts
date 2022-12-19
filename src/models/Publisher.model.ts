import mongoose, { Schema, model } from 'mongoose';

interface IPublisher {
    belongsto?: mongoose.Types.ObjectId;
    country: string;
}

const PublisherSchema = new Schema<IPublisher>({
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

const PublisherModel = mongoose.model<IPublisher>("Publisher", PublisherSchema);
export default PublisherModel;
