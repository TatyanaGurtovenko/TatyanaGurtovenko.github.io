//Яндекс карта

(function () {
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
})()