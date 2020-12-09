import { loadDataOfWeather } from '../../UtilsForWorkWithAPI/utils';

export default class ComponentSelect extends HTMLElement {
    constructor() {
        super();
    }

    selectedIndex: number;

    connectedCallback() {
        this.attachShadow({
            mode: "open"
        });

        let template: HTMLTemplateElement = document.getElementById('dropdown');
        let content = template.content.cloneNode(true);
        this.shadowRoot.append(content);

        let option = document.querySelector('#city').children;
        
        [].forEach.call(option, (item: HTMLOptionElement, index: number): void => {
            if(item.slot == "selected") {
                this.selectedIndex = index;
            }
        })

        this.shadowRoot.querySelector('slot[name="item"]').onclick = (e: EventTarget) => {
            option[this.selectedIndex].slot = "item";
            e.target.slot = "selected";

            [].forEach.call(option, (item: HTMLOptionElement, index: number): void => {
                if (item.slot == "selected") {
                    this.selectedIndex = index;
                }
            });

            this.shadowRoot.querySelector('.dropdown-list').classList.toggle('closed');
        }

        this.shadowRoot.querySelector('slot[name="selected"]').addEventListener('slotchange', (e) => {
            let selectedCity = option[this.selectedIndex].text;

            loadDataOfWeather(selectedCity);
        })
        this.shadowRoot.querySelector('slot[name="selected"]').onclick = () => {
            this.shadowRoot.querySelector('.dropdown-list').classList.toggle('closed');
        }
    }

    disconnectedCallback() {}

    static get observedAttributes(): Array<string> {
        return [];
    }

    attributeChangedCallback(attName: string, attPreVal: string, attCurrVal: string) {}
}