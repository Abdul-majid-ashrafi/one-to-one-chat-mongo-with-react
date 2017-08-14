var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
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


module.exports = mongoose.model('Chat', MessageSchema);

  