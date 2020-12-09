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
/* harmony import */ var _UtilsForWorkWithAPI_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../UtilsForWorkWithAPI/utils */ "./src/UtilsForWorkWithAPI/utils.ts");

class ComponentSelect extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.attachShadow({
            mode: "open"
        });
        let template = document.getElementById('dropdown');
        let content = template.content.cloneNode(true);
        this.shadowRoot.append(content);
        let option = document.querySelector('#city').children;
        [].forEach.call(option, (item, index) => {
            if (item.slot == "selected") {
                this.selectedIndex = index;
            }
        });
        this.shadowRoot.querySelector('slot[name="item"]').onclick = (e) => {
            option[this.selectedIndex].slot = "item";
            e.target.slot = "selected";
            [].forEach.call(option, (item, index) => {
                if (item.slot == "selected") {
                    this.selectedIndex = index;
                }
            });
            this.shadowRoot.querySelector('.dropdown-list').classList.toggle('closed');
        };
        this.shadowRoot.querySelector('slot[name="selected"]').addEventListener('slotchange', (e) => {
            let selectedCity = option[this.selectedIndex].text;
            (0,_UtilsForWorkWithAPI_utils__WEBPACK_IMPORTED_MODULE_0__.loadDataOfWeather)(selectedCity);
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

/***/ "./src/UtilsForWorkWithAPI/utils.ts":
/*!******************************************!*
  !*** ./src/UtilsForWorkWithAPI/utils.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCurrPositionUser": () => /* binding */ getCurrPositionUser,
/* harmony export */   "loadDataOfWeather": () => /* binding */ loadDataOfWeather
/* harmony export */ });
/**
 * Handles location error
 * @param browserHasGeolocation
 */
function handleLocationError(browserHasGeolocation) {
    let msg = browserHasGeolocation ?
        "Error: The Geolocation service failed"
        : "Error: Your browser doesn't support geolocation.";
    return msg;
}
/**
 * Gets current position user
 * @param [tempElem]
 * @param [descTempElem]
 */
function getCurrPositionUser(tempElem = document.querySelector('.temp'), descTempElem = document.querySelector('.additionForTemp')) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${pos.lat}&lon=${pos.lng}&units=metric&appid=e7aadd779ff9063f45cbf092bdfd1636`)
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
                tempElem.innerHTML = `<p><b>${temp}</b> C</p>`;
                let desc = weather.weather[0].description.split(' ')
                    .map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');
                descTempElem.innerHTML = `<p>${desc}</p>`;
                let icon = weather.weather[0].icon;
                loadIconOfWeather(icon);
                // city = weather.name;
            });
        }, () => {
            console.error(handleLocationError(true));
        });
    }
    else {
        console.error(handleLocationError(false));
    }
}
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
 * @param [iconWrapper]
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
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _components_modalComponent_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/modalComponent.class */ "./src/components/modalComponent.class.ts");
/* harmony import */ var _Components_Select_componentSelect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components/Select/componentSelect */ "./src/Components/Select/componentSelect.ts");
/* harmony import */ var _UtilsForWorkWithAPI_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UtilsForWorkWithAPI/utils */ "./src/UtilsForWorkWithAPI/utils.ts");




let city;
document.addEventListener('DOMContentLoaded', () => {
    customElements.define('component-select', _Components_Select_componentSelect__WEBPACK_IMPORTED_MODULE_2__.default);
    // Обьявление компонента модалки
    customElements.define('modal-component', _components_modalComponent_class__WEBPACK_IMPORTED_MODULE_1__.ModalComponent);
    (0,_UtilsForWorkWithAPI_utils__WEBPACK_IMPORTED_MODULE_3__.getCurrPositionUser)();
    // Запись последнего выбранного города в Local Storage
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('city', city);
    });
});


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
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=main.js.map