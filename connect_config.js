const dbConnectDplusSystem = {
    user: 'webproduction',
    password: 'dplusProduction',
    server: '192.168.3.21', // You can use 'localhost\\instance' to connect to named instance
    database: 'Data_DplusSystem',
    requestTimeout: 300000,
    pool: {
        idleTimeoutMillis: 300000,
        max: 100
    },
    options: {
        encrypt: true, // Use this if you're on Windows Azure
    }
}
const dbConnectData_focusCare = {
    client: 'mysql',
    connection: {
        user: 'mobileapp',
        password: 'Mobile_1234',
        host: '3.1.148.52', // You can use 'localhost\\instance' to connect to named instance
        database: 'focusCare_dev'
    }
}

module.exports = {
    dbConnectData_focusCare: dbConnectData_focusCare,
};