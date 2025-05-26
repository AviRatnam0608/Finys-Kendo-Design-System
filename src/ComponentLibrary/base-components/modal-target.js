class ModalTarget extends HTMLDivElement {
    connectedCallback() {
        const size = this.getAttribute('size') || 'large'
        this.classList.add('f-modal', `f-modal-${size}`);
    }
}

customElements.define('finys-modal-target', ModalTarget, {extends: 'div'})
export {ModalTarget};