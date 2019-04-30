
const { server_response } = require("../../service")
const knex = require('../../connect')
const authenModel = require('./model')
const jsonwebtoken = require('jsonwebtoken');
const constant = require('../constant')
const bcrypt = require('bcryptjs');
let pass_encrypted = null;

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

const checkUser =() =>async(req,res,next ) =>{
  let {typeRegis,username} = req.body;
  let password = 'AA22';
  let objPassword = await authenModel.getPassword(typeRegis, username);
  let decyp = await decrypted(password,objPassword[0].password);
  console.log(decyp)
  next()



}

const decrypted = async(password,password_Indb,req,res)=>{
  let resoult = null
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(resoult)
    }, 500);
    bcrypt.compare(password, password_Indb,(err, isMatch)=>{
      if(err){
        console.log(err)
        res.status(400).json(server_response(400))
      }else if(isMatch===true){
        resoult = true;
  
      }else{
  
        resoult = false;
        
      }
  });
  })

}

const encrypted = async(password,res)=>{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("")
    }, 500);
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        res.status(400).json(server_response(400))
      } else {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            res.status(400).json(server_response(400))
          } else {
            password = hash;
            pass_encrypted = password
          }
        }
        )
      }
    })
  })

}
const register = () => async (req, res, next) => {


  try {
    await encrypted(req.body.password);
  
    await authenModel.registerDplus(req.body, pass_encrypted);
    req.success = true;
    req.message = "ลงทะเบียนสำเร็จ";

    next();
  } catch (error) {
    console.log(error)
    res.status(400).json(server_response(400))
  }


}
const login = () => async (req, res, next) => {
  let { typeRegis, username,password, macaddress = "02:00:00:00:00:00" } = req.body;
  
  let duplicate = await authenModel.checkDuplicateUser({ typeRegis, username });
  let objToken = {};
 
  if (+typeRegis === 0) { // focus
    console.log('typeRegis:',typeRegis)
    try {
      let objPassword = await authenModel.getPassword(typeRegis, username);
      let decyp = await decrypted(password,objPassword[0].password);
      console.log(decyp)
      if(decyp)
      {
        req.success = true;
        req.message = "เข้าสู่ระบบสำเร็จ";
      }
      else{
        console.log('password Incorect')
         req.success = false;
         req.message = "passwor Incorect";
        
   
      }
    } catch (error) {
      console.log(error)
      req.success = false
      res.status(400).json(server_response(400))
    }
   
   
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
      req.success = false
      res.status(400).json(server_response(400))
    }
  }

  // generate token
  if (req.success ) {
    req.token = jsonwebtoken.sign(objToken, constant.sign, { expiresIn: '8h' });
    req.session.token = req.token;
  
  }
  next();

}

module.exports = {
  contro: contro,
  login,
  register,
  checkUser
}