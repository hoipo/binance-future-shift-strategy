'use strict';

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: '163',
  auth: {
    user: 'bullbullgo@163.com',
    pass: 'NPGSOICGECORXLPH',
  }
});

const sendMail = (toAddress, subject, body) => {
  let mailOptions = {
    from: '"bullbullgo" <bullbullgo@163.com>', 
    to: toAddress,
    subject: subject,
    html: body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return
    }
    console.log('Message sent: %s', info.messageId);
  });
}

module.exports = sendMail;