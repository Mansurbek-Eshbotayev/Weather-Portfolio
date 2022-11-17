let MY_KEY = `1bcfa8fab64daafbafdbf6584f1495e9`;
let API_TWO = `94824f883a7f9691035f921746912d9e`;
let elForm = document.querySelector(".our__form");
let elFormInput = document.querySelector(".form__input");
let elInfo = document.querySelector(".info");
let elSectionWather = document.querySelector(".weather");
let elMap = document.querySelector("#chartdiv");
let elMinMap = document.querySelector("#worldmap");
let elTitle = document.querySelector(".info__title");
let elDagre = document.querySelector(".degre__name");
let elTemp = document.querySelector(".dagre__temp");
let elIcon = document.querySelector(".dagre__icon");
let elCount = document.querySelector(".logo__count");
let elCountImg = document.querySelector(".map__img");

let elInfoLocation = document.querySelector(".imfo__location");

// For Map
// var lat = ""
// var lng = ""
// console.log(lat,lng);

// icon function
function createIcon(arr) {
  elIcon.src = arr;
}

// create own list
let allArr = [];
function createList(arr) {
  fetch(arr)
    .then((req) => req.json())
    .then((data) => {
      // console.log(data);
      allArr.push(data);
      if (allArr.length > 0) {
        allArr.forEach((item) => {
          // console.log(item.name);
          elTitle.textContent = item.name;
          elDagre.innerHTML = `${Math.floor(item.main.temp)} <sup>o</sup>C`;
          elTemp.textContent = item.weather[0].description;
          elIcon.textContent = item.weather[0].icon;
          elCount.textContent = `Country: ${item.sys.country}`;
          let lat = item.coord.lat;
          let lng = item.coord.lon;
          elInfoLocation.href = `https://openweathermap.org/weathermap?basemap=map&cities=false&layer=clouds&lat=${lat}&lon=${lng}&zoom=5`;
          createIcon(
            `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
          );
          console.log();
          // bk with Id
          let wearherId = item.weather[0].id;
          if (wearherId >= 200 && wearherId <= 232) {
            elSectionWather.style.backgroundImage =
              "url(images/Thunderstorm.jpg)";
          } else if (wearherId >= 300 && wearherId <= 321) {
            elSectionWather.style.backgroundImage = "url(images/drizzle.jpg)";
          } else if (wearherId >= 500 && wearherId <= 531) {
            elSectionWather.style.backgroundImage = "url(images/rain.jpg)";
          } else if (wearherId >= 600 && wearherId <= 622) {
            elSectionWather.style.backgroundImage = "url(images/Snow.jpg)";
          } else if (wearherId >= 701 && wearherId <= 781) {
            elSectionWather.style.backgroundImage =
              "url(images/Atmosphere.jpg)";
          } else if ((wearherId = 800)) {
            elSectionWather.style.backgroundImage = "url(images/Clear.jpg)";
          } else if (wearherId >= 801 && wearherId <= 804) {
            elSectionWather.style.backgroundImage = "url(images/Clouds.jpg)";
          } else {
            elSectionWather.style.backgroundImage = "url(images/all.jpg)";
          }
        });
      }
    });
}

function createFlag(arr) {
  fetch(arr)
    .then((req) => req.json())
    .then((data) => {
      data.forEach((item) => {
        elCountImg.src = item.flags.png;
      });
    });
}

// secon flag
function flagLitl(arr) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${arr}&appid=${MY_KEY}&units=metric`
  )
    .then((req) => req.json())
    .then((data) => {
      let flaging = data.sys.country;
      elCount.textContent = `Country: ${data.sys.country}`;
      createFlag(`https://restcountries.com/v3.1/name/${flaging}`);
    });
}

createList(
  `https://api.openweathermap.org/data/2.5/weather?q=Uzbekistan&appid=${MY_KEY}&units=metric`
);
createFlag(`https://restcountries.com/v3.1/name/Uzbekistan`);

// debounce function
function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

elMap.addEventListener(
  "dblclick",
  debounce(function () {
    if (countres.length > 0) {
      window.scrollBy(0, 770);
      createList(
        `https://api.openweathermap.org/data/2.5/weather?q=${countres}&appid=${MY_KEY}&units=metric`
      );
      createFlag(`https://restcountries.com/v3.1/name/${countres}`);
    }
  }, 1000)
);

elMinMap.addEventListener("click", function () {
  window.scrollTo(0, 0);
  countres.length = "";
  elMap.reload();
});

// Search section
elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  let imputVal = elFormInput.value;
  createList(
    `https://api.openweathermap.org/data/2.5/weather?q=${imputVal}&appid=${MY_KEY}&units=metric`
  );
  flagLitl(imputVal);
  elFormInput.value = "";
});
