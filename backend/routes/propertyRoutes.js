const express = require('express')

const { uploadS3 } = require("../utils/multer-config")

const router = express.Router()

const {
    getProperties,
    getPropertiesForRent,
    getPropertiesForSale,
    getProperty,
    createProperty,
    deleteProperty,
    updateProperty,
} = require('../controller/propertyController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, uploadS3.array('photos', 7), createProperty)
router.route('/user').get(protect, getProperties)
router.route('/rent').get(getPropertiesForRent)
router.route('/sale').get(getPropertiesForSale)
router.route('/:id').get(getProperty)
router.route('/:id').delete(protect, deleteProperty).put(protect, uploadS3.array('photos', 7), updateProperty)


module.exports = router