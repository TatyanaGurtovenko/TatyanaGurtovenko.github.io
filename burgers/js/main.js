
//Выпадающее меню
const menu__list = document.querySelector(".menu__list");
const menu__item = document.getElementsByClassName("menu__item");
const menu__block = document.getElementsByClassName("menu__item-block");

menu__list.addEventListener("click", function (e) {
  let selectedSection = e.target.closest(".menu__item");
  if (selectedSection.classList.contains("menu__item--active")) {
    selectedSection.classList.remove("menu__item--active");
  } else if (selectedSection.classList.contains("menu__item")) {
    for (let i = 0; i < menu__item.length; i++) {
      menu__item[i].classList.remove("menu__item--active");
    }
    selectedSection.classList.toggle("menu__item--active");
  }
});

//Отправка данных из формы на сервер
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

//Переключатель активного класса меню
const switchActiveClassSideMenu = menuItemIndex => {
  $(".fixed-menu__item")
    .eq(menuItemIndex)
    .addClass("active")
    .siblings()
    .removeClass("active");
};

//Аккардеон в секции 'team'
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

//слайдер
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

//Яндекс карта

ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: [59.93, 30.32],
    zoom: 10,
    controls: ["zoomControl"],
    behaviors: ["drag"]
  });

  myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
    hintContent: "Собственный значок метки",
    balloonContent: "Это красивая метка"
  });
  myMap.geoObjects.add(myPlacemark);
}

//One page scroll
const sections = $(".section");
const display = $(".mainContent");

let inscroll = false;

const md = new MobileDetect(window.navigator.userAgent);

const isMobile = md.mobile();

const switchActiveClass = menuItemIndex => {
  $(".radio-menu__item")
    .eq(menuItemIndex)
    .addClass("radio-menu__item-active")
    .siblings()
    .removeClass("radio-menu__item-active");
};

const performTransition = sectionEq => {
  if (inscroll) return;

  inscroll = true;
  const position = `${sectionEq * -100}%`;

  sections
    .eq(sectionEq)
    .addClass("active")
    .siblings()
    .removeClass("active");
  display.css({
    transform: `translateY(${position})`
  });

  setTimeout(() => {
    inscroll = false;
    switchActiveClass(sectionEq);
  }, 1000 + 300);
};

const scrollToSection = direction => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index());
  }

  if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index());
  }
};

$(".wrapper").on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
    scrollToSection("next");
  }

  if (deltaY < 0) {
    scrollToSection("prev");
  }
});

$(".wrapper").on("touchmove", e => {
  e.preventDefault();
});

$(document).on("keydown", e => {
  switch (e.keyCode) {
    case 38:
      scrollToSection("prev");
      break;
    case 40:
      scrollToSection("next");
      break;
  }
});

$("[data-scroll-to]").on("click", e => {
  e.preventDefault();

  const target = $(e.currentTarget).attr("data-scroll-to");
  performTransition(target);
});

if (isMobile) {
  $(window).swipe({
    swipe: function (event, direction) {
      const nextOrPrev = direction === "up" ? "next" : "prev";
      scrollToSection(nextOrPrev);
    }
  });
}


//video

let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    height: "405",
    width: "660",
    videoId: "zmg_jOwa9Fc",
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  const duration = player.getDuration();
  let interval;
  updateTimerDisplay();

  $(".player").removeClass("hidden");

  clearInterval(interval);

  interval = setInterval(() => {
    const completed = player.getCurrentTime();
    const percents = (completed / duration) * 100;

    changeButtonPosition(percents);

    updateTimerDisplay();
  }, 1000);
}

function onPlayerStateChange(event) {
  const playerButton = $(".player__start");
  switch (event.data) {
    case 1:
      $(".player__wrapper").addClass("active");
      playerButton.addClass("paused");
      break;
    case 2:
      playerButton.removeClass("paused");
      break;
  }
}

$(".player__start").on("click", e => {
  const playerStatus = player.getPlayerState();

  if (playerStatus !== 1) {
    player.playVideo();
  } else {
    player.pauseVideo();
  }
});


$(".player__playback").on("click", e => {
  e.preventDefault();
  const bar = $(e.currentTarget);
  const newButtonPosition = e.pageX - bar.offset().left;
  const clickedPercents = (newButtonPosition / bar.width()) * 100;
  const newPlayerTime = (player.getDuration() / 100) * clickedPercents;

  changeButtonPosition(clickedPercents);
  player.seekTo(newPlayerTime);
});

$(".player__splash").on("click", e => {
  player.playVideo();
});

function changeButtonPosition(percents) {
  $(".player__playback-button").css({
    left: `${percents}%`
  });
}

function updateTimerDisplay() {
  $(".player__duration-completed").text(formatTime(player.getCurrentTime()));
  $(".player__duration-estimate").text(formatTime(player.getDuration()));
}

function formatTime(time) {
  const roundTime = Math.round(time);

  const minutes = Math.floor(roundTime / 60);
  const seconds = roundTime - minutes * 60;
  const formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return minutes + ":" + formatedSeconds;
}

//Volume video
$(function() {

	var slider = $('#slider'),
		tooltip = $('.tooltip');

	tooltip.hide();

	slider.slider({
		range: "min",
		min: 1,
		value: 35,

		start: function(event,ui) {
		  tooltip.fadeIn('fast');
		},

		slide: function(event, ui) {

			var value = slider.slider('value'),
				volume = $('.volume');

			tooltip.css('left', value).text(ui.value);

			if(value <= 5) {
				volume.css('background-position', '0 0%');
			}
			else if (value <= 25) {
				volume.css('background-position', '0 -25%');
			}
			else if (value <= 75) {
				volume.css('background-position', '0 -50%');
			}
			else {
				volume.css('background-position', '0 -75%');
			};

		},

		stop: function(event,ui) {
		  tooltip.fadeOut('fast');
		},
	});

});


