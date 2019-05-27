const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3489;

const server = http.createServer(app);

server.listen(port, () => {
    console.log("Server is ready,PORT use " + port)
});

//test dev