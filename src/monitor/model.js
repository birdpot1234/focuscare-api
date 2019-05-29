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
    async showscreentimeusage(uniqueid, date) {
        return knex.raw(`select date_openScreen as date,time_openScreen as time_start,TIME_TO_SEC(TIMEDIFF(time_closeScreen,time_openScreen)) as time_usage,'screen' as type from tbl_screentime 
        where  uniqueID='${uniqueid}' AND date_openScreen ='${date}'  GROUP BY date_openScreen,time_openScreen,TIME_TO_SEC(TIMEDIFF(time_closeScreen,time_openScreen)) 
        order by time_openScreen`)

    }
    async showbatteryusage(uniqueid, date) {
        return knex.raw(`select date_openCharge as date,time_openCharge as time_start,TIME_TO_SEC(TIMEDIFF(time_closeCharge,time_openCharge)) as time_usage,'battery' as type,beforeCharge,afterCharge from tbl_battery
        where uniqueID='${uniqueid}' AND date_openCharge ='${date}' GROUP BY  date_openCharge,time_openCharge,TIME_TO_SEC(TIMEDIFF(time_closeCharge,time_openCharge)),beforeCharge,afterCharge
        order by time_openCharge `)
    }
    async showmainscreen_all(uniqueid) {
        return knex.raw(`select sum(TIME_TO_SEC(TIMEDIFF(time_closeScreen,time_openScreen))) as summary_screen from tbl_screentime 
        where  uniqueID='${uniqueid}'`)
    }
    async shownetwork_all(uniqueid) {
        return knex.raw(`select sum(MobileValue) as summary_mobile from tbl_network 
        where  uniqueID='${uniqueid}'`)
    }
    async shownetwork_all_bydate(uniqueid, date) {
        return knex.raw(`select sum(MobileValue) as mobileValue, SUM(wifiValue) as wifiValue from tbl_network 
        where  uniqueID='${uniqueid}' AND date='${date}'`)
    }
    async showbattery_all(uniqueid) {
        return knex.raw(`select sum(TIME_TO_SEC(TIMEDIFF(time_closeCharge,time_openCharge))) as time, COUNT(battery_id) as count from tbl_battery
        where uniqueID='${uniqueid}'`)

    }


}

module.exports = new monitorModel();    