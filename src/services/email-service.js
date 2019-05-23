const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_APIKEY)

const msg = {
  to: '',
  from: 'no-reply@booking-event.com',
  subject: '',
  text: '',
  html: ''
}

const sendEmail = function ({ to, subject, text, html }) {
  msg.to = to
  msg.subject = subject
  msg.text = text
  msg.html = html
  return sgMail.send(msg)
}

module.exports = { sendEmail }
