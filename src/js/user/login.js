
async function entrar(){
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value
  const dataLogin = {email: email.trim(), senha: senha.trim()}
  // const response = await fetch('http://localhost:1039/login', {
  const response = await fetch('https://api.madetex.com.br/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataLogin)
  })

  const data = await response.json()

  if (!response.ok) {
    if (response.status === 401) {
      exibirMensagemAlertaInput('#senha', data.msg)
      let es = document.querySelector('.msg-esqueceu-senha')
      es.style.display = 'block'
    }
    else{exibirMensagemAlertaInput('#email', data.msg)}
  }else{
    localStorage.setItem('user', JSON.stringify(data))
    window.location.href = '/index.html'
  }
} 
