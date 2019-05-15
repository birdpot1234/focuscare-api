const knex = require('../../connect')
const moment = require('moment')

class middleware {
    async log(error,page) {
        
       // console.log('middleware');
       return knex('tbl_log').insert({ datetime:moment().format('YYYY-MM-DD HH:mm:ss'),error:error,page:page})
    }

}
module.exports = new middleware();