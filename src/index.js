
const authRoute = require('./authen/routes')

module.exports = (app) => {
    app.use('/api/authen', authRoute)
}