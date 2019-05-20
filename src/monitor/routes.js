const express = require('express');
const { validate_token } = require('../middleware/token');
const moment = require('moment')
const router = express.Router();
const monitor = require('./controller')


router.post("/save_screen",
    validate_token(),
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

module.exports = router;