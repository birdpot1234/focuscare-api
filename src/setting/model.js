

const knex = require('../../connect')
const moment = require('moment')


class settingModel {
    async setup(data) {
        return knex(`tbl_setting`).insert({ ...data });
    }

    async findSetting(user_id, uniqueID) {
        return knex('tbl_setting').where({ userId: user_id, uniqueID }).first();
    }

    async update(data, user_id, uniqueID) {
        return knex('tbl_setting').update(data).where({ userId: user_id, uniqueID });
    }

    async getSetting(user_id, uniqueID) {
        return knex('tbl_setting').where({ userId: user_id, uniqueID }).first();
    }
}

module.exports = new settingModel();