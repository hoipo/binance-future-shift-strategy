'use strict';

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: '163', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
  auth: {
    user: 'bullbullgo@163.com',
    pass: 'NPGSOICGECORXLPH',
    // user: '578344975@qq.com',
    // // 这里密码不是qq密码，是你设置的smtp授权码
    // pass: 'imlvduqhdqlhbeaj',
  }
});

const sendMail = (toAddress, subject, body) => {
  let mailOptions = {
    from: '"bullbullgo" <bullbullgo@163.com>', // sender address
    to: toAddress, // list of receivers
    subject: subject, // Subject line
    // 发送text或者html格式
    // text: 'Hello world?', // plain text body
    html: body // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return
    }
    console.log('Message sent: %s', info.messageId);
    // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@163.com>
  });
}

module.exports = sendMail;