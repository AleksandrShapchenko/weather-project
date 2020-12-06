import './style.scss';

document.addEventListener('DOMContentLoaded', () => {
    const selection: HTMLSelectElement = document.querySelector('#city');

    let city = selection.options[selection.selectedIndex].text;

    // Это выглядит больше как костыль, надо что-то придумать для подтягивания погоды
    // при первой загрузки
    loadDataOfWeather(city);

    // Следим за изменениями тега Select
    selection.addEventListener('change', (e) => {
        let city: any = e.target;
        city = city.options[city.selectedIndex].text;

        loadDataOfWeather(city);
    })
})

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
            console.log(weather);

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