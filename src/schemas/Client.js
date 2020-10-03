const mongoose = require('mongoose')

var clientSchema = new mongoose.Schema({
	clientName: { type: String, required: true, unique: true, dropDups: true, minlength: 5, maxlength: 50 },
	clientId: { type: String, required: true, unique: true, dropDups: true, minlength: 30, maxlength: 30 },
	clientSecret: { type: String, required: true, minlength: 30, maxlength: 30 },
	pubKey: { type: String, required: true }
})

module.exports = mongoose.model('Client', clientSchema)