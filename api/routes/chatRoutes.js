import messageChat from '../controllers/chatController'
import userHandlers from '../controllers/userController'
module.exports = (app) => {

	const allowCrossDomain = (req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
		// intercept OPTIONS method
		if ('OPTIONS' === req.method) {
			res.sendStatus(200);
		} else {
			next();
		}
	};
	app.use(allowCrossDomain);


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
