class Toggle extends HTMLInputElement {
    constructor() {
        super();
        this.vm = window[this.getAttribute('viewModel')] || kendo.observable({
            isEnabled: true,
            isChecked: false,
        })
    }

    connectedCallback() {
        this.classList.add(
            'f-toggle-switch',
            'f-toggle-small'
        );
        this.setAttribute('data-role', 'switch');
        this.setAttribute('data-bind', 'checked: isChecked, events: {change: onChange}');
    }
}

customElements.define('finys-toggle', Toggle, {extends: 'input'})
export {Toggle};