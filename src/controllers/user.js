const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const User = require('../schemas/User')
const jwtExtensions = require('../middleware/jwtExtensions')
require('dotenv').config({ path: '.env' })

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
const extensions = new jwtExtensions()

router.post('/login', (req, res) => {
	User.findOne({"username": req.body.username}, (err, doc) => {
		if (err) return res.status(500).send({ message: 'an unexpected error ocurred'})
		if (!doc) return res.status(204).send({ message: 'user not found' })
		
		bcrypt.compare(req.body.password, doc.password, (err, match) => {
			if (err) return res.status(500).send({ message: 'an unexpected error ocurred' })
			if (!match) return res.status(400).send({ auth: false, token: null })
			var id = doc.id
			var token = jwt.sign({ id }, process.env.SECRET, { expiresIn: 3600 })
			res.send({ auth: true, token: token })
		})
	})
})

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
		return res.send({ message: 'user registered' })
	})
})

router.patch('/edit/password', extensions.verifyJWT, async (req, res) => {
	var token = req.headers['authorization']
	if (!token) res.status(401).send()
	var userId = jwt.decode(token.substring(7)).id

	var user = await User.findById(userId)

	bcrypt.compare(req.body.oldPassword, user.password, async (err, match) => {
		if (err) return res.status(500).send({ message: 'an unexpected error ocurred' })
		if (!match) return res.status(400).send({ message: 'old password is invalid' })

		var salt = bcrypt.genSaltSync(10)
		var newPassword = bcrypt.hashSync(req.body.newPassword, salt)
		var update = { password: newPassword }

		await user.updateOne(update)
		return res.send({ message: 'user password changed' })
	})
})

module.exports = router
