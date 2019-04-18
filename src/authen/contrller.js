const express = require('express');
const router = express.Router();
const {server_response } = require("../../service")
const mysql = require('mysql')
const con   = require('../../connect_config')
  const knex  = require('../../connect')





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
}

}

module.exports = {
    contro: contro
}