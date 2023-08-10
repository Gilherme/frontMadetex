
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