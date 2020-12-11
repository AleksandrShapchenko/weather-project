import './style.scss';
import { ModalComponent } from './components/modalComponent.class';
import select from './Components/Select/componentSelect';
import weatherService from './storeServices/data/weatherService';


export const weatherWork = new weatherService();
export const temperatureElem: HTMLDivElement = document.querySelector('.temp');
export const descriptionOfTemperatureElem: HTMLDivElement = document.querySelector('.additionForTemp');
export const iconWrapper: HTMLDivElement = document.querySelector('.icon-wrapper');

document.addEventListener('DOMContentLoaded', () => {
    // Обьявление компонента select
    customElements.define('component-select', select);

    // Обьявление компонента модалки
    customElements.define('modal-component', ModalComponent);

    weatherWork.getCurrentUserPosition()
        .then((response) => response.json())
        .then((weather) => {
            const optionElem = document.createElement('option');

            let selectedItem = document.querySelector('option[slot="selected"]');
            selectedItem.slot = "item";

            optionElem.slot = "selected";
            optionElem.innerHTML = weather.name;
            optionElem.title = "This is your current location";
            optionElem.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
            optionElem.id = "userCurrentPosition";

            selectedItem.before(optionElem);

            let temp = Math.round(weather.main.temp);
            temperatureElem.innerHTML = `<p><b>${temp}</b> C</p>`;

            let desc = weather.weather[0].description.split(' ')
                .map((word: string) => word[0].toUpperCase() + word.substring(1)).join(' ');
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
                    } else {
                        let img = iconWrapper.querySelector('img');
                        img.src = URL.createObjectURL(icon);
                    }
                });

            weatherWork.selectedCity = weather.name;
            weatherWork.description = desc;
            weatherWork.temperature = temp;
            weatherWork.icon = icon;
        })

    // Запись последнего выбранного города в Local Storage
    window.addEventListener('beforeunload', () => {
        weatherWork.loadCityToLocalStorage();
    })
})
