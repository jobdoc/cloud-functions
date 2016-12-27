var createApi = require('./api');

//////////////////////
// Selection API
//////////////////////

var schema = require('./selection/selectionSchema');
var controller = require('./selection/selectionController');

var api = createApi('selection', schema, controller)

exports.addSelection = api.add

exports.removeSelection = api.remove

exports.getSelections = api.getAll

exports.getSelection = api.get

exports.updateSelection = api.update

//////////////////////
// Product API
//////////////////////

var schema = require('./product/productSchema');
var controller = require('./product/productController');

var api = createApi('product', schema, controller)

exports.addProduct = api.add

exports.removeProduct = api.remove

exports.getProducts = api.getAll

exports.getProduct = api.get

exports.updateProduct = api.update

//////////////////////
// User API
//////////////////////

var schema = require('./user/userSchema');
var controller = require('./user/userController');

var api = createApi('user', schema, controller)

exports.addUser = api.add

exports.removeUser = api.remove

exports.getUsers = api.getAll

exports.getUser = api.get

exports.updateUser = api.update

//////////////////////
// Comment API
//////////////////////

var schema = require('./comment/commentSchema');
var controller = require('./comment/commentController');

var api = createApi('comment', schema, controller)

exports.addComment = api.add

exports.removeComment = api.remove

exports.getComments = api.getAll

exports.getComment = api.get

exports.updateComment = api.update
