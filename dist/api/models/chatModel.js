'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

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

_mongoose2.default.model('Chat', MessageSchema);