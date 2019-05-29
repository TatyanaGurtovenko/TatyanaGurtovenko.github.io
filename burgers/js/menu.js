const menu = document.querySelector('menu__list');
const title = document.getElementsByClassName('menu__subtitle');
const desc = document.getElementsByClassName('menu__item-block');



menu.addEventListener('click', function(e) {

    if (e.target.classList.contains('.menu__subtitle--active')) {
        e.target.classList.remove('.menu__subtitle--active');
    } else if (e.target.classList.contains('.menu__subtitle')) {
        for (let i = 0; i < title.length; i++) {
            title[i].classList.remove('.menu__subtitle--active');
        }
        e.target.classList.toggle('.menu__subtitle--active');
    }

});