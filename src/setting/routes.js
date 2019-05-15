const express = require('express');

const router = express.Router();
const setting = require('./controller')


router.post('/setting',
    setting.defaultsetting(),
    (req, res) => {
        res.status(req.status).json({ success: req.success, message: req.message })
    }
)


module.exports = router;