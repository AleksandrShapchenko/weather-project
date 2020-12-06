/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.scss":
/*!************************!*
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");

document.addEventListener('DOMContentLoaded', () => {
    const selection = document.querySelector('#city');
    let city = selection.options[selection.selectedIndex].text;
    // Это выглядит больше как костыль, надо что-то придумать для подтягивания погоды
    // при первой загрузки
    loadDataOfWeather(city);
    // Следим за изменениями тега Select
    selection.addEventListener('change', (e) => {
        let city = e.target;
        city = city.options[city.selectedIndex].text;
        loadDataOfWeather(city);
    });
});
/**
 * Loads data of weather by selected city
 * @param city
 * @param [tempElem]
 * @param [descTempElem]
 */
function loadDataOfWeather(city, tempElem = document.querySelector('.temp'), descTempElem = document.querySelector('.additionForTemp')) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e7aadd779ff9063f45cbf092bdfd1636`)
        .then((res) => res.json())
        .then((weather) => {
        console.log(weather);
        let temp = Math.round(weather.main.temp);
        tempElem.innerHTML = `<p><b>${temp}</b> C</p>`;
        let desc = weather.weather[0].description.split(' ')
            .map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');
        descTempElem.innerHTML = `<p>${desc}</p>`;
        let icon = weather.weather[0].icon;
        loadIconOfWeather(icon);
    });
}
/**
 * loads icon
 * @param icon
 * @param img
 */
function loadIconOfWeather(icon, iconWrapper = document.querySelector('.icon-wrapper')) {
    fetch(`http://openweathermap.org/img/wn/${icon}@2x.png`)
        .then((res) => res.blob())
        .then((icon) => {
        // Проверка на наличие img
        // Создание при первом запросе / изменение при следующих 
        if (!(iconWrapper.querySelector('img'))) {
            let img = document.createElement('img');
            iconWrapper.append(img);
            img.alt = "weather icon";
            img.src = URL.createObjectURL(icon);
        }
        else {
            let img = iconWrapper.querySelector('img');
            img.src = URL.createObjectURL(icon);
        }
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=main.js.map