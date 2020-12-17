import { weatherReq, temperatureElem, descriptionOfTemperatureElem, iconWrapper } from '../../index';
import { ModalComponent } from '../modal/modal.component';

export class ComponentSelect extends HTMLElement {
    constructor() {
        super();
    }

    /**
     * Selected options of component select
     */
    selectedOptions = {
        previousSelectedOption: document.createElement('option'),
        currentSelectedOption: document.createElement('option')
    }

    /**
     * Deletes modal window
     */
    private deleteModalWindow() {
        return new Promise((resolve, reject) => {
            let modal: ModalComponent = document.querySelector('modal-component');

            if (modal) {
                modal.style.opacity = "0";
                modal.style.transition = "opacity 1s";

                setTimeout(() => {
                    resolve(modal); // complete Promise
                }, 1000);
            }
        })
    }

    /**
     * Changes selected slot on
     * @param slotName 
     * @param selectedSlot 
     */
    private changeSelectedSlotOn(
        slotName: string,
        selectedSlot: HTMLSlotElement) {
        this.selectedOptions.previousSelectedOption = this.selectedOptions.currentSelectedOption;
        this.selectedOptions.currentSelectedOption.slot = slotName;

        selectedSlot.slot = "selected";
        this.selectedOptions.currentSelectedOption = document.querySelector<HTMLOptionElement>('option[slot="selected"]');
    }

    /**
     * Toggles list of options
     */
    private toggleListOfOptions(): void {
        this.shadowRoot.querySelector('.dropdown-list').classList.toggle('closed');
    }

    connectedCallback() {
        this.attachShadow({
            mode: "open"
        });

        const template: HTMLTemplateElement = document.querySelector<HTMLTemplateElement>('#dropdown');
        const content = template.content.cloneNode(true);
        this.shadowRoot.append(content);

        this.shadowRoot.querySelector<HTMLSlotElement>('slot[name="last-item"]')
            .addEventListener('click', (e: MouseEvent) => {
                this.changeSelectedSlotOn("last-item", e.target as HTMLSlotElement);

                this.selectedOptions.currentSelectedOption.disabled = true;

                this.toggleListOfOptions();
            })

        this.shadowRoot.querySelector<HTMLSlotElement>('slot[name="item"]')
            .addEventListener('click', (e: MouseEvent) => {
                this.changeSelectedSlotOn("item", e.target as HTMLSlotElement);

                this.selectedOptions.currentSelectedOption.disabled = true;

                this.toggleListOfOptions();
            });

        this.shadowRoot.querySelector('slot[name="selected"]')
            .addEventListener('slotchange', (e) => {
                let selectedCity = this.selectedOptions.currentSelectedOption.text;

                if (selectedCity) {
                    weatherReq.getWeatherByCityName(selectedCity)
                        .then((response) => response.json())
                        .then((weather) => {

                            this.deleteModalWindow().then((modal: ModalComponent) => {
                                modal.remove(); // remove from DOM
                                modal = null; // remove link on the object of Modal Window
                            });

                            let temp = Math.round(weather.main.temp);
                            temperatureElem.innerHTML = `<p><b>${temp}&deg</b> C</p>`;

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

                            window.sessionStorage.setItem('weather-icon', URL.createObjectURL(icon));
                        }).then(() => {
                            // create new Modal Window for new information of Weather
                            let newModal: ModalComponent = new ModalComponent();
                            document.querySelector('.content-wrapper').after(newModal);
                        })
                }

                this.holdSelect().then((re: boolean) => {
                    this.selectedOptions.currentSelectedOption.disabled = re;
                })
            });

        this.shadowRoot.querySelector<HTMLSlotElement>('slot[name="selected"]')
            .addEventListener('click', () => {
                this.toggleListOfOptions();
            });
    }

    private holdSelect() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(false);
            }, 1500)
        })
    }

    disconnectedCallback() { }

    static get observedAttributes(): Array<string> {
        return [];
    }

    attributeChangedCallback(attName: string, attPreVal: string, attCurrVal: string) {
    }
}