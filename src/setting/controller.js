const { server_response } = require("../../service")
const knex = require('../../connect')
const  settingModel = require('./model')

const defaultsetting  = () => async(req,res,next) => {
    //let {userId,uniqID,date_openScreen,time_openScreen,date_closeScreen,time_closeScreen} = req.body
      console.log(req.body)
      try {

        await settingModel.setup(req.body)
        req.success = true
      } catch (error) {
          console.log(error)
          req.success = false
          req.message = error
          req.status = 500
      }  
      next()
}


module.exports ={
  defaultsetting  
}