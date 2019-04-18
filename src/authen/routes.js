const express = require('express');
const router = express.Router();
const Regist = require('./contrller');


router.get("/api/regis/test", (req, resp) => {
    Regist.contro.regis_show((res_data) =>resp.json(res_data))
})

module.exports = router