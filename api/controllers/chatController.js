var mongoose = require('mongoose'),
    ChatMessages = mongoose.model('Chat');




exports.do_chat = function (req, res) {
    var new_message = new ChatMessages(req.body);
    // console.log("new_message", new_message)
    new_message.save(function (err, chat) {
        if (err)
            res.send(err);
        res.json(chat);
        // res.json({message :chat.message});        
    });
};




exports.get_chat_message = function (req, res) {
    ChatMessages.find({
        'sender': { "$in": [req.headers.sender, req.headers.recepient] },
        'recepient': { "$in": [req.headers.sender, req.headers.recepient] },
    })
        .populate('recepient', 'fullName')
        .exec(function (err, data) {
            if (err) {
                console.log("Error", err)
                res.send({ message: err });
            } else {
                console.log("Yahoooooooo", data)
                res.json({ message: data });

            }
        });
}



