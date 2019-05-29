const menu__list = document.querySelector('.menu__list');
const menu__subtitle = document.getElementsByClassName('menu__subtitle');
const menu__item = document.getElementsByClassName('menu__item-block');



menu__list.addEventListener('click', function(e) {

    if (e.target.classList.contains('menu__subtitle--active')) {
        e.target.classList.remove('menu__subtitle--active');
    } else if (e.target.classList.contains('menu__subtitle')) {
        for (let i = 0; i < menu__subtitle.length; i++) {
            menu__subtitle[i].classList.remove('menu__subtitle--active');
        }
        e.target.classList.toggle('menu__subtitle--active');
    }

});