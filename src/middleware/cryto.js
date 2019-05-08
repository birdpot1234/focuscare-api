const crypto = require("crypto-js");
const key = '57c0e20cedc8ddd451a8fe2400bbdc096e0dbd708ab79780f06a077ded36a073'

exports.encryto = (text) => { 
var cipher = crypto.AES.encrypt(text,key)
return cipher.toString()
},
exports.decryto = (text) => {
  var decry = crypto.AES.decrypt(text.toString(),key)
  var plaintext = decry.toString(crypto.enc.Utf8);
 return plaintext
}