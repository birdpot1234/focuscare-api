const { server_response } = require("../../service")
const knex = require('../../connect')
const screenModel = require('./model')
const momentRandom = require('moment-random');
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
const bettery = () => async (req, res, next) => {
  //let {userId,uniqID,date_openScreen,time_openScreen,date_closeScreen,time_closeScreen} = req.body
  console.log(req.body)
  try {

    await screenModel.bettery_Insert(req.body)
    req.success = true
  } catch (error) {
    console.log(error)
  }
  next()
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
