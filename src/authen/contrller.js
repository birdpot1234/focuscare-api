
const { server_response } = require("../../service")
const knex = require('../../connect')
const authenModel = require('./model')
const jsonwebtoken = require('jsonwebtoken');
const constant = require('../constant')
const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');
const sendmail = require('../middleware/sendmail')
//const crypto = require("crypto-js");
const crypto = require('../middleware/cryto')
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


const decrypted = async (password, password_Indb, req, res) => {
  let resoult = null
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(resoult)
    }, 500);
    bcrypt.compare(password, password_Indb, (err, isMatch) => {
      if (err) {
        console.log(err)
        res.status(400).json(server_response(400))
      } else if (isMatch === true) {
        resoult = true;

      } else {

        resoult = false;

      }
    });
  })
}

const encrypted = async (password, res) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("")
    }, 500);
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
       // res.status(400).json(server_response(400))
       console.log(err)
      } else {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
           // res.status(400).json(server_response(400))
           console.log(err)
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
// const decry_mail = () => async (req, res, next) => {
  
//   //var cipher = ''crypto.AES.encrypt('U2FsdGVkX18uueS7XkZgeOdaTRsgPW87RvUHraO7EnJbdK8K15K2bLLMyEnRw7ewtK9UfRoQBc1ZitPvsgvIaw==','1234')
//   var cipher = 'U2FsdGVkX18uueS7XkZgeOdaTRsgPW87RvUHraO7EnJbdK8K15K2bLLMyEnRw7ewtK9UfRoQBc1ZitPvsgvIaw=='
//   var decry = crypto.AES.decrypt(cipher.toString(),'1234')
//   var plaintext = decry.toString(crypto.enc.Utf8);
//   console.log('cipher',cipher.toString())
//   console.log('decry',plaintext)
//   req.message = 'eee'
//   req.success = true
//   next()
// }


/*####################### CONTROLLER #######################*/
const register = () => async (req, res, next) => {

try {
  
    

  let checkUser = await authenModel.checkUsername(req.body.username)
  console.log(checkUser[0].length)
  //console.log(checkUser)
  if (checkUser[0].length != 0) {
    req.success = false;
    req.message = "username นี้ถูกใช้ไปแล้ว";
    next();
  }
  else {
    await encrypted(req.body.password);
    await authenModel.registerDplus(req.body, pass_encrypted);
    // send(req.body.username,'',1);
    sendmail.sendmail(req.body.username,pass_encrypted,1)
    req.success = true;
    req.message = "ลงทะเบียนสำเร็จ";
    next();
  }
} catch (error) {
    console.log(error)
    res.status(400).json(server_response(400))
}

}

const login = () => async (req, res, next) => {
  let { typeRegis, username, password, macaddress, tokennoti } = req.body;
  

  let duplicate = await authenModel.checkDuplicateUser({ typeRegis, username });

  let objToken = {};

  if (+typeRegis === 0) { // ######################### FOCUS #########################
    console.log('typeRegis:', typeRegis)
    //check user typeRegis 99
    let responUser = await authenModel.checkUsername(username);
    let data = responUser[0]//เช็ค  user ว่ามีในระบบหรือไม่
    console.log(data.length)
    if(data.length >0){
    
     try {
     
        let objPassword = await authenModel.getPassword(typeRegis, username);//get password โดย where username
        console.log(objPassword[0])
        let decyp = await decrypted(password, objPassword[0].password);//เทียบ  pass ที่กรอก กับ 
      
        if (decyp) {
           if (data[0].typeRegis == 0) {//#######typeRegis = 0 User is active true##########
            try {
              // let objPassword = await authenModel.getPassword(typeRegis, username);
              // let decyp = await decrypted(password, objPassword[0].password);
              // console.log(decyp)
              // if (decyp) {
                req.success = true;
                req.message = "เข้าสู่ระบบสำเร็จ";
                objToken = { user_id: objPassword[0].user_id, macaddress } // เอาไว้ Generate Token
                req.user_id = objPassword[0].user_id;
                console.log('login success')
              // }
              // else {
              //   console.log('password Incorect')
              //   req.success = false;
              //   req.message = "passwor Incorect";
              // }
            } catch (error) {
              console.log(error)
              res.status(400).json(server_response(400))
            }
          }
          else {
            req.success = false;
            req.message = {activate:true,message:"Username ยังไม่ได้ทำการ Activate mail"}
           
          }
        }
        else {
          console.log('password Incorect')
          req.success = false;
          req.message = "passwor Incorect";
        }
      } catch (error) {
        console.log(error)
        res.status(400).json(server_response(400))
      }


    }
    else {
      console.log('false ไม่พบ user')
      req.success = false;
      req.message = "ไม่พบ user นี้ในระบบ";
    } 

  } else if (+typeRegis === 1) { // ######################### FACEBOOK #########################
    try {
      if (duplicate.length > 0) { // have username
        // update tbl_deviceinfo => change user_id 
        let { user_id } = duplicate[0];
        await authenModel.updateFacebook({ ...req.body.facebook, userId: user_id })
        objToken = { user_id, macaddress } // เอาไว้ Generate Token
        req.success = true;
        req.user_id = user_id;
        req.message = "เข้าสู่ระบบสำเร็จ";
      } else {
        let result = await authenModel.insertUser({ ...req.body, tokennoti }) // return facebook id
        objToken = { user_id: result, macaddress } // เอาไว้ Generate Token
        await authenModel.insertFacebook({ ...req.body.facebook, userId: result })
        req.success = true;
        req.user_id = result;
        req.message = "เข้าสู่ระบบสำเร็จ";
      }
    } catch (error) {
      console.log(error)
      res.status(400).json(server_response(400))
    }
  }

  // generate token
  if (req.success) {
    req.token = jsonwebtoken.sign(objToken, constant.sign, { expiresIn: '8h' });
    req.session.token = req.token;
  }
  next();
}

const updateToken = () => async (req, res, next) => {
  if (req.success) {
    let { tokennoti } = req.body
    let { token, user_id } = req;
    try {
      await authenModel.updateToken({ token, tokennoti, user_id });
      next();
    } catch (error) {
      console.log(error)
      res.status(400).json(server_response(400))
    }
  } else {
    next();
  }
}

const verify = () => async (req, res, next) => {

  let decry_email = crypto.decryto(req.originalUrl.slice(req.originalUrl.indexOf("?") + 1))
  req.decry = decry_email

  next()

}
const verifyForgetpass = () => async (req, res, next) => {
  let decry_email = crypto.decryto(req.originalUrl.slice(req.originalUrl.indexOf("?")+1))
  req.decry = decry_email
 
  next()

}
const checkTokenverify= () => async (req, res, next) => {
  let respon=await authenModel.checkTokenverify(req.body.username,req.body.token)
  console.log(respon.length)
  if(respon.length==0)
  {
    req.success = false;
    req.message = 'ไม่พบข้อมูล'
  }
  else{
    req.success = true;
    req.message = 'success forget'
  }
  next()

}


const activeUser = () =>async(req,res,next) =>{
  try {
    
    let respon = await authenModel.verify(req.body.username)

    req.success = true;
    req.message = respon==500?'user นี้ ถูก active ไปแล้ว':'success active';
    req.active  = respon==500?true:false;
    console.log(req.success)

  } catch (error) {
    req.success = false;
    req.message = error;
   
  }
  next()
    
}

const forGetpassword = () => async(req,res,next)=>{
  //check user //
   let respon = await authenModel.checkUsername(req.body.username)
   if(respon[0].length>0)
   {
      await encrypted('pass_encrypted');
      console.log(pass_encrypted);
      await authenModel.tokenVerify(req.body.username,pass_encrypted);
      sendmail.sendmail(req.body.username,pass_encrypted,0)
     // send(req.body.username,pass_encrypted,0);

      req.success = true;
      req.message = 'Success forGetpass';
   }
   else
   {
    req.success = false;
    req.message = 'ไม่พบ email ในระบบ';
   }
   next()


}
const setNewpassword = () => async(req,res,next)=> {
  console.log('setpass')
      await encrypted(req.body.password);
      try {
        await authenModel.setNewpassword(req.body.username,pass_encrypted)
        await authenModel.delToken(req.body.username)
        req.success = true
        req.message = 'รีเซ็ตรหัสผ่านสำเร็จ'
      } catch (error) {
        req.success = false
        req.message = 'ทำรายการไม่สำเร็จ'
      }
      next();
      
}



module.exports = {
  contro: contro,
  login,
  register,
  updateToken,
  verify,
  activeUser,
  forGetpassword,
  verifyForgetpass,
  checkTokenverify,
  setNewpassword
  

}