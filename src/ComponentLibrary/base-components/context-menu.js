class ContextMenu extends HTMLButtonElement {
    connectedCallback() {
        this.classList.add('f-context-menu')
        this.setAttribute('data-role', 'dropdownbutton');
        this.innerHTML = `
            <i class="ph ph-dots-three-vertical"></i>
        `
    }
}

customElements.define('finys-context-menu', ContextMenu, {extends: 'button'})
export {ContextMenu};