
const { server_response } = require("../../service")
const knex = require('../../connect')
const authenModel = require('./model')
const jsonwebtoken = require('jsonwebtoken');
const constant = require('../constant')
const contro = {
  regis_show(callback) {
    knex.from('tbl_user').select("*")
      .then((rows) => {
        console.log(rows)
        // for (let row of rows) {
        //   console.log(`${row['id']} ${row['name']}`);
        // }
      }).catch((err) => { console.log(err); throw err })
      .finally(() => {
        //  knex.destroy();
      });
    callback(server_response(200, "Success", {}))
  }


}
const register = () => async (req, res, next) => {
  let data = req.body;
  
  try {
    
    await authenModel.registerDplus(req.body);
    req.success = true;
    req.message = "เข้าสู่ระบบสำเร็จ";
 
    next();
  } catch (error) {
    console.log(error)
    res.status(400).json(server_response(400))
  }

  
}
const login = () => async (req, res, next) => {
  let { typeRegis, username, macaddress = "02:00:00:00:00:00" } = req.body;
  let duplicate = await authenModel.checkDuplicateUser({ typeRegis, username });
  let objToken = {};
  if (+typeRegis === 0) { // focus

  } else if (+typeRegis === 1) { // ######################### FACEBOOK #########################
    try {
      if (duplicate.length > 0) { // have username
        
        // update tbl_deviceinfo => change user_id 
        let { user_id } = duplicate[0];
        await authenModel.updateFacebook({ ...req.body.facebook, userId: user_id })
        objToken = { user_id, macaddress } // เอาไว้ Generate Token
        req.success = true;
        req.message = "เข้าสู่ระบบสำเร็จ";
      } else {
        let result = await authenModel.insertUser({ ...req.body }) // return facebook id
        objToken = { user_id: result, macaddress } // เอาไว้ Generate Token
        await authenModel.insertFacebook({ ...req.body.facebook, userId: result })
        req.success = true;
        req.message = "เข้าสู่ระบบสำเร็จ";
      }
    } catch (error) {
      console.log(error)
      res.status(400).json(server_response(400))
    }
  }

  // generate token
  req.token = jsonwebtoken.sign(objToken, constant.sign, { expiresIn: '8h' });
  req.session.token = req.token;
  next();
}

module.exports = {
  contro: contro,
  login,
  register
}