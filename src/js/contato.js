
const assunto = document.getElementById('assunto')
const email = document.getElementById('email')
assunto.addEventListener("input", () => {
  const valor = assunto.value
  if(valor.length > 100){
    exibirMensagemAlertaInput(assunto, 'O assunto deve ter até 100 caracteres', '.mensagem-assunto')
  }
})
email.addEventListener("input", () => {
  const valor = email.value
  if(valor.length > 100){
    exibirMensagemAlertaInput(email, 'O assunto deve ter até 100 caracteres', '.mensagem-email')
  }
})


function enviarMensagem(){
  const msgAssunto = assunto.value;
  const mensagem = document.getElementById('mensagem').value;
  const msgEmail = email.value;

  const msg = {assunto: msgAssunto, mensagem: mensagem, email: msgEmail} 

  if(msgAssunto.length < 100 && msgEmail.length < 100){
    fetch(`http://localhost:1039/enviarMensagem`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(msg)
    })
    .then(response => response.json())
    .then(mensagem => alert(mensagem.msg))
    .catch(error => {console.error('Erro ao inserir dados:', error);});
  }else{
    alert('O assunto e o email deve ter até 100 caracteres')
  }  
}

function meioDeContato(meio){
  if(meio == 'whats'){
    window.location = 'https://wa.me/5511943133043'
  }if(meio == 'email'){
    window.location = 'mailto:guibarreto64042@gmail.com'
  }
}