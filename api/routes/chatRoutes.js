import messageChat from '../controllers/chatController'
import userHandlers from '../controllers/userController'
module.exports = (app) => {


	// todoList Routes
	app.route('/chat')
		.get(userHandlers.loginRequired, messageChat.get_chat_message)
		.post(userHandlers.loginRequired, messageChat.do_chat);

	// app.route('/tasks/:taskId')
	// 	.get(todoList.read_a_task)
	// 	.put(todoList.update_a_task)
	// 	.delete(todoList.delete_a_task);
	app.route('/friend/list')
		.get(userHandlers.loginRequired, userHandlers.allUser)

	app.route('/auth/register')
		.post(userHandlers.register);

	app.route('/auth/sign_in')
		.post(userHandlers.sign_in);
};
