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

    private appendLiElementTo(ul: HTMLUListElement, text: string, imgURL?: string) {
        let img = document.createElement('img');

        if(imgURL) {
            img.style.display = "inline-block";
            img.style.width = "25px";
            img.style.height = "25px";
            img.src = imgURL;
        }

        let li = document.createElement('li');
        
        if(imgURL) {
            li.append(img);

            let span = document.createElement('span');
            span.innerHTML = text;
            li.append(span);
        } else {
            li.innerHTML = text;
        }

        ul.append(li);
    }

    connectedCallback() {
        const weather: WeatherData = JSON.parse(window.sessionStorage.getItem('weather'));
        const iconUrl: string = window.sessionStorage.getItem('weather-icon');
        const date = this.getFormattedDate(this.dateService.getCurrDate(weather?.dt));
        const location = {
            city: weather?.name,
            country: weather?.sys.country
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

        let temp = Math.round(<number>weather?.main.temp);
        this.shadowRoot.querySelector('.temp').innerHTML = `<p><b>${temp}&deg</b> C</p>`;

        this.shadowRoot.querySelector('.description')
            .innerHTML = `Feels like ${Math.round(weather?.main.feels_like)}
             &degC. ${weather?.weather[0].main}. ${weather?.weather[0].description}`;
        
        let { rain, snow, wind, main, visibility } = weather;

        let details: HTMLUListElement = this.shadowRoot.querySelector<HTMLUListElement>('.details-list');

        if (rain) {
            this.appendLiElementTo(details, <string>rain["1h"] + 'mm/h', iconUrl);
        } else if (snow) {
            this.appendLiElementTo(details, <string>snow["1h"] + 'mm/h', iconUrl);
        } 

        this.appendLiElementTo(details, <string>wind.speed + 'm/s ESE');
        this.appendLiElementTo(details, <string>main.pressure + 'hPa');
        this.appendLiElementTo(details, 'Humidity: ' + <string>main.humidity + '%');
        this.appendLiElementTo(details, 'Dew point: ' + <string>main.temp + '&deg C');
        this.appendLiElementTo(details, 'Visibility: ' + new String(<number>visibility / 1000) + 'km');
    }

    disconnectedCallback() { }

    // static get observedAttributes() {
    //     return ['color', 'type']
    // }

    // attributeChangedCallback(name, prev, curr) {
    //     console.log(name, prev, curr);
    // }
}