const express = require('express')

const router = express.Router()

router.use('/api/user', require('../controllers/user'))
router.use('/api/auth', require('../controllers/auth'))
router.use('/api/client', require('../controllers/client'))

router.get('/health', (req, res) => {
	res.send('ok')
})

module.exports = router