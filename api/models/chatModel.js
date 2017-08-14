import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    message: {
        type: String
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'UserTemp', required: true
    },
    recepient: {
        type: Schema.Types.ObjectId,
        ref: 'UserTemp',
        required: true
    }
});


mongoose.model('Chat', MessageSchema);

