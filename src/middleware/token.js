const jsonwebtoken = require('jsonwebtoken');
const response = require('../../server');
const constant = require('../constant')

exports.validate_token = () => {
    return (req, res, next) => {
        if (req.headers && req.headers.authorization) {
            jsonwebtoken.verify(req.headers.authorization, constant.sign, (error, decode) => {
                if (error) {
                    res.status(401).json(response(401));
                } else {
                    req.user_id = decode.user_id;
                    req.macaddress = decode.macaddress;
                    console.log(req.user_id, req.macaddress)
                    next();
                }
            })
        } else if (req.session.token) {
            jsonwebtoken.verify(req.session.token, constant.sign, (err, decode) => {
                if (err) {
                    res.status(401).json(response(401));
                } else {
                    req.user_id = decode.user_id;
                    req.macaddress = decode.macaddress;
                    next();
                }
            })
        } else {
            req.session.token = null;
            res.status(401).json(response(401));
        }
    }
}