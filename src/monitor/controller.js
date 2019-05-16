const { server_response } = require("../../service")
const knex = require('../../connect')
const moment = require('moment')
const screenModel = require('./model')

const screentime = () => async (req, res, next) => {
  const { date_on, date_off, platform } = req.body;
  let obj = {
    userId: req.user_id,
    uniqueID: req.uniqueID,
    date_openScreen: converDate(date_on, 'YYYY-MM-DD', platform),
    time_openScreen: converDate(date_on, 'HH:mm:ss', platform),
    date_closeScreen: converDate(date_off, 'YYYY-MM-DD', platform),
    time_closeScreen: converDate(date_off, 'HH:mm:ss', platform),
  }

  try {
    await screenModel.screentime_Insert(obj)
    req.success = true;
    req.message = "ส่งข้อมูลการใช้งาน Screen Time สำเร็จ";
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, error })
  }
}

function converDate(d, format, platform) {
  if (platform === 'ios') {
    d.replace('0000', '');
    return moment(d, 'YYYY-MM-DD HH:mm:ss').add(7, 'h').format(format)
  } else {
    return moment(new Date(d)).format(format)
  }
}

const bettery = () => async (req, res, next) => {
  const { charge_on, charge_off, percentage } = req.body;
  let obj = {
    userId: req.user_id,
    uniqueID: req.uniqueID,
    date_openCharge: moment(new Date(charge_on)).format('YYYY-MM-DD'),
    time_openCharge: moment(new Date(charge_on)).format('HH:mm:ss'),
    date_closeCharge: moment(new Date(charge_off)).format('YYYY-MM-DD'),
    time_closeCharge: moment(new Date(charge_off)).format('HH:mm:ss'),
    batteryPercen: Math.floor(percentage)
  }

  try {
    await screenModel.bettery_Insert(obj)
    req.success = true;
    req.message = "ส่งข้อมูลการใช้งาน Battery สำเร็จ"
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, error })
  }
}


module.exports = {
  screentime,
  bettery
}