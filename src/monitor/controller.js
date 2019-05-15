const { server_response } = require("../../service")
const knex = require('../../connect')
const  screenModel = require('./model')

const screentime  = () => async(req,res,next) => {
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
const bettery  = () => async(req,res,next) => {
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


module.exports ={
    screentime,  
    bettery
}