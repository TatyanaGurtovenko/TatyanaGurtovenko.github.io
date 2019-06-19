//Отправка данных из формы на сервер
(function () {
    const form = document.querySelector("#deliveryForm");
    const popup = document.querySelector(".form__popup");
    const popupButton = document.querySelector(".popup__button");

    form.onsubmit = function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        formData.append("to", "t.gurtovenko.sas@gmail.com");
        const request = new XMLHttpRequest();
        request.open("POST", " https://webdev-api.loftschool.com/sendmail");
        request.send(formData);
        request.addEventListener("load", function () {
            const response = JSON.parse(request.response);
            if (response) {
                popup.classList.add("form__popup-active");
                document.querySelector(".form__popup-message").innerText =
                    response.message;
            }
        });
    };
    popupButton.addEventListener("click", function () {
        popup.classList.remove("form__popup-active");
    });
})()