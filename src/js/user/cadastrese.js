
// CADASTRAR USUARIO

function cadastrarUser(data){
 
  fetch(`http://localhost:1039/cadastrarUsuario`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
   alert(result.msg)
  })
  .catch(error => {
    console.error('Erro ao inserir dados:', error);
  });
}
// verificar usuario

async function verificarUser(){

  const nome = document.getElementById('nome').value
  const email = document.getElementById('email').value
  const telefone = document.getElementById('telefone').value
  const senha = document.getElementById('senha').value

  const data = {
    nome: nome,
    email: email,
    telefone: telefone,
    senha: senha
  }
  
  const response = await fetch('http://localhost:1039/verificarUsuario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if(response.ok){
    const resposta = await response.json()
     if(!resposta.existe){
      cadastrarUser(data)
     }else{
      exibirAviso(data.email)
     }
}
}

function exibirAviso(email){
  const card = criarElemento('div', 'card-aviso')
  const mensagem = criarElemento('h4', 'aviso')
  const login = criarElemento('a', 'faca-login')
  const recupere = criarElemento('a', 'recuperar')
  const btnRecupere = criarElemento('button', 'btn-recuperar')
  const bntEntre = criarElemento('button', 'btn-entre-aviso')
  
  recupere.href = '#'; recupere.textContent = 'Recupere sua conta';
  login.href = './login.html'; login.textContent = 'Faça login';
  mensagem.textContent = `Já existe uma conta com o email ${email}`

  const body = document.querySelector('body')
  btnRecupere.appendChild(recupere)
  bntEntre.appendChild(login)
  card.appendChild(mensagem)
  card.appendChild(bntEntre);  card.appendChild(btnRecupere)
  body.appendChild(card)
}
 
//  CPF
function formatarCPF(cpf) {
  cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  cpf = cpf.substring(0, 11); // Limita o CPF a 11 dígitos
  
  // Insere pontos e traço na formatação do CPF
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  
  return cpf;
}

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  
  // Verifica se o CPF possui 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }
  
  // Verifica se todos os dígitos são iguais (CPF inválido)
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }
  
  // Validação do dígito verificador
  var soma = 0;
  var resto;
  
  for (var i = 1; i <= 9; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  
  resto = (soma * 10) % 11;
  
  if ((resto === 10) || (resto === 11)) {
    resto = 0;
  }
  
  if (resto !== parseInt(cpf.substring(9, 10))) {
    return false;
  }
  
  soma = 0;
  
  for (var i = 1; i <= 10; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  
  resto = (soma * 10) % 11;
  
  if ((resto === 10) || (resto === 11)) {
    resto = 0;
  }
  
  if (resto !== parseInt(cpf.substring(10, 11))) {
    return false;
  }
  
  return true;
}

function atualizarCampo(campo) {
  var cpf = campo.value;
  cpf = formatarCPF(cpf);
  campo.value = cpf;
  
  if (!validarCPF(cpf)) {
    campo.setCustomValidity('CPF inválido');
  } else {
    campo.setCustomValidity('');
  }
}

// Ferramentas

function criarElemento(elemento, classe){
  const element = document.createElement(elemento)
  if(elemento == 'img'){
    return element
  }else{
    element.classList.add(classe)
  }
  return element
}