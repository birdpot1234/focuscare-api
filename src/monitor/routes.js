const express = require('express');
const { validate_token } = require('../middleware/token');
const router = express.Router();

router.post("/save_screen",
    validate_token(),
    (req, res) => {
        console.log(req.body)
        res.status(200).json({ success: true })
    })

module.exports = router;