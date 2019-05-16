const knex = require('../../connect')
const moment = require('moment')


class monitorModel {
    async screentime_Insert(data) {
        return knex(`tbl_screentime`).insert({ ...data });
    }
    async bettery_Insert(data) {
        return knex(`tbl_battery`).insert({ ...data });
    }

}

module.exports = new monitorModel();