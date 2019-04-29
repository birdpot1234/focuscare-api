const express = require('express');
const router = express.Router();

const Regist = require('./contrller');

const { validate_token } = require('../middleware/token');

router.get("/test", (req, resp) => {
    Regist.contro.regis_show((res_data) => resp.json(res_data))
})

router.post('/login',
    Regist.login(),
    (req, res) => {
        res.status(200).json({ success: req.success, message: req.message, token: req.token })
    }
)

module.exports = router