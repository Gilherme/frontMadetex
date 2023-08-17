const apendiceEntre = document.querySelector('.area-usuario .usuario')
apendiceEntre.addEventListener('mouseover', () => abrirFechar('apendice-cadastrese'))
apendiceEntre.addEventListener('mouseout', () => abrirFechar('apendice-cadastrese'))
const btnMenu = document.getElementById('btn-menu')
const btnX = document.getElementById('btn-x')
btnMenu.addEventListener('click', () => abrirFechar('menu-mobile'));
btnX.addEventListener('click', () => abrirFechar('menu-mobile'))