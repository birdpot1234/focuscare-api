const express = require('express');

const router = express.Router();
const setting = require('./controller')
const { validate_token } = require('../middleware/token');

router.post('/setting',
    validate_token(),
    setting.defaultsetting(),
    (req, res) => {
        res.status(req.status).json({ success: req.success, message: req.message })
    }
)

router.get('/check',
    validate_token(),
    setting.checkSetting(),
    (req, res) => {
        res.status(200).json({ success: req.success, result: req.result })
    }
)


router.get('/get',
    validate_token(),
    setting.getSetting(),
    (req, res) => {
        res.status(200).json({ success: req.success, result: req.result })
    }
)

module.exports = router;