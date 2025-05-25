
class MaskedTextBox extends HTMLInputElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.setAttribute('data-role', 'maskedtextbox');
    }
}


customElements.define('finys-masked-text-box', MaskedTextBox, {extends: 'input'})
export {MaskedTextBox};