const express = require('express');
const { validate_token } = require('../middleware/token');
const moment = require('moment')
const router = express.Router();
const monitor = require('./controller')


router.post("/save_screen",
    // validate_token(),
    (req, res) => {
        console.log('call api save screen')
        // let { date_on, date_off, platform } = req.body;
        // console.log("PLATFORM ::: ", platform)
        // console.log('date_on', moment(new Date(date_on)).format('DD-MM-YYYY HH:mm:ss'))
        // console.log('date_off', moment(new Date(date_off)).format('DD-MM-YYYY HH:mm:ss'))
        // console.log('user_id', req.user_id);
        // console.log('mac_address', req.uniqueId);
        res.status(200).json({ success: true })
    })

router.post('/screentime',
    validate_token(),
    monitor.screentime(),
    (req, res) => {
        res.status(200).json({ success: req.success, message: req.message })
    })



router.post('/battery',
    validate_token(),
    monitor.bettery(),
    (req, res) => {
        res.status(200).json({ success: true, message: req.message });
    }
)

router.post('/insert/internet',
    monitor.network(),
    (req, res) => {
        res.status(req.status).json({ success: req.success });
    }
)
router.post('/insert/showusage',
    monitor.showinternetusage(),
    (req, res) => {
        res.status(200).json({ success: req.success });
    }
)
router.post('/main/screentimeusage',
    monitor.showscreentimeusage(),
    (req, res) => {
        res.status(200).json({ result: req.result, success: req.success, network: req.network });
    }
)
router.post('/main/screentimeusage_all',
    monitor.showmainscreen_all(),
    (req, res) => {
        res.status(200).json({ result: req.result, success: req.success });
    }
)
router.post('/main/testshowallnetwork',
    monitor.testshowallnetwork(),
    (req, res) => {
        res.status(200).json({ result: req.result, success: req.success });
    }
)
module.exports = router;