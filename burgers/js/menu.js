const menu__list = document.querySelector('.menu__list');
const menu__item = document.getElementsByClassName('menu__item');
const menu__block = document.getElementsByClassName('menu__item-block');



menu__list.addEventListener('click', function(e) {
    let selectedSection = e.target.closest('.menu__item');
    if (selectedSection.classList.contains('menu__item--active')) {
        selectedSection.classList.remove('menu__item--active')
    } else if (selectedSection.classList.contains('menu__item')) {
        for (let i = 0; i < menu__item.length; i++) {
            menu__item[i].classList.remove('menu__item--active');
        }
        selectedSection.classList.toggle('menu__item--active');
    }
})