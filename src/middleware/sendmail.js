
const nodemailer = require('nodemailer');
const constant = require('../constant')
const crypto = require('../middleware/cryto')
exports.sendmail = (email,token,status) => {
    var smtpTransport = nodemailer.createTransport({

        service: "gmail",
        auth: {
          user: "Focus@dplusonline.net",
          pass: "Focu1234"
        }
      });
   
      
         let hostwifi,sendto,link_regis,link_forGetpass,subject_regis,subject_forGetpass,detailHtml_regis,detailHtml_forGetpass,encry
          
          hostwifi = '13.229.199.200:3499/'
          
          sendto = email;

          encry =  crypto.encryto("email=" + sendto)
          encry_forGetpass = crypto.encryto("email=" + sendto+"&token="+token)
          link_regis = "http://" + hostwifi +"api/authen/verify?"+ encry;
         
          //link_forGetpass = "http://" + hostwifi + "/api/authen/verifyForgetpass?email=" + sendto+"&token="+token;
          link_forGetpass = "http://" + hostwifi+"api/authen/verifyForgetpass?"+encry_forGetpass
          subject_regis = 'Please confirm your Email account'
          subject_forGetpass  = 'Please confirm your Email  for Reset password';
          detailHtml_regis =  "Hello ,<br> Please Click on the link to verify your email..<br><a href=" + link_regis+ ">Click here to verify</a>"
          detailHtml_forGetpass =  "Hello ,<br> Please Click on the link to reset password<br><a href=" + link_forGetpass+ ">Click here to reset password</a>"
          
          link = (status==1?link_regis:link_forGetpass)
          subject = (status==1?subject_regis:subject_forGetpass)
          detailHtml = (status==1?detailHtml_regis:detailHtml_forGetpass)
        
          console.log(link)
          mailOptions = {
            to: sendto,
            subject: subject,//"Please confirm your Email account",
            html: detailHtml//"Hello ,<br> Please Click on the link to verify your email..<br><a href=" + link+ ">Click here to verify</a>"
        
          }
        
          smtpTransport.sendMail(mailOptions, (error, response) => {
            if (error) {
              console.log('send',error)
             
            }
            else {
              console.log('send',true)
              
            }
            
          })
      
}
