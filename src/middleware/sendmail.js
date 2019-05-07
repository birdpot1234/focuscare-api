
const nodemailer = require('nodemailer');
const constant = require('../constant')
exports.sendmail = (email,token,status) => {
    var smtpTransport = nodemailer.createTransport({

        service: "gmail",
        auth: {
          user: "Focus@dplusonline.net",
          pass: "Focu1234"
        }
      });
   
      
         let hostwifi,sendto,link_regis,link_forGetpass,subject_regis,subject_forGetpass,detailHtml_regis,detailHtml_forGetpass
          
          hostwifi = '192.168.1.119:3499'
          
          sendto = email;
          link_regis = "http://" + hostwifi + "/api/authen/verify?email=" + sendto;
          link_forGetpass = "http://" + hostwifi + "/api/authen/verifyForgetpass?email=" + sendto+"&token="+token;
          subject_regis = 'Please confirm your Email account'
          subject_forGetpass  = 'Please confirm your Email  for Reset password';
          detailHtml_regis =  "Hello ,<br> Please Click on the link to verify your email..<br><a href=" + link_regis+ ">Click here to verify</a>"
          detailHtml_forGetpass =  "Hello ,<br> Please Click on the link to reset password<br><a href=" + link_forGetpass+ ">Click here to reset password</a>"
          
          link = (status==1?link_regis:link_forGetpass)
          subject = (status==1?subject_regis:subject_forGetpass)
          detailHtml = (status==1?detailHtml_regis:detailHtml_forGetpass)
        
          
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
