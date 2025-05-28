class NavbarPreview extends HTMLElement {
    connectedCallback() {
        this.navbar = this.createNavbar();
        this.unattachedNavbar = this.createNavbar();
        this.init();
        this.appendChild(this.navbar);
    }

    createNavbar() {
        return document.createElement('finys-navbar');
    }

    init() {
        customElements.whenDefined('finys-code-viewer')
            .then(() => {
                this.updateCodeViewer();
            })
    }

    updateCodeViewer() {
        const codeViewer = document.querySelector('finys-code-viewer');
        codeViewer.render(this.unattachedNavbar.outerHTML);
    }
}

customElements.define('navbar-preview', NavbarPreview);
export {NavbarPreview};
