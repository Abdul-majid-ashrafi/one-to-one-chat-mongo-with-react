module.exports = function (app) {
	// console.log("APP", app.route, "=======")
	var messageChat = require('../controllers/chatController')
	var userHandlers = require('../controllers/userController.js');

	// todoList Routes
	app.route('/chat')
		.get(userHandlers.loginRequired, messageChat.get_chat_message)
		.post(userHandlers.loginRequired, messageChat.do_chat);

	// app.route('/tasks/:taskId')
	// 	.get(todoList.read_a_task)
	// 	.put(todoList.update_a_task)
	// 	.delete(todoList.delete_a_task);

	app.route('/auth/register')
		.post(userHandlers.register);

	app.route('/auth/sign_in')
		.post(userHandlers.sign_in);
};
