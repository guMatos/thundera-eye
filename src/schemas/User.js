const mongoose = require('mongoose')
const validator = require('validator')

var userSchema = new mongoose.Schema({
	username: { type: String, required: true, maxlength: 100, minlength: 1, unique: true, dropDups: true },
	email: { type: String, required: true, unique: true, dropDups: true, validate: {
		validator: validator.isEmail,
		message: 'invalid email'
	}},
	password: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema)