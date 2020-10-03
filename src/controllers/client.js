const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const Client = require('../schemas/Client')

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/register/:clientName', async (req, res) => {
	crypto.generateKeyPair('rsa', {
		modulusLength: 4096,
		publicKeyEncoding: { type: 'spki', format: 'pem' },
		privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
	}, async (err, publicKey, privateKey) => {
		if (err) return res.status(500).send({error: err})
		var id = await crypto.randomBytes(15).toString('hex')
		var secret = await crypto.randomBytes(15).toString('hex')
		var client = new Client({
			clientName: req.params.clientName,
			clientId: id,
			clientSecret: secret,
			pubKey: publicKey
		})

		client.save((err) => {
			if (err) return res.status(500).send({error: err})
			return res.send({ clientId: client.clientId, clientSecret: client.clientSecret, privKey: privateKey })
		})
	})
})

module.exports = router