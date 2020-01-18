const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const User = require('../schemas/User')

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/register', (req, res) => {
	var salt = bcrypt.genSaltSync(10)
	var encryptedPassword = bcrypt.hashSync(req.body.password, salt)
	var user = new User({
		username: req.body.username,
		email: req.body.email,
		password: encryptedPassword
	})

	user.save((err) => {
		if (err) return res.status(500).send({error: err})
		return res.send('user registered')
	})
})

router.post('/login', (req, res) => {
	User.findOne({"username": req.body.username}, (err, doc) => {
		if (err) return res.status(500).send('an unexpected error ocurred')
		if (!doc) return res.status(404).send('user not found')
		
		bcrypt.compare(req.body.password, doc.password, (err, match) => {
			res.send(match)
		})
	})
})

module.exports = router
