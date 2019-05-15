const request = require('request')

exports.Noti = (message) => {
    var token = 'ICEoieeuGXBgOTslGSvRIxCu8bCKAJSrVfHR2f6dzMV';
    var message = message;
    new Promise((resolve, reject) => {
        setTimeout(() => {
         
          return resolve('a')
          
          // reject(req.success= false)
        }, 500);
         
        try {
            request({
                method: 'POST',
                uri: 'https://notify-api.line.me/api/notify',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                auth: {
                    'bearer': token
                },
                form: {
                    message: message
                }
            }
            );
        } catch (error) {
            console.log(error)
        }
          
      })
  

}
