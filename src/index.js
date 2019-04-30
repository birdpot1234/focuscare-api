
const authRoute = require('./authen/routes')
const monitorRoute = require('./monitor/routes');

module.exports = (app) => {
    app.use('/api/authen', authRoute)
    app.use('/api/monitor', monitorRoute)
}