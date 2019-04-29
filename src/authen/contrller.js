const express = require('express');
const router = express.Router();
const {server_response } = require("../../service")
const mysql = require('mysql')
const con   = require('../../connect_config')
const moment = require('moment')
const knex  = require('../../connect')
const model = require('./model');





const contro = {
regis_show(callback) {

    
        knex.from('knex_migrations').select("*")
            .then((rows) => {
                for (row of rows) {
                    console.log(`${row['id']} ${row['name']}`);
                }
            }).catch((err) => { console.log(err); throw err })
            .finally(() => {
              //  knex.destroy();
            });



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

}

module.exports = {
    contro: contro
}