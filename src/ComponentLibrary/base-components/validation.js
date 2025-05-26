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
        this.unhighlightAssociatedElement();
        this.classList.add('f-hidden');
    }

    setHighlightQuerySelector(selector) {
        this.highlightQuerySelector = selector;
    }

    highlightAssociatedElement() {
        if(this.highlightQuerySelector) {
            return document.querySelector(this.highlightQuerySelector)
                .classList.add('f-error');
        }
        if(this.for) {
            return document.querySelector(`#${this.for}`)
                .classList.add('f-error');
        }
         return this.previousElementSibling.classList.add('f-error');
    }

    unhighlightAssociatedElement() {
        if(this.highlightQuerySelector) {
            return document.querySelector(this.highlightQuerySelector)
                .classList.remove('f-error');
        }
        if(this.for) {
            return document.querySelector(`#${this.for}`)
                .classList.remove('f-error');
        }
         return this.previousElementSibling.classList.remove('f-error');
    }
}

customElements.define('finys-validation', Validation);
export {Validation};