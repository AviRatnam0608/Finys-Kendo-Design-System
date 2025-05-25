class Checkbox extends HTMLInputElement {
    
    connectedCallback() {
        this.setAttribute("type", "checkbox");
        this.setAttribute("data-role", "checkbox");
        this.classList.add("f-checkbox");
    }
}

customElements.define('finys-checkbox', Checkbox, {extends: 'input'})
export {Checkbox};