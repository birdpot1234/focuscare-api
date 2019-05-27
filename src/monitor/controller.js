const screenModel = require('./model')
const moment = require('moment');
const arrayformat = require('../middleware/other');

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
const network = () => async (req, res, next) => {
  let data = {
    userId: req.body.userId,
    uniqueID: req.body.uniqueID,
    MobileValue: getRandomInt(10000),
    wifiValue: getRandomInt(100000),
    date: req.body.date,
    time: req.body.time,
  }

  try {
    await screenModel.internetUsage(data)
    req.success = true
  } catch (error) {
    console.log(error)
    req.success = false
  }
  next();
}

const showinternetusage = () => async (req, res, next) => {
  let { userId, uniqueID, date } = req.body
  let resoult
  try {

    resoult = await screenModel.showinternetusage(userId, uniqueID, date)
    req.success = resoult
    req.shatus = 200
  } catch (error) {

    req.success = error
    req.shatus = 200
  }
  next();
}


const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}
const showscreentimeusage = () => async (req, res, next) => {
  let { uniqueID, date } = req.body
  let result_screen, result_battery
  let arr = []
  try {
    result_screen = await screenModel.showscreentimeusage(uniqueID, date)
    result_battery = await screenModel.showbatteryusage(uniqueID, date)

    result_screen = arrayformat.Row(result_screen)
    result_battery = arrayformat.Row(result_battery)

    arr = [...result_screen, ...result_battery]

    console.log(arr)
    req.result = arr
    req.status = 200
  } catch (error) {
    req.result = []
    req.status = 401
  }
  next();
}

module.exports = {
  screentime,
  bettery,
  network,
  showinternetusage,
  showscreentimeusage,
}