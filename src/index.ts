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

            let desc = weather.weather[0].main;
            descTempElem.innerHTML = `<p>${desc}</p>`

            /* Надо что-то решить с иконками */
        })
}