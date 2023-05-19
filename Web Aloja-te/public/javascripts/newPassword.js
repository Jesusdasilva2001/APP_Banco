// Lógica de recuperação de senha
app.post('/recuperar-senha', (req, res) => {
    const { email } = req.body;
  
    // Gerar um token ou código de verificação
    const token = gerarTokenOuCodigoVerificacao();
  
    // Enviar e-mail de recuperação de senha
    const mailOptions = {
      from: 'seu_email@gmail.com', // E-mail de envio
      to: email, // E-mail do destinatário (usuário que solicitou a recuperação de senha)
      subject: 'Recuperação de Senha',
      html: `Olá,<br><br>Você solicitou a recuperação de senha.<br>Seu token de recuperação é: <b>${token}</b>.<br>Por favor, utilize este token para redefinir sua senha.<br><br>`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).send('Ocorreu um erro ao enviar o e-mail de recuperação de senha.');
      } else {
        // Armazenar o token ou código de verificação no banco de dados associado ao usuário
        armazenarTokenOuCodigoVerificacaoNoBancoDeDados(email, token);
  
        console.log('E-mail de recuperação de senha enviado:', info.response);
        res.send('E-mail de recuperação de senha enviado com sucesso.');
      }
    });
});
  