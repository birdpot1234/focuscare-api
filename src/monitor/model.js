const knex = require('../../connect')
const moment = require('moment')


class monitorModel {
    async screentime_Insert(data) {
        return knex(`tbl_screentime`).insert({ ...data });
    }
    async bettery_Insert(data) {
        return knex(`tbl_battery`).insert({ ...data });
    }
    async internetUsage(data) {
        return knex(`tbl_network`).insert({ ...data })
    }
    async showinternetusage(userId, uniqueid, date) {
        // return knex('tbl_network').where({ userId, uniqueid, date }).orderBy('date', 'asc')
        return knex.raw(`select SUM(MobileValue) as MobileValue,SUM(wifiValue) as wifiValue,TIME_FORMAT(time, "%H") AS time from tbl_network 
         where uniqueid = '${userId}' AND uniqueid ='${uniqueid}' AND date = '${date}'
         GROUP BY TIME_FORMAT(time, "%H")`)
    }

}

module.exports = new monitorModel();    