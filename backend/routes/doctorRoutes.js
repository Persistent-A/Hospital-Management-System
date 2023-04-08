const express = require('express')
const router = express.Router()
const { registerDoctor, loginDoctor, getMe } = require('../controllers/doctorController')

const {protect} = require('../middleware/authMiddleware')

router.post('/register', registerDoctor)
router.post('/login', loginDoctor)
router.get('/me', protect, getMe)

module.exports = router