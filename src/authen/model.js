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
        console.log(data)
        await knex('tbl_user').insert({ ...data });
        return data.user_id
    }

    async insertFacebook(data) {
        console.log(data)
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
       // return knex('tbl_user').where({ typeRegis, username });
          return knex('tbl_user').where(function(){this.where('typeRegis',0).orWhere('typeRegis',99)}).andWhere({username})
        //return knex.raw(`select * from tbl_user where (typeRegis =0 OR typeRegis =99) AND (username = '${username}')`)
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
    async checkUsername(username) {
        // return knex('tbl_user').where(function(){this.where('typeRegis',0).orWhere('typeRegis',99).andWhere({username})})
        return knex.raw(`select user_id,typeRegis from tbl_user where (typeRegis =0 or typeRegis =99) AND (username='${username}')`)
    }
    async verify(username) {
        console.log(username)
        let respon = await knex.raw(`select * from tbl_user where username= '${username}' AND typeRegis =0`)
        if (respon) {
            console.log(respon)
            return knex.raw(`update tbl_user set active =1,typeRegis =0 where username = '${username}'`)

        }
        else {
            return 500
        }

    }


    async tokenVerify(username, tokenVerify) {
        let respon = await knex('tb_verify').where({ username });
        if (respon.length == 0) {
            return knex('tb_verify').insert({ username, tokenVerify });
        }
        else {
            return knex.raw(`update tb_verify set tokenVerify = '${tokenVerify}' where username = '${username}'`)
        }
    }

    async checkTokenverify(username, tokenVerify) {
        return knex('tb_verify').where({ username, tokenVerify });
    }

    async setNewpassword(username, password) {
        return knex.raw(`update tbl_user  set password = '${password}' where username = '${username}' AND typeRegis = 0 `)
    }
    async delToken(username) {
        console.log(username);
        return knex.raw(`DELETE FROM tb_verify WHERE username = '${username}' `)
    }


}

module.exports = new authenModel();