class Validation extends HTMLElement {
    connectedCallback() {
        this.classList.add('f-validation', 'f-hidden');
        this.for = this.getAttribute('for');
        this.innerSpan = document.createElement('span');
        this.innerSpan.textContent = this.textContent;
        this.textContent = '';
        this.appendChild(this.innerSpan)
    }

    set(content) {
        this.textContent = content;
        this.show();
    }

    show() {
        this.highlightAssociatedElement();
        this.classList.remove('f-hidden');
    }

    hide() {
        this.classList.add('f-hidden');
    }

    highlightAssociatedElement() {
        if(this.for) {
            return document.querySelector(`#${this.for}`).classList.add('f-error');
        }
         return this.previousElementSibling.classList.add('f-error');
    }
}

customElements.define('finys-validation', Validation);
export {Validation};