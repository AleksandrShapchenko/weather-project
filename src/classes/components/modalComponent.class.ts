export class ModalComponent extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        console.log('INIT', this);

        this.attachShadow({
            mode: "open"
        });

        this.shadowRoot.innerHTML = `
            <span>Data</span>
            <h2>City, Country</h2>


            <style>
                span {
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