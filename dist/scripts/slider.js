//слайдер
(function () {
    const owl = $(".owl-carousel");
    owl.owlCarousel({
        items: 1,
        loop: true,
        smartSpeed: 700
    });
    $(".slider__arrow-right").click(function (e) {
        e.preventDefault();
        owl.trigger("next.owl.carousel");
    });

    $(".slider__arrow-left").click(function (e) {
        e.preventDefault();
        owl.trigger("prev.owl.carousel");
    });
})()