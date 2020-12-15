import { dateService } from '../../core/services/date.service'
import { WeatherData } from '../../core/models/weatherData.interface';

let arrowIcon = require('../../../assets/arrow.png');
let pressure = require('../../../assets/pressure.png');

export class ModalComponent extends HTMLElement {
    dateService = new dateService();

    constructor() {
        super()
    }

    /**
     * parses current date,
     * returns formatted date for modal
     * @param date current date
     */
    private getFormattedDate(date: Date) {
        const monthDayOption = {
            month: 'short',
            day: 'numeric',
        }

        const monthDay = date.toLocaleString('en-US', monthDayOption);

        let hours = date.getHours();
        let minutes: String = new String(date.getMinutes());
        let ampm = hours >= 12 ? 'pm' : 'am';

        hours = hours % 12;
        hours = hours ? hours : 12;

        minutes = Number.parseInt(minutes.toString()) < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutes} ${ampm}, ${monthDay}`;
    }

    /**
     * Appends li element to
     * @param ul 
     * @param text 
     * @param [imgURL] 
     * @param [rotate] 
     */
    private appendLiElementTo(ul: HTMLUListElement, text: string, imgURL?: string, rotate?: boolean) {
        let img = document.createElement('img');
        let { wind } = JSON.parse(window.sessionStorage.getItem('weather'));

        if (imgURL) {
            img.style.width = "15%";
            img.src = imgURL;

            if (rotate) {
                img.style.width = "15px"
                img.style.height = "15px"
                img.style.transform = `rotate(${wind.deg}deg)`;
            }
        }

        let li = document.createElement('li');

        if (imgURL) {
            li.append(img);

            let span = document.createElement('span');
            span.innerHTML = text;

            li.append(span);
        } else {
            li.innerHTML = text;
        }

        ul.append(li);
    }

    /**
     * Chooses direction of wind
     * @param deg 
     * @returns direction of wind 
     */
    private chooseDirectionOfWind(deg: number): string {
        let direction = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];

        if (deg >= 180) {
            deg = deg - 180;
        } else {
            deg = deg + 180;
        }

        let w = Math.round(deg / 45);

        return direction[w];
    }

    connectedCallback() {
        const weather: WeatherData = JSON.parse(window.sessionStorage.getItem('weather'));
        const iconUrl: string = window.sessionStorage.getItem('weather-icon');
        const date = this.getFormattedDate(this.dateService.getCurrDate(weather?.dt));

        this.attachShadow({
            mode: "open"
        });

        let template: HTMLTemplateElement = document.querySelector<HTMLTemplateElement>('#modalWindow');
        let clonedTemplateContent = template.content.cloneNode(true);
        this.shadowRoot.append(clonedTemplateContent);

        let time: HTMLDivElement = this.shadowRoot.querySelector('.time');
        time.innerHTML = `<time>${date}</time>`;

        let loc: HTMLDivElement = this.shadowRoot.querySelector('.location');
        loc.innerHTML = `<b>${weather?.name}, ${weather?.sys.country}</b>`;

        let img = document.createElement('img');
        this.shadowRoot.querySelector('.icon-wrapper').append(img);
        img.alt = "weather icon";
        img.style.width = "50px";
        img.style.height = "50px";
        img.src = iconUrl;

        let temp = Math.round(<number>weather?.main.temp);
        this.shadowRoot.querySelector('.temp').innerHTML = `<p><b>${temp}&deg</b> C</p>`;

        this.shadowRoot.querySelector('.description')
            .innerHTML = `<b>Feels like ${Math.round(weather?.main.feels_like)}&deg
             C. ${weather?.weather[0].main}. ${weather?.weather[0].description}</b>`;

        let { rain, snow, wind, main, visibility } = weather;

        let details: HTMLUListElement = this.shadowRoot.querySelector<HTMLUListElement>('.details-list');

        if (rain) {
            this.appendLiElementTo(details, <string>rain["1h"] + 'mm/h', iconUrl);
        } else if (snow) {
            this.appendLiElementTo(details, <string>snow["1h"] + 'mm/h', iconUrl);
        }

        this.appendLiElementTo(details, <string>wind.speed +
            ` m/s ${this.chooseDirectionOfWind(wind.deg)}`,
            arrowIcon.default, true);
        this.appendLiElementTo(details, <string>main.pressure + ' hPa', pressure.default);
        this.appendLiElementTo(details, 'Humidity: ' + <string>main.humidity + '%');
        this.appendLiElementTo(details, 'Dew point: ' + new String(Math.round(<number>main.temp)) +
            '&deg C');
        this.appendLiElementTo(details, 'Visibility: ' + new String(<number>visibility / 1000) + 'km');

        new Promise((resolve, reject) => {
            setTimeout(() => {
                this.style.opacity = '1';
                resolve('done!')
            }, 10);
        })
    }

    disconnectedCallback() { }

    static get observedAttributes() {
        return [''];
    }

    attributeChangedCallback(name: string, prev: string, curr: string) {
    }
}