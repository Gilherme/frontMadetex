const nome = document.getElementById('nome')
const email = document.getElementById('email')
const senha = document.getElementById('senha')
const telefoneInput = document.getElementById('telefone')

telefoneInput.addEventListener('input', () => formatarTelefone(telefoneInput));

 async function cadastrarUser(){
  const tel = telefoneInput.value.replace('(', '').replace(') ', '').replace('-', '').replace(' ', '')
  const usuario = {nome: nome.value, email: email.value.trim(), telefone: tel, senha: senha.value}

  // const response = await fetch(`http://localhost:1039/cadastrarUsuario`, {
  const response = await fetch(`https://api.madetex.com.br/cadastrarUsuario`, {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(usuario)
  })
  const resposta = await response.json()
  if(!response.ok){
    if(resposta.el){
      exibirMensagemAlertaInput(resposta.el, resposta.msg)
    }
    else{
      exibirAviso(email.value)
      irParaOheader()
    }
  }
  else{
    cadastradoComSucesso(email.value)
  }
}

function cadastradoComSucesso(email){
    document.querySelector('.card-entre').innerHTML = `
    <h3 style="text-align: center; margin: 5rem auto 1rem auto;" > Um link de verificação foi enviado para o email ${email}, Clique no link para verificar seu email<h3> <p> caso não o ache verifique o lixo eletronico ou spam do seu e-mail</p> `
    setTimeout(() => {
      window.location.href = '/src/views/user/login.html'
    },10000)
}

function exibirAviso(email){
  const card = criarElemento('div', 'card-aviso')
  const mensagem = criarElemento('h4', 'aviso')
  const login = criarElemento('a', 'faca-login')
  const recupere = criarElemento('a', 'recuperar')
  const btnRecupere = criarElemento('button', 'btn-recuperar')
  const bntEntre = criarElemento('button', 'btn-entre-aviso')
  
  recupere.href = './alterarSenha.html'; recupere.textContent = 'Recupere sua conta';
  login.href = './login.html'; login.textContent = 'Faça login';
  mensagem.textContent = `Já existe uma conta com o email ${email}`

  const body = document.querySelector('body')
  btnRecupere.appendChild(recupere)
  bntEntre.appendChild(login)
  card.appendChild(mensagem)
  card.appendChild(bntEntre);  card.appendChild(btnRecupere)
  body.appendChild(card)
}

const inputsCadastrese = document.querySelectorAll('input')

inputsCadastrese.forEach(ipt => {
  ipt.addEventListener('input', () => {
    if(ipt.style.borderColor == 'red'){
      deixarInputVerde(ipt)
    }
  })
})

document.addEventListener('click', () =>{
  let aviso = document.querySelector('.card-aviso')
  if(aviso){
    
    if(aviso.contains(event.target)){
      console.log('click foi no elemento')
    }else{
      aviso.style.display = 'none'
    }
  }
})
 