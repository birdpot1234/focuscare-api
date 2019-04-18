

var config = require('./connect_config');
var knex = require('knex')(config.dbConnectData_focusCare);

console.log('connect')
/**
 * ฟังก์ชั่นเรียก Migrate Knex
 */
// async function migrate() {
//     try {
//         await knex.migrate.latest([config]);
//         debug('!!! knex success !!!')
//     } catch (error) {
//         err('xxx knex fail xxx', error.message)
//     }
// }
// debug('!!! knex !!!')
// migrate();
module.exports = knex;