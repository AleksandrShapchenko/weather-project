export class ModalComponent extends HTMLElement {

    constructor() {
        super()
    }

    getCurrDate() {
        return new Date();
    }

    getFormattedDate(date: Date) {
        const monthDayOption = {
            month: 'short',
            day: 'numeric',
        }

        const hoursMinutesOption = {
            hour: 'numeric',
            minute: 'numeric',
        }

        const monthDay = date.toLocaleString('en', monthDayOption);
        const hoursMinutes = date.toLocaleString('en', hoursMinutesOption)
        .slice(0, 4) + date.toLocaleString('en', hoursMinutesOption)
        .slice(5).toLowerCase();
        const formattedDate = `${hoursMinutes}, ${monthDay}`;

        return formattedDate;
    }

    connectedCallback() {
        let date = this.getFormattedDate(this.getCurrDate());
        console.log('INIT', this);
        
        this.attachShadow({
            mode: "open"
        });

        this.shadowRoot.innerHTML = `
            <p><time>${date}</time></p>
            <h2>City, Country</h2>


            <style>
                p {
                    color: orange;
                }

                :host {
                    display: inline-block;
                    padding: 10px;
                    background-color: aliceblue;
                    color: black;
                }
            </style>
        `

    }

    disconnectedCallback() {

    }

    // static get observedAttributes() {
    //     return ['color', 'type']
    // }

    // attributeChangedCallback(name, prev, curr) {
    //     console.log(name, prev, curr);
    // }
}