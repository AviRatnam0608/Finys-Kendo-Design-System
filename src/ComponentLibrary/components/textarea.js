class Textarea extends HTMLElement {
    connectedCallback() {
        this.classList.add('f-textarea');
        this.label = document.createElement('label');
        this.label.textContent = this.getAttribute('label');
        this.appendChild(this.label);
        if(this.getAttribute('readonly') === "" || this.getAttribute('readonly')) {
            this.readonlyContent = document.createElement('span')
            this.readonlyContent.classList.add('f-readonly')
            this.readonlyContent.setAttribute('data-bind', 'text: textareaValue');
            return this.appendChild(this.readonlyContent);
        }
        this.textarea = document.createElement('textarea');
        if(this.getAttribute('data-bind')) {
            this.textarea.setAttribute('data-bind', this.getAttribute('data-bind'));
        }
        this.appendChild(this.textarea);
        this.appendChild(document.createElement('finys-validation'));
    }
}

customElements.define('finys-textarea', Textarea)
export {Textarea};