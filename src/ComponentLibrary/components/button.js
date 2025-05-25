class Button extends HTMLButtonElement {
    connectedCallback() {
        this.classList.add('f-button');
    }
}

customElements.define('finys-button', Button, {extends: 'button'})
export {Button};