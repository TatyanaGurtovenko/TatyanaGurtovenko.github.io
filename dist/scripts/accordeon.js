//Аккардеон в секции 'team'
(function () {
    const accordeon = document.querySelector(".accordeon");
    const title = document.getElementsByClassName("accordeon__item-link");
    const desc = document.getElementsByClassName("accordeon__item-desc");

    accordeon.addEventListener("click", function (e) {
        if (e.target.classList.contains("accordeon__item-link--active")) {
            e.target.classList.remove("accordeon__item-link--active");
        } else if (e.target.classList.contains("accordeon__item-link")) {
            for (let i = 0; i < title.length; i++) {
                title[i].classList.remove("accordeon__item-link--active");
            }
            e.target.classList.toggle("accordeon__item-link--active");
        }
    });
})()