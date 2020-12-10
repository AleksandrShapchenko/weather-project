import { Position } from '../storeServices/models/position.interface';
// import { city as cityService } from '../index';

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
export function getCurrPositionUser(): Promise<Response> {
    let fetchedWeather: Promise<Response>;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos: Position) => {
                const currpos = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                };

                try {
                    fetchedWeather = fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${currpos.lat}&lon=${currpos.lng}&units=metric&appid=e7aadd779ff9063f45cbf092bdfd1636`);
                } catch (err) {
                    fetchedWeather = null;
                    console.log('Error occured with fetch data of weather -> ' + err);
                }
            },
            () => {
                console.error(handleLocationError(true))
            }
        );
    } else {
        console.error(handleLocationError(false))
    }

    return fetchedWeather;
}

/**
 * Loads data of weather by selected city
 * @param city 
 * @param [tempElem] 
 * @param [descTempElem] 
 */
export function loadDataOfWeather(city: string,
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

            // cityService.selectedCity = weather.name;
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