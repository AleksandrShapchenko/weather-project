import './style.scss';
import { ModalComponent } from './classes/components/modalComponent.class';

let selection: HTMLSelectElement;
let city: string;

document.addEventListener('DOMContentLoaded', () => {
    // Обьявление компонента модалки
    customElements.define('modal-component', ModalComponent);

    // Определяем текущию локацию посетителя (Нужно что-то сделать с ": any -> : Position")
    getCurrPositionUser();

    selection = document.querySelector('#city');

    city = selection.options[selection.selectedIndex].text;

    // Это выглядит больше как костыль, надо что-то придумать для подтягивания погоды
    // при первой загрузки
    loadDataOfWeather(city);

    // Следим за изменениями тега Select
    selection.addEventListener('change', (e) => {
        let cityOption: any = e.target;
        city = cityOption.options[cityOption.selectedIndex].text;

        loadDataOfWeather(city);
    });

    // Запись последнего выбранного города в Local Storage
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('city', city);
    })
})


/**
 * Handles location error
 * @param browserHasGeolocation 
 */
function handleLocationError(browserHasGeolocation: boolean): string {
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
function getCurrPositionUser(tempElem = document.querySelector('.temp'),
    descTempElem = document.querySelector('.additionForTemp')) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position: any) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${pos.lat}&lon=${pos.lng}&units=metric&appid=e7aadd779ff9063f45cbf092bdfd1636`)
                    .then((response) => response.json())
                    .then((weather) => {
                        const optionElem = document.createElement('option');
                        optionElem.value = weather.name;
                        optionElem.innerHTML = weather.name;
                        optionElem.selected = true;

                        [].forEach.call(selection, (item: HTMLOptionElement) => {
                            item.selected = false;
                        })

                        selection[0].before(optionElem);

                        let temp = Math.round(weather.main.temp);
                        tempElem.innerHTML = `<p><b>${temp}</b> C</p>`;

                        let desc = weather.weather[0].description.split(' ')
                            .map((word: string) => word[0].toUpperCase() + word.substring(1)).join(' ');
                        descTempElem.innerHTML = `<p>${desc}</p>`;

                        let icon = weather.weather[0].icon;
                        loadIconOfWeather(icon);

                        city = weather.name;
                    })
            },
            () => {
                console.error(handleLocationError(true))
            }
        );
    } else {
        console.error(handleLocationError(false))
    }
}

/**
 * Loads data of weather by selected city
 * @param city 
 * @param [tempElem] 
 * @param [descTempElem] 
 */
function loadDataOfWeather(city: string,
    tempElem = document.querySelector('.temp'),
    descTempElem = document.querySelector('.additionForTemp')): void {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e7aadd779ff9063f45cbf092bdfd1636`)
        .then((res) => res.json())
        .then((weather) => {
            let temp = Math.round(weather.main.temp);
            tempElem.innerHTML = `<p><b>${temp}</b> C</p>`;

            let desc = weather.weather[0].description.split(' ')
                .map((word: string) => word[0].toUpperCase() + word.substring(1)).join(' ');
            descTempElem.innerHTML = `<p>${desc}</p>`;

            let icon = weather.weather[0].icon;
            loadIconOfWeather(icon);
        })
}


/**
 * loads icon 
 * @param icon 
 * @param [iconWrapper]
 */
function loadIconOfWeather(icon: string,
    iconWrapper = document.querySelector('.icon-wrapper')): void {
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
            } else {
                let img = iconWrapper.querySelector('img');
                img.src = URL.createObjectURL(icon);
            }

        })
}