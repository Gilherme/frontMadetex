
async function entrar(){
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value
  const dataLogin = {email: email, senha: senha}

  const response = await fetch('http://localhost:1039/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataLogin)
  })
  if(!response.ok){
    const msg = await response.json()
    mostrarErro(msg)
  }else{
    const dados = await response.json()
    localStorage.setItem('user', JSON.stringify(dados))
    window.location.href = 'http://localhost:3000/views/index.html'
  }
} 

function mostrarErro(msg){
  const sup = document.querySelector('.msg-email')
  const inputEmail = document.getElementById('email')
  const inputSenha = document.getElementById('senha')

    inputSenha.style.borderColor = "red"
    inputEmail.style.borderColor = "red"
    sup.textContent = msg.msg
}






