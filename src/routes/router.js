const express = require('express')

const router = express.Router()

router.use('/api', require('../controllers/user'))

router.get('/health', (req, res) => {
	res.send('ok')
})

module.exports = router