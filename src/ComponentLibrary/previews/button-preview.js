class ButtonPreview extends HTMLElement {
    connectedCallback() {
        this.button = this.createButton();
        this.unattachedButton = this.createButton();
        this.unattachedButton.setAttribute('data-bind', "click: onClick")
        this.setText('Action');
        this.appendChild(this.button);
        customElements.whenDefined('finys-code-viewer')
            .then(() => {
                this.setButtonSize('medium');
                this.setButtonColor('primary')
            })
    }

    createButton() {
        return document.createElement('button', {
            is: 'finys-button'
        });
    }

    setText(text) {
        this.button.textContent = text;
        this.unattachedButton.textContent = text;
    }

    setButtonSize(state) {
        ['f-button-large', 'f-button-medium', 'f-button-small'].forEach((item) => {
            this.button.classList.remove(item);
            this.unattachedButton.classList.remove(item);
        })
        this.button.classList.add(`f-button-${state}`);
        this.unattachedButton.classList.add(`f-button-${state}`);
        this.updateCodeViewer();

    }

    setButtonColor(state) {
        ['f-button-primary', 'f-button-secondary', 'f-button-tertiary', 'f-button-destructive'].forEach((item) => {
            this.button.classList.remove(item);
            this.unattachedButton.classList.remove(item);
        })
        this.button.classList.add(`f-button-${state}`);
        this.unattachedButton.classList.add(`f-button-${state}`);
        this.updateCodeViewer();
    }

    setIconContent(content) {
        this.button.innerHTML = `
            <i class="ph ph-plus"></i><span>${content}</span>
        `
        this.unattachedButton.innerHTML = this.button.innerHTML
        this.updateCodeViewer();
    }

    setContent(content) {
        this.button.innerHTML = content;
        this.unattachedButton.innerHTML = this.button.innerHTML
        this.updateCodeViewer();
    }

    updateCodeViewer() {
        const codeViewer = document.querySelector('finys-code-viewer');
        codeViewer.render(this.unattachedButton.outerHTML);
    }
}

customElements.define('button-preview', ButtonPreview)
export {ButtonPreview};