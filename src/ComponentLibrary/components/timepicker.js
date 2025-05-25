class Timepicker extends HTMLInputElement {
    connectedCallback() {
        this.classList.add('f-timepicker');
        this.setAttribute('data-role', 'timepicker');
        this.setAttribute('data-component-type', 'modern');
        this.setAttribute('data-messages', `{set: 'Apply'}`)
    }
}

customElements.define('finys-timepicker', Timepicker, {extends: 'input'})
export {Timepicker};