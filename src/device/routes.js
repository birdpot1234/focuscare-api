const express = require('express');
const router = express.Router();
const deviceController = require('./controller');
const { validate_token } = require('../middleware/token');

router.post('/insert',
    validate_token(),
    deviceController.insertDeviceInfo(),
    (req, res) => {
        res.status(200).json({ success: req.success, message: req.message })
    }
)

module.exports = router;