const express = require('express');
const router = express.Router();
const Regist = require('./contrller');


router.get("/test", (req, resp) => {
    Regist.contro.regis_show((res_data) => resp.json(res_data))
})

router.post("/register",
    Regist.register(),
    (req, res) => {

        res.status(200).json({ success: true, message: req.message })

    })

router.post('/login',
    Regist.login(),
    (req, res) => {
        res.status(200).json({ success: true, message: req.message })
    }
)

module.exports = router