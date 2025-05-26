class Tooltip extends HTMLElement {
    connectedCallback() {
        this.classList.add('f-tooltip');
    }
}

customElements.define('finys-tooltip', Tooltip)
export {Tooltip}