const express = require('express');
const router = express.Router();
const {server_response } = require("../service")

const model = {
regis_show(callback) {
 
    callback(server_response(200, "Success",{} ))
}
}

module.exports = {
    model: model
}