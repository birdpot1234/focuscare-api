
const { server_response } = require("../../service")
const knex = require('../../connect')
const authenModel = require('./model')

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

const login = () => async (req, res, next) => {
  let { typeRegis, username } = req.body;
  if (+typeRegis === 0) { // focus

  } else if (+typeRegis === 1) { // ######################### FACEBOOK #########################
    console.log(`login with facebook`)
    try {
      let duplicate = await authenModel.checkDuplicateUser({ typeRegis, username });

      if (duplicate.length > 0) {
        // have username
        // update tbl_deviceinfo => change user_id + update tbl_facebook [token]
        let { user_id } = duplicate[0];
        await authenModel.updateFacebook({ ...req.body.facebook, userId: user_id })
        req.success = true;
        req.message = "เข้าสู่ระบบสำเร็จ";
      } else {
        let result = await authenModel.insertUser({ ...req.body }) // return facebook id
        await authenModel.insertFacebook({ ...req.body.facebook, userId: result })
        req.success = true;
        req.message = "เข้าสู่ระบบสำเร็จ";
      }
      next();
    } catch (error) {
      console.log(error)
      res.status(400).json(server_response(400))
    }
  }

    callback(server_response(200, "Success",{} ))
},
register(body,callback) {
console.log(body)

let date = moment().format("YYYY-MM-DD");
let datetime = moment().format("YYYY-MM-DD h:mm:ss");
let user_id = moment().unix();
  var varluetb = [
   
  {user_id:user_id,
  username:'testRegis01',
  password:'1111',
  firstname:'peerapon',
  lastname:'pothai',
  birthDay:date,
  sex:0,
  createRegisdate:datetime,
  roleLevel:0,
  typeRegis:99}
]


//2019-04-29 09:49:36


  //  knex('tbl_user').insert(varluetb)
    
// .then((rows) => {
//           for (row of rows) {
//               console.log('success insert');
//               console.log(row)
//            }
//        }).catch((err) => { console.log(err); throw err })
//        .finally(() => {
//          //  knex.destroy();
//          //console.log('error')
//        });



callback(server_response(200, "Success",{} ))
}

module.exports = {
  contro: contro,
  login
}