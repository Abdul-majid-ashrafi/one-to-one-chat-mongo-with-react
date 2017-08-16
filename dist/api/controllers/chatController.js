'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChatMessages = _mongoose2.default.model('Chat');

exports.do_chat = function (req, res) {
    // console.log("===========", req.body)
    var new_message = new ChatMessages(req.body);
    new_message.save(function (err, chat) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            return res.json(chat);
        }
    });
};

exports.get_chat_message = function (req, res) {
    ChatMessages.find({
        'sender': { "$in": [req.headers.sender, req.headers.recepient] },
        'recepient': { "$in": [req.headers.sender, req.headers.recepient] }
    }).populate('recepient', 'fullName').exec(function (err, data) {
        if (err) {
            // console.log("Error", err)
            res.send({ message: err });
        } else {
            // console.log("Yahoooooooo", data)
            res.json({ message: data });
        }
    });
};