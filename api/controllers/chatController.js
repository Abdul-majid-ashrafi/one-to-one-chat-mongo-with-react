import mongoose from 'mongoose';
const ChatMessages = mongoose.model('Chat');


exports.do_chat = (req, res) => {
    // console.log("===========", req.body)
    var new_message = new ChatMessages(req.body);
    new_message.save((err, chat) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            return res.json(chat);
        }
    });
};




exports.get_chat_message = (req, res) => {
    ChatMessages.find({
        'sender': { "$in": [req.headers.sender, req.headers.recepient] },
        'recepient': { "$in": [req.headers.sender, req.headers.recepient] },
    })
        .populate('recepient', 'fullName')
        .exec((err, data) => {
            if (err) {
                // console.log("Error", err)
                res.send({ message: err });
            } else {
                // console.log("Yahoooooooo", data)
                res.json({ message: data });

            }
        });
}



