//Переключатель активного класса меню
(function () {
    const switchActiveClassSideMenu = menuItemIndex => {
        $(".fixed-menu__item")
            .eq(menuItemIndex)
            .addClass("active")
            .siblings()
            .removeClass("active");
    };
})()