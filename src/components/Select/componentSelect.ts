import { weatherReq, temperatureElem, descriptionOfTemperatureElem, iconWrapper } from '../../index';

export class ComponentSelect extends HTMLElement {
    constructor() {
        super();
    }

    selectedIndex: number;

    /**
     * Sets selected index
     * @param option 
     */
    private setSelectedIndex(option: HTMLCollection): void {
        [].forEach.call(option, (item: HTMLOptionElement, index: number): void => {
            if (item.slot == "selected") {
                this.selectedIndex = index;
            }
        })
    }

    connectedCallback() {
        this.attachShadow({
            mode: "open"
        });

        const template: HTMLTemplateElement = document.querySelector<HTMLTemplateElement>('#dropdown');
        const content = template.content.cloneNode(true);
        this.shadowRoot.append(content);

        const option = document.querySelector('#city').children;
        
        this.setSelectedIndex(option);

        this.shadowRoot.querySelector<HTMLSlotElement>('slot[name="last-item"]')
            .onclick = (e: MouseEvent) => {
                option[this.selectedIndex].slot = "last-item";

                let selectedSlot = e.target as HTMLSlotElement;
                selectedSlot.slot = "selected";

                this.setSelectedIndex(option);

                this.shadowRoot.querySelector('.dropdown-list').classList.toggle('closed');
        }

        this.shadowRoot.querySelector<HTMLSlotElement>('slot[name="item"]')
            .onclick = (e: MouseEvent) => {
                option[this.selectedIndex].slot = "item";

                let selectedSlot = e.target as HTMLSlotElement;
                selectedSlot.slot = "selected";

                this.setSelectedIndex(option);

                this.shadowRoot.querySelector('.dropdown-list').classList.toggle('closed');
        }

        this.shadowRoot.querySelector('slot[name="selected"]')
            .addEventListener('slotchange', (e) => {
            let selectedCity = (option[this.selectedIndex] as HTMLOptionElement).text;

            weatherReq.getWeatherByCityName(selectedCity)
                .then((response) => response.json())
                .then((weather) => {
                    let temp = Math.round(weather.main.temp);
                    temperatureElem.innerHTML = `<p><b>${temp}</b> C</p>`;

                    let desc = weather.weather[0].description.split(' ')
                        .map((word: string) => word[0].toUpperCase() + word.substring(1)).join(' ');
                    descriptionOfTemperatureElem.innerHTML = `<p>${desc}</p>`;
                       
                    /* Set current data of weather into Session Storage */
                    window.sessionStorage.setItem('weather', JSON.stringify(weather));

                    return weather.weather[0].icon;
                }).then((icon: string) => {
                    return weatherReq.getIconOfWeather(icon)
                })
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
            })
        
        this.shadowRoot.querySelector<HTMLSlotElement>('slot[name="selected"]')
            .onclick = () => {
                this.shadowRoot.querySelector('.dropdown-list').classList.toggle('closed');
        }
    }

    disconnectedCallback() {}

    static get observedAttributes(): Array<string> {
        return [];
    }

    attributeChangedCallback(attName: string, attPreVal: string, attCurrVal: string) {
    }
}