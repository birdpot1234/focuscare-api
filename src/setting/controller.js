const { server_response } = require("../../service")
const knex = require('../../connect')
const settingModel = require('./model')

const defaultsetting = () => async (req, res, next) => {
  try {
    let { user_id, uniqueID } = req;
    let res = await settingModel.findSetting(user_id, uniqueID);
    if (res) {
      await settingModel.update(req.body, user_id, uniqueID)
      req.message = "แก้ไขการตั้งค่า"
    } else {
      await settingModel.setup({ ...req.body, userId: user_id, uniqueID })
      req.message = "เพิ่มการตั้งค่าสำเร็จ"
    }

    req.success = true;
    req.status = 200;
    next()
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false })
  }
}

const checkSetting = () => async (req, res, next) => {
  try {
    let { user_id, uniqueID } = req;
    let res = await settingModel.findSetting(user_id, uniqueID);
    req.success = true;
    req.result = { have: !!res };
    req.message = "ดึงข้อมูลสำเร็จ";
    console.log(req.result)
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false })
  }
}

const getSetting = () => async (req, res, next) => {
  try {
    let { user_id, uniqueID } = req;
    let res = await settingModel.findSetting(user_id, uniqueID);
    req.success = true;
    req.result = res;
    req.message = "ดึงข้อมูลสำเร็จ"
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false })
  }
}

module.exports = {
  defaultsetting,
  checkSetting,
  getSetting
}