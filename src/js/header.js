
// Abrir e fechar menu e apendices 
const apendiceEntre = document.querySelector('.area-usuario .usuario')
apendiceEntre.addEventListener('mouseover', () => abrirFechar('apendice-cadastrese'))
apendiceEntre.addEventListener('mouseout',  () => abrirFechar('apendice-cadastrese'))

const btnMenu = document.getElementById('btn-menu')
const btnX    = document.getElementById('btn-x')
btnMenu.addEventListener('click', () => abrirFechar('menu-mobile'));
btnX.addEventListener('click',    () => abrirFechar('menu-mobile'))



let nomesDosProdutos 

fetch('http://localhost:1039/todosProdutos')
  .then(res => res.json())
  .then(json => {

    const ul = document.querySelector('.area-pesquisa ul')
    json.forEach(item => {
     
      const li = document.createElement('li')
      const a = document.createElement('a')

      li.textContent = item.nome
      ul.appendChild(li)
    });
  })


  function filtrarSugestoesProd(){
    let input, ul, li, count;
    input = document.getElementById('input-pesquisa')
    ul = document.querySelector('.area-pesquisa ul')
    
    filtro = input.value.toUpperCase();
    li = document.querySelectorAll('.area-pesquisa ul li')

    for(i = 0; i < li.length; i++){
      nome = li[i].textContent.toUpperCase()

      if(nome.indexOf(filtro) > -1){
        li[i].style.display = "";
        count++

        li[i].innerHTML = nome
      }else{
        li[i].style.display = 'none'
      }
    }
    if( count === 0){
      ul.style.display = 'none'
    }else{
      ul.style.display = 'block'
    }
  }