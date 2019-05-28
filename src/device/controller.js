const deviceModel = require('./model');
const moment = require('moment');
const insertDeviceInfo = () => async (req, res, next) => {
    try {
        let { user_id, uniqueID } = req;
        let { device_name, device_id, platform, version, tokennoti } = req.body;
        let checkDuplication = await deviceModel.checkDuplication({ userId: user_id, uniqueID });
        if (checkDuplication) { // มีข้อมูล
            let obj = {
                uniqueID,
                userId: user_id,
                tokenLogin: req.session.token,
                tokenNoti: tokennoti,
                createTokennoti: moment().format('YYYY-MM-DD HH:mm:ss'),
                createTokenlogin: moment().format('YYYY-MM-DD HH:mm:ss'),
            }
            await deviceModel.update(obj)
        } else { // ไม่มีข้อมูล
            let obj = {
                uniqueID,
                userId: user_id,
                deviceName: device_name,
                deviceID: device_id,
                platform,
                version,
                tokenLogin: req.session.token,
                tokenNoti: tokennoti,
                createTokennoti: moment().format('YYYY-MM-DD HH:mm:ss'),
                createTokenlogin: moment().format('YYYY-MM-DD HH:mm:ss'),
            }
            await deviceModel.insert(obj)
        }
        req.success = true;
        req.message = "ทำงานสำเร็จ"
        next();
    } catch (error) {
        res.status(401).json({ success: false })
        console.log(error)
    }
}

module.exports = {
    insertDeviceInfo
}