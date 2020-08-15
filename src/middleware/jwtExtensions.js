const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '.env' })

class jwtExtensions {
	async verifyJWT(req, res, next) {
		var token = req.headers['authorization']
		if (!token) return res.status(401).send()
		token = token.substring(7)

		jwt.verify(token, process.env.SECRET, (err) => {
			if (err) return res.status(401).send({ message: 'failed to authenticate token' })
		})

		next()
	}
}

module.exports = jwtExtensions
