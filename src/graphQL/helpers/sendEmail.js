const nodemailer = require("nodemailer");

exports.sendEmail = async (email, subject, html) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    secure: false,
    auth: {
      user: 'hello@teamcoursecamp.com',
      pass: process.env.gmailPassword
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  let mailOptions = {
    from: '"Course Camp" <hello@teamcoursecamp.com>',
    to: email,
    subject,
    html
  };
  
  return transporter.sendMail(mailOptions);
};