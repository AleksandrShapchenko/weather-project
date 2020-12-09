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
export function getCurrPositionUser(tempElem = document.querySelector('.temp'),
    descTempElem = document.querySelector('.additionForTemp')) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position: Position) => {
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
                            .map((word: string) => word[0].toUpperCase() + word.substring(1)).join(' ');
                        descTempElem.innerHTML = `<p>${desc}</p>`;

                        let icon = weather.weather[0].icon;
                        loadIconOfWeather(icon);

                        // city = weather.name;
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