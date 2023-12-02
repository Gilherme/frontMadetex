async function alterarSenha() {
  const email = document.querySelector('#email').value
  const response = await fetch(`https://api.madetex.com.br/enviarEmailDeRecuperacaoDeConta?email=${encodeURIComponent(email)}`)
  const res = await response.json();

  if (!response.ok) {
    exibirMensagemAlertaInput('#email', res.msg)
  } else {
    document.querySelector('.card-entre').innerHTML = `<h3 style="text-align: center; margin-top: 5rem;" > Um link para alteração de senha foi enviado para o email: ${email}</h3>`
  }
}

async function alterarSenhaTwo() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('email');
  const token = urlParams.get('token')

  const nSenha = document.querySelector('#nSenha')
  const senha = document.querySelector('#senha')

  if(nSenha.value != senha.value){
    nSenha.style.borderColor = "red"; senha.style.borderColor = "red";
    let msgErr = document.querySelector('.msg-senha-difer')
    msgErr.textContent = 'As senhas são difirentes';
    msgErr.style.color = 'red';
  } 
  else{
    const user = { email: email, token: token, senha: senha.value }
    const response = await fetch(`https://api.madetex.com.br/alterarSenha`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
     })
    if(response.status === 200){
      document.querySelector('.card-entre').innerHTML = '<h3 style="text-align: center; margin-top: 5rem;" > Senha alterada com sucesso!</h3>'
      setTimeout(()=>{
        window.location.href = '/src/views/user/login.html'
      },2000)
    }else if(response.status === 500){
      msgErr.textContent = 'Erro ao alterar senha, tente novamente';
      msgErr.style.color = 'red';
    }
  }
}
