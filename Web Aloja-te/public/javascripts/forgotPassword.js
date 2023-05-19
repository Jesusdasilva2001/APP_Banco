const nodemailer = require('nodemailer');

// Configurar as credenciais de envio de e-mails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port:8081,
  auth: {
    email: 'seu_email@gmail.com',        // E-mail de envio
    pass: 'sua_senha',                 // Senha do e-mail de envio
  },
});

module.exports = transporter;