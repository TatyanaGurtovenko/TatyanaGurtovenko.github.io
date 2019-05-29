const button__nav = document.querySelector('.button__nav')
const menu = document.querySelector('.header__nav')
const body = document.querySelector('body')


function triggerMobileMenu() {
    console.log('function is work')
    button__nav.classList.toggle('active')
    menu.classList.toggle('active')
    body.classList.toggle('hidden')

}
button__nav.addEventListener('click', function() {
    triggerMobileMenu()
})