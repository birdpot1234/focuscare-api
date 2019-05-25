const { server_response } = require("../../service")
const knex = require('../../connect')
const screenModel = require('./model')
const momentRandom = require('moment-random');
const moment = require('moment');
const arrayformat = require('../middleware/other');
const screentime = () => async (req, res, next) => {
  //let {userId,uniqID,date_openScreen,time_openScreen,date_closeScreen,time_closeScreen} = req.body
  console.log(req.body)
  try {

    await screenModel.screentime_Insert(req.body)
    req.success = true
  } catch (error) {
    console.log(error)
  }
  next()
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
const showinternetusage = () => async (req, res, next) => {
  let { userId, uniqueID, date } = req.body
  let resoult
  try {

    resoult = await screenModel.showinternetusage(userId, uniqueID, date)
    //resoult = arrayformat.Row(resoult)
    // let a = await setformatenetwork(resoult)

    console.log(resoult)
    req.success = resoult
    req.shatus = 200
  } catch (error) {

    req.success = error
    req.shatus = 200
  }
  next();
}
const setformatenetwork = async (resoult) => {

  return resoult.map(el => el.MobileValue);
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}





module.exports = {
  screentime,
  bettery,
  network,
  showinternetusage
}