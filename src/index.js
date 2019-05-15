
const authRoute = require('./authen/routes')
const monitorRoute = require('./monitor/routes');
// const settingRoute = require('./setting/routes');
const settingRoute = require('./setting/routes');

module.exports = (app) => {
    app.use('/api/authen', authRoute)
    app.use('/api/monitor', monitorRoute)
    app.use('/api/setting', settingRoute)
}