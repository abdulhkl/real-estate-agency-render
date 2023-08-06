const express = require('express')

const router = express.Router()

const {
    registerUser,
    loginUser,
    getMe,
    updateMe,
} = require('../controller/userController')

const { protect } = require('../middleware/authMiddleware')

const { uploadS3 } = require("../utils/multer-config")



router.post('/', uploadS3.single('photo'), registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.put('/me', protect, uploadS3.single('photo'), updateMe)



module.exports = router