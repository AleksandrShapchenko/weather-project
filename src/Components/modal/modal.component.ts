import { dateService } from '../../core/services/date.service'
import { WeatherData } from '../../core/models/weatherData.interface';

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
    getFormattedDate(date: Date) {
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

    connectedCallback() {
        const weather: WeatherData = JSON.parse(window.sessionStorage.getItem('weather'));
        const iconUrl: string = window.sessionStorage.getItem('weather-icon');
        const date = this.getFormattedDate(this.dateService.getCurrDate(weather.dt));
        const location = {
            city: weather.name,
            country: weather.sys.country
        }

        this.attachShadow({
            mode: "open"
        });

        let template: HTMLTemplateElement = document.querySelector<HTMLTemplateElement>('#modalWindow');
        let clonedTemplateContent = template.content.cloneNode(true);
        this.shadowRoot.append(clonedTemplateContent);

        let time: HTMLDivElement = this.shadowRoot.querySelector('.time');
        time.innerHTML = `<time>${date}</time>`;

        let loc: HTMLDivElement = this.shadowRoot.querySelector('.location');
        loc.innerHTML = `<b>${location.city}, ${location.country}</b>`;

        let img = document.createElement('img');
        this.shadowRoot.querySelector('.icon-wrapper').append(img);
        img.alt = "weather icon";
        img.style.width = "50px";
        img.style.height = "50px";
        img.src = iconUrl;

        let temp = Math.round(weather.main.temp);
        this.shadowRoot.querySelector('.temp').innerHTML = `<p><b>${temp}</b> &degC</p>`;

        this.shadowRoot.querySelector('.description')
            .innerHTML = `Feels like ${Math.round(weather.main.feels_like)}
             &degC. ${weather.weather[0].main}. ${weather.weather[0].description}`;
        
        let list = this.shadowRoot.querySelector('.details-list').children;
    }

    disconnectedCallback() { }

    // static get observedAttributes() {
    //     return ['color', 'type']
    // }

    // attributeChangedCallback(name, prev, curr) {
    //     console.log(name, prev, curr);
    // }
}