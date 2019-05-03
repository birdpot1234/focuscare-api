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
            createRegisdate: moment().format('YYYY-MM-DD HH:mm:ss'),
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
    async registerDplus(data, password) {

        let date = moment().format("YYYY-MM-DD");
        let datetime = moment().local('th').format("YYYY-MM-DD HH:mm:ss");
        let user_id = moment().unix();
        let varluetb = {
            user_id: user_id,
            ...data,
            password: password,
            birthDay: date,
            createRegisdate: datetime,
            roleLevel: 0,
            typeRegis: 99
        }

        console.log(varluetb)

        return knex('tbl_user').insert(varluetb)

    }
    async getPassword(typeRegis, username) {
        return knex('tbl_user').where({ typeRegis, username });
    }

    async updateToken({ token, tokennoti, user_id }) {
        let obj = {
            tokenLogin: token,
            tokenNoti: tokennoti,
            createTokennoti: moment().format('YYYY-MM-DD HH:mm:ss'),
            createTokenlogin: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        return knex('tbl_user').update(obj).where({ user_id });
    }


}

module.exports = new authenModel();