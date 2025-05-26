class TextBox extends HTMLInputElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.setAttribute('data-role', 'textbox');
    }
}

customElements.define('finys-text-box', TextBox, {extends: 'input'})
export {TextBox};