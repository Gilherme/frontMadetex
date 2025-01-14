let bodyzin = document.body

fetch('/src/views/apendices/footer.html')
.then(response => response.text())
.then(data => {

 const footer = document.createElement('footer')
 footer.innerHTML = data
 bodyzin.appendChild(footer)
})

function mostrarMaisInformacoes(){
   const cardsFooter = document.querySelectorAll('#informacoes .card-informacoes')
   const setaFooter = document.getElementById('seta-footer')

   if(setaFooter.classList.contains('seta-footer-open')){
      setaFooter.classList.remove('seta-footer-open')
   }else{
      setaFooter.classList.add('seta-footer-open')
   }

   cardsFooter.forEach(card => {
      if(card.style.display === 'none' || card.style.display === ''){
         card.style.display = 'block'
      }else{
         card.style.display = 'none'
      }
   })
}