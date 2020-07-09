const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '.env' })

class jwtExtensions {
	async verifyJWT(req, res, next) {
		var token = req.headers['x-access-token']
		if (!token) return res.status(401).send()

		jwt.verify(token, process.env.SECRET, (err) => {
			if (err) return res.status(401).send({ message: 'failed to authenticate token' })
		})

		next()
	}
}

module.exports = jwtExtensions
