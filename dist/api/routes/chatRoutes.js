'use strict';

var _chatController = require('../controllers/chatController');

var _chatController2 = _interopRequireDefault(_chatController);

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {

	// todoList Routes
	app.route('/chat').get(_userController2.default.loginRequired, _chatController2.default.get_chat_message).post(_userController2.default.loginRequired, _chatController2.default.do_chat);

	// app.route('/tasks/:taskId')
	// 	.get(todoList.read_a_task)
	// 	.put(todoList.update_a_task)
	// 	.delete(todoList.delete_a_task);
	app.route('/friend/list').get(_userController2.default.loginRequired, _userController2.default.allUser);

	app.route('/auth/register').post(_userController2.default.register);

	app.route('/auth/sign_in').post(_userController2.default.sign_in);
};