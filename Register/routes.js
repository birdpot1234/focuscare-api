const express = require('express');
const router = express.Router();
const Regist = require('./Register');


router.get("/api/regis/test", (req, resp) => {
    Regist.model.regis_show((res_data) =>resp.json(res_data))
})

module.exports = router