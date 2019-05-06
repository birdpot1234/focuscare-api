const express = require('express');
const router = express.Router();

const Regist = require('./contrller');

const { validate_token } = require('../middleware/token');

router.get("/test", (req, resp) => {
    Regist.contro.regis_show((res_data) => resp.json(res_data))
})

router.post("/register",
    Regist.register(),
    // Regist.send(),
    
    (req, res) => {

        res.status(200).json({ success: req.success, message: req.message })

    })

router.post('/login',
    Regist.login(),
    Regist.updateToken(),
    (req, res) => {
        res.status(200).json({ success: req.success, message: req.message, result: { token: req.token } })
    }
)

router.post('/logout',
    validate_token(),
    (req, res) => {
        req.session.token = null
        res.status(200).json({ success: true, message: 'ออกจากระบบสำเร็จ' })
    }
)
router.post('/verify',
    Regist.verify(),
    (req, res) => {
        res.redirect("focuscare://vertify?email="+req.query.email)
        //res.status(200).json({ success: req.success, message:req.message})
    }
)
router.post('/activeUser',
    Regist.activeUser(),
    (req, res) => {
        //res.redirect("focuscare://vertify?email="+req.query.email)

        res.status(200).json({ success: req.success, message:req.message})
    }
)




module.exports = router