
// Abrir e fechar menu e apendices 
const btnCategorias = document.querySelector('.categorias')
btnCategorias.addEventListener('click', toggleCategorias)
function toggleCategorias(){abrirFechar('nav-categorias'); toggleSeta('.categorias .seta')}

const apendiceEntre = document.querySelector('.area-usuario .usuario')
apendiceEntre.addEventListener('mouseover', () =>  toggleApendiceUserHeader())
apendiceEntre.addEventListener('mouseout',  () => toggleApendiceUserHeader()) //Função no user/atualizarDados.js

const btnMenu = document.getElementById('btn-menu')
const btnX    = document.getElementById('btn-x')
btnMenu.addEventListener('click', () => abrirFechar('menu-mobile'));
btnX.addEventListener('click',    () => abrirFechar('menu-mobile'))



fetch('http://localhost:1039/chavesProdutos')
  .then(res => res.json())
  .then(json => {

    const ul = document.querySelector('.area-pesquisa ul')
    json.forEach(item => {
     
      const li = document.createElement('li')

      li.textContent = item.chave
      li.setAttribute('param', item.param)
      li.setAttribute('local', item.local)
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
      if(filtro == li[i].textContent){
        preencherInput(li[i])
      }
    }
    li.forEach(function(li){
      li.addEventListener('click', () => preencherInput(li) )
    });

    if(count === 0 || filtro.length === 0){
      ul.style.display = 'none' 
    }else{
      ul.style.display = 'block'
    }
  }

let param
let local
function preencherInput(li){
  ul = document.querySelector('.area-pesquisa ul').style.display = 'none'
  valorNoInput = document.getElementById('input-pesquisa')
  valorNoInput.value = li.textContent 
  param = li.getAttribute('param')
  local = li.getAttribute('local')
  console.log(param, local)
}


function pesquisarEnter(event){
  if(event.key == "Enter"){
    pesquisar()
  }
}

function pesquisar(){
  const detalhesUrl = `/views/produtos.html?param=${encodeURIComponent(param)}&column=${encodeURIComponent(local)}`;
  window.location.href = detalhesUrl;
}
