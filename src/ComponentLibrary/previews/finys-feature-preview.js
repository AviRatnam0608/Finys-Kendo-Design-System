

class FinysFeaturePreview extends HTMLElement {
    static observedAttributes = ['route'];

    attributeChangedCallback(name, oldValue, newValue) {
        if(name !== 'route') return;
        switch(newValue) {
            case 'buttons':
                return this.renderButtonView();
            case 'dropdowns':
                return this.renderDropdownView();
            case 'modals':
                return this.renderModalView();
            case 'forms':
                return this.renderFormsView();
            case 'navbar':
                return this.renderNavbarView();
            case 'checkbox':
                return this.renderCheckbox();
            default:
                this.innerHTML = `
                    <h1>unknown route</h1>
                `
        }
    }

    renderButtonView() {
        this.innerHTML = `
            <finys-feature-controls>
                <finys-button-controls></finys-button-controls>
            </finys-feature-controls>
            <div class="finys-feature">
                <button-preview></button-preview>
            </div>
            <finys-code-viewer></finys-code-viewer>
        `
        const toggle = document.querySelector('input.f-toggle-switch');
        kendo.bind(toggle, toggle.vm);
    }

    renderDropdownView() {
        this.innerHTML = `
            <finys-feature-controls>
                
            </finys-feature-controls>
            <div class="finys-feature">
                <dropdown-preview></dropdown-preview>
            </div>
            <finys-code-viewer></finys-code-viewer>
        `
    }

    renderNavbarView() {
        this.innerHTML = `
            <finys-feature-controls>
            </finys-feature-controls>
            <div class="finys-feature f-full-width">
                <navbar-preview></navbar-preview>
            </div>
            <finys-code-viewer></finys-code-viewer>
        `
        
    }

    renderCheckbox() {
        this.innerHTML = `
            <finys-feature-controls>
            </finys-feature-controls>
            <div class="finys-feature">
                <checkbox-preview></checkbox-preview>
            </div>
            <finys-code-viewer></finys-code-viewer>
        `
    }
}

class FinysFeatureControls extends HTMLElement {}

class FinysFeature extends HTMLElement {}

class FinysCodeViewer extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render(html) {
        const code = Prism.highlight(html || '', Prism.languages.html, 'html')
        this.innerHTML = `
            <div class="code-container">
                <div class="code-toolbar">
                    <span>HTML</span>
                    <button is="finys-code-copy-button">Copy</button>
                </div>
                <pre><code id="code-display" class="language-html">${code}</code></pre>
            </div>
        `;
        
    }

}

class FinysCodeCopyButton extends HTMLButtonElement {
    connectedCallback() {
        this.classList.add('copy-button');
        this.addEventListener('click', this.copy)
    }

    disconnectedCallback() {
        this.addEventListener('click', this.copy);
    }

    copy = () => {
        const code = document.getElementById("code-display").innerText;
        console.log('copying...', code)
        navigator.clipboard.writeText(code).then(() => {
        this.textContent = "Copied!";
        setTimeout(() => (this.textContent = "Copy"), 1500);
      });
    }
}

customElements.define('finys-code-copy-button', FinysCodeCopyButton, {extends: 'button'})
customElements.define('finys-code-viewer', FinysCodeViewer)
customElements.define('finys-feature-controls', FinysFeatureControls);
customElements.define('finys-feature-preview', FinysFeaturePreview);
customElements.define('finys-feature', FinysFeature);