const express = require('express');
const router = express.Router();

const Regist = require('./contrller');

const { validate_token } = require('../middleware/token');

router.get("/test", (req, resp) => {
    Regist.contro.regis_show((res_data) => resp.json(res_data))
})

router.post("/register",
    Regist.register(),
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
router.get('/verify',
    Regist.verify(),
    (req, res) => {
        res.redirect("focuscare://vertify?" + req.decry)
        //res.status(200).json({ success: req.success, message:req.message})
    }
)

router.post('/activeUser',
    Regist.activeUser(),
    (req, res) => {
        //res.redirect("focuscare://vertify?email="+req.query.email)
        res.status(200).json({ success: req.success, message: req.message, active: req.active })
    }
)
router.post('/forGetpassword',
    Regist.forGetpassword(),
    (req, res) => {
        //res.redirect("focuscare://vertify?email="+req.query.email)

        res.status(200).json({ success: req.success, message: req.message })
    }
)
router.get('/verifyForgetpass',
    Regist.verifyForgetpass(),
    (req, res) => {
        res.redirect("focuscare://verifyForgetpass?" + req.decry)
        //res.status(200).json({ success: req.success, message:req.message})
    }
)
router.post('/checkTokenverify',
    Regist.checkTokenverify(),
    (req, res) => {

        res.status(200).json({ success: req.success, message: req.message })
    }
)
router.post('/setNewpassword',
    Regist.setNewpassword(),
    (req, res) => {
        res.status(200).json({ success: req.success, message: req.message })
    }
)








module.exports = router