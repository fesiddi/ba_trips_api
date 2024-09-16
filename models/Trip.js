import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
    },
    display_name: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            delete ret.userId;
        },
    },
});


export default mongoose.model('Trip', TripSchema);
