const knex = require('../../connect');

class deviceModel {
    async checkDuplication({ userId, uniqueID }) {
        return knex('tbl_deviceInfo').where({ userId, uniqueID }).first();
    }

    async insert(obj) {
        return knex('tbl_deviceInfo').insert(obj);
    }

    async update(obj) {
        let { userId, uniqueID, ...object } = obj;
        return knex('tbl_deviceInfo').update(object).where({ userId, uniqueID });
    }
}

module.exports = new deviceModel();