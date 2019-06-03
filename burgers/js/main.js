//Мобильное меню
const button__nav = document.querySelector('.button__nav');
const menu = document.querySelector('.header__nav');
const body = document.querySelector('body');


function triggerMobileMenu() {
    button__nav.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('hidden');

}
button__nav.addEventListener('click', function() {
    triggerMobileMenu();
})

//Выпадающее меню 
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

//Отправка данных из формы на сервер 
const form = document.querySelector('#deliveryForm');
const popup = document.querySelector('.form__popup');
const popupButton = document.querySelector('.popup__button');



form.onsubmit = function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    formData.append('to', 't.gurtovenko.sas@gmail.com');
    const request = new XMLHttpRequest();
    request.open('POST', 'https://webdev-api.loftschool.com/sendmail/fail');
    request.send(formData);
    request.addEventListener('load', function() {
        const response = JSON.parse(request.response);
        if (response) {
            popup.classList.add('form__popup-active');
            document.querySelector('.form__popup-message').innerText = response.message;
        }
    })
}
popupButton.addEventListener('click', function() {
    popup.classList.remove('form__popup-active');
})

//Аккардеон в секции 'team'
const accordeon = document.querySelector('.accordeon');
const title = document.getElementsByClassName('accordeon__item-link');
const desc = document.getElementsByClassName('accordeon__item-desc');


accordeon.addEventListener('click', function(e) {

    if (e.target.classList.contains('accordeon__item-link--active')) {
        e.target.classList.remove('accordeon__item-link--active');
    } else if (e.target.classList.contains('accordeon__item-link')) {
        for (let i = 0; i < title.length; i++) {
            title[i].classList.remove('accordeon__item-link--active');
        }
        e.target.classList.toggle('accordeon__item-link--active');
    }

});

//слайдер

const owl = $('.owl-carousel');
owl.owlCarousel({
    items: 1,
    loop: true,
    smartSpeed: 700
});
$('.slider__arrow-right').click(function(e) {
    e.preventDefault();
    owl.trigger('next.owl.carousel');
})

$('.slider__arrow-left').click(function(e) {
    e.preventDefault();
    owl.trigger('prev.owl.carousel');
})