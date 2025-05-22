class CheckboxPreview extends HTMLElement {
    connectedCallback() {
        this.checkbox = this.createCheckbox();
        this.unattachedCheckbox = this.createCheckbox();
        this.init();
        this.appendChild(this.checkbox);
    }

    createCheckbox() {
        return document.createElement('input', { is: "finys-checkbox" });
    }

    init() {
        customElements.whenDefined('finys-code-viewer')
            .then(() => {
                this.updateCodeViewer();
            })
    }

    updateCodeViewer() {
        const codeViewer = document.querySelector('finys-code-viewer');
        codeViewer.render(this.unattachedCheckbox.outerHTML);
    }
}

customElements.define('checkbox-preview', CheckboxPreview);
