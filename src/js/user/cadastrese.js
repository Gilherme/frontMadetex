const nome = document.getElementById('nome')
const email = document.getElementById('email')
const senha = document.getElementById('senha')
const telefoneInput = document.getElementById('telefone')

telefoneInput.addEventListener('input', () => formatarTelefone(telefoneInput));

 async function cadastrarUser(){
  const tel = telefoneInput.value.replace('(', '').replace(') ', '').replace('-', '').replace(' ', '')
  const usuario = {nome: nome.value, email: email.value, telefone: tel, senha: senha.value}
  
  const response = await fetch(`http://localhost:1039/cadastrarUsuario`, {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(usuario)
  })
  const resposta = await response.json()
  if(!response.ok){
    if(resposta.el){
      exibirMensagemAlertaInput(resposta.el, resposta.msg)
    }else{
      exibirAviso(email.value)
    } 
  }else{
    cadastradoComSucesso()
  }
}

function cadastradoComSucesso(){
    document.querySelector('body').innerHTML = `
    <h2 style="text-align: center; margin-top: 5rem;" > Usuario cadastrado com sucesso! <h2>`
    setTimeout(() => {
      // window.location = 'https://www.madetex.com.br/src/views/user/login.html'
      window.location = 'http://localhost:3000/src/views/user/login.html'
    },1500)
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
 