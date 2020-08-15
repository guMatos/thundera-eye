const express = require('express')
const bodyParser = require('body-parser')
const jwtExtensions = require('../middleware/jwtExtensions')

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
const extensions = new jwtExtensions()

router.post('/assert', extensions.verifyJWT, (req, res) => { return res.send() })

module.exports = router
