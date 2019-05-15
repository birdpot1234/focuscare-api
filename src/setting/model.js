

const knex = require('../../connect')
const moment = require('moment')


class settingModel {
    async setup(data) {
       
        return knex(`tbl_setting`).insert({...data});

    }

}

module.exports = new settingModel();