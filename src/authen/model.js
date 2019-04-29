const knex = require('../../connect')
const moment = require('moment')

class authenModel {

    async checkDuplicateUser({ typeRegis, username }) {
        return knex('tbl_user').where({ typeRegis, username });
    }

    async insertUser(data) {
        delete data.facebook
        let birthDay = data.birthDay
        data = {
            user_id: moment().unix(),
            ...data,
            birthDay: moment.utc(new Date(birthDay)).add(7, 'h').format('YYYY-MM-DD'),
            createRegisdate: moment().format('YYYY-MM-DD HH:mm:ss')
        }

        await knex('tbl_user').insert({ ...data });
        return data.user_id
    }

    async insertFacebook(data) {
        return knex('tbl_facebook').insert({ ...data, expDate: moment(data.expDate).format('YYYY-MM-DD HH:mm:ss') })
    }

    async updateFacebook(data) {
        return knex('tbl_facebook').update({
            ...data,
            expDate: moment(data.expDate).format('YYYY-MM-DD HH:mm:ss')
        }).where({ userId: data.userId })
    }
}

module.exports = new authenModel();