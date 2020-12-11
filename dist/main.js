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

/***/ "./src/Components/Select/componentSelect.ts":
/*!**************************************************!*
  !*** ./src/Components/Select/componentSelect.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ ComponentSelect
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../index */ "./src/index.ts");

class ComponentSelect extends HTMLElement {
    constructor() {
        super();
    }
    /**
     * Sets selected index
     * @param option
     */
    setSelectedIndex(option) {
        [].forEach.call(option, (item, index) => {
            if (item.slot == "selected") {
                this.selectedIndex = index;
            }
        });
    }
    connectedCallback() {
        this.attachShadow({
            mode: "open"
        });
        let template = document.querySelector('#dropdown');
        let content = template.content.cloneNode(true);
        this.shadowRoot.append(content);
        let option = document.querySelector('#city').children;
        this.setSelectedIndex(option);
        this.shadowRoot.querySelector('slot[name="item"]').onclick = (e) => {
            option[this.selectedIndex].slot = "item";
            let selectedSlot = e.target;
            selectedSlot.slot = "selected";
            this.setSelectedIndex(option);
            this.shadowRoot.querySelector('.dropdown-list').classList.toggle('closed');
        };
        this.shadowRoot.querySelector('slot[name="selected"]').addEventListener('slotchange', (e) => {
            let selectedCity = option[this.selectedIndex].text;
            _index__WEBPACK_IMPORTED_MODULE_0__.weatherWork.getWeatherByCityName(selectedCity)
                .then((response) => response.json())
                .then((weather) => {
                let temp = Math.round(weather.main.temp);
                _index__WEBPACK_IMPORTED_MODULE_0__.temperatureElem.innerHTML = `<p><b>${temp}</b> C</p>`;
                let desc = weather.weather[0].description.split(' ')
                    .map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');
                _index__WEBPACK_IMPORTED_MODULE_0__.descriptionOfTemperatureElem.innerHTML = `<p>${desc}</p>`;
                let icon = weather.weather[0].icon;
                _index__WEBPACK_IMPORTED_MODULE_0__.weatherWork.getIconOfWeather(icon)
                    .then((response) => response.blob())
                    .then((icon) => {
                    if (!(_index__WEBPACK_IMPORTED_MODULE_0__.iconWrapper.querySelector('img'))) {
                        let img = document.createElement('img');
                        _index__WEBPACK_IMPORTED_MODULE_0__.iconWrapper.append(img);
                        img.alt = "weather icon";
                        img.src = URL.createObjectURL(icon);
                    }
                    else {
                        let img = _index__WEBPACK_IMPORTED_MODULE_0__.iconWrapper.querySelector('img');
                        img.src = URL.createObjectURL(icon);
                    }
                });
                _index__WEBPACK_IMPORTED_MODULE_0__.weatherWork.selectedCity = weather.name;
                _index__WEBPACK_IMPORTED_MODULE_0__.weatherWork.description = desc;
                _index__WEBPACK_IMPORTED_MODULE_0__.weatherWork.temperature = temp;
                _index__WEBPACK_IMPORTED_MODULE_0__.weatherWork.icon = icon;
            });
        });
        this.shadowRoot.querySelector('slot[name="selected"]').onclick = () => {
            this.shadowRoot.querySelector('.dropdown-list').classList.toggle('closed');
        };
    }
    disconnectedCallback() { }
    static get observedAttributes() {
        return [];
    }
    attributeChangedCallback(attName, attPreVal, attCurrVal) { }
}


/***/ }),

/***/ "./src/components/modalComponent.class.ts":
/*!************************************************!*
  !*** ./src/components/modalComponent.class.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModalComponent": () => /* binding */ ModalComponent
/* harmony export */ });
class ModalComponent extends HTMLElement {
    constructor() {
        super();
    }
    getCurrDate() {
        return new Date();
    }
    getFormattedDate(date) {
        const monthDayOption = {
            month: 'short',
            day: 'numeric',
        };
        const hoursMinutesOption = {
            hour: 'numeric',
            minute: 'numeric',
        };
        const monthDay = date.toLocaleString('en', monthDayOption);
        const hoursMinutes = date.toLocaleString('en', hoursMinutesOption)
            .slice(0, 4) + date.toLocaleString('en', hoursMinutesOption)
            .slice(5).toLowerCase();
        const formattedDate = `${hoursMinutes}, ${monthDay}`;
        return formattedDate;
    }
    connectedCallback() {
        let date = this.getFormattedDate(this.getCurrDate());
        console.log('INIT', this);
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.innerHTML = `
            <p><time>${date}</time></p>
            <h2>City, Country</h2>

            <style>
                p {
                    color: orange;
                }

                :host {
                    display: inline-block;
                    padding: 10px;
                    background-color: aliceblue;
                    color: black;
                }
            </style>
        `;
    }
    disconnectedCallback() {
    }
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "weatherWork": () => /* binding */ weatherWork,
/* harmony export */   "temperatureElem": () => /* binding */ temperatureElem,
/* harmony export */   "descriptionOfTemperatureElem": () => /* binding */ descriptionOfTemperatureElem,
/* harmony export */   "iconWrapper": () => /* binding */ iconWrapper
/* harmony export */ });
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _components_modalComponent_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/modalComponent.class */ "./src/components/modalComponent.class.ts");
/* harmony import */ var _Components_Select_componentSelect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components/Select/componentSelect */ "./src/Components/Select/componentSelect.ts");
/* harmony import */ var _storeServices_data_weatherService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storeServices/data/weatherService */ "./src/storeServices/data/weatherService.ts");




const weatherWork = new _storeServices_data_weatherService__WEBPACK_IMPORTED_MODULE_3__.default();
const temperatureElem = document.querySelector('.temp');
const descriptionOfTemperatureElem = document.querySelector('.additionForTemp');
const iconWrapper = document.querySelector('.icon-wrapper');
document.addEventListener('DOMContentLoaded', () => {
    // Обьявление компонента select
    customElements.define('component-select', _Components_Select_componentSelect__WEBPACK_IMPORTED_MODULE_2__.default);
    // Обьявление компонента модалки
    customElements.define('modal-component', _components_modalComponent_class__WEBPACK_IMPORTED_MODULE_1__.ModalComponent);
    weatherWork.getCurrentUserPosition()
        .then((response) => response.json())
        .then((weather) => {
        const optionElem = document.createElement('option');
        let selectedItem = document.querySelector('option[slot="selected"]');
        selectedItem.slot = "item";
        optionElem.slot = "selected";
        optionElem.innerHTML = weather.name;
        optionElem.title = "This is your current location";
        optionElem.style.backgroundColor = "green";
        optionElem.id = "userCurrentPosition";
        selectedItem.before(optionElem);
        let temp = Math.round(weather.main.temp);
        temperatureElem.innerHTML = `<p><b>${temp}</b> C</p>`;
        let desc = weather.weather[0].description.split(' ')
            .map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');
        descriptionOfTemperatureElem.innerHTML = `<p>${desc}</p>`;
        let icon = weather.weather[0].icon;
        weatherWork.getIconOfWeather(icon)
            .then((response) => response.blob())
            .then((icon) => {
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
        weatherWork.selectedCity = weather.name;
        weatherWork.description = desc;
        weatherWork.temperature = temp;
        weatherWork.icon = icon;
    });
    // Запись последнего выбранного города в Local Storage
    window.addEventListener('beforeunload', () => {
        weatherWork.loadCityToLocalStorage();
    });
});


/***/ }),

/***/ "./src/storeServices/data/weatherService.ts":
/*!**************************************************!*
  !*** ./src/storeServices/data/weatherService.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ weatherService
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class weatherService {
    constructor() { }
    /**
     * Gets current user position
     * @returns current user position
     */
    getCurrentUserPosition() {
        return __awaiter(this, void 0, void 0, function* () {
            let fetchedData;
            yield new Promise((resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        resolve(position);
                    }, () => {
                        reject('error');
                        console.error(this.handleLocationError(true));
                    });
                }
                else {
                    reject('error');
                    console.error(this.handleLocationError(false));
                }
            }).then((position) => {
                fetchedData = this.getWeatherByCoords(position);
            });
            return fetchedData;
        });
    }
    /**
     * Gets weather by coords
     * @param position
     * @returns weather by coords
     */
    getWeatherByCoords(position) {
        let fetchedWeather = null;
        try {
            fetchedWeather = fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=e7aadd779ff9063f45cbf092bdfd1636`);
        }
        catch (error) {
            throw Error('Error occured with fetch data of weather by coords -> ' + error);
        }
        return fetchedWeather;
    }
    /**
     * Gets weather by city name
     * @param city
     * @returns
     */
    getWeatherByCityName(city) {
        let fetchedWeather = null;
        try {
            fetchedWeather = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e7aadd779ff9063f45cbf092bdfd1636`);
        }
        catch (error) {
            throw Error('Error occured with fetch data of weather by city name -> ' + error);
        }
        return fetchedWeather;
    }
    /**
     * Gets icon of weather
     * @param icon
     * @returns icon of weather
     */
    getIconOfWeather(icon) {
        let fetchedIconOfWeather = null;
        try {
            fetchedIconOfWeather = fetch(`http://openweathermap.org/img/wn/${icon}@2x.png`);
        }
        catch (error) {
            throw Error('Error occured with fetch icon of weather -> ' + error);
        }
        return fetchedIconOfWeather;
    }
    /**
   * Handles location error
   * @param browserHasGeolocation
   */
    handleLocationError(browserHasGeolocation) {
        return browserHasGeolocation ?
            "Error: The Geolocation service failed"
            : "Error: Your browser doesn't support geolocation.";
    }
    /**
     * Loads city to local storage
     */
    loadCityToLocalStorage() {
        window.localStorage.setItem('city', this.selectedCity);
    }
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/index.ts");
/******/ })()
;
//# sourceMappingURL=main.js.map