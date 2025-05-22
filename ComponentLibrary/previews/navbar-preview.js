class NavbarPreview extends HTMLElement {
    connectedCallback() {
        this.navbar = this.createNavbar();
        this.unattachedNavbar = this.createNavbar();
        this.init();
        this.appendChild(this.navbar);
    }

    createNavbar() {
        return document.createElement('f-nav-bar');
    }

    init() {
        this.navbar.setAttribute('user-name', 'Lebron James');
        this.navbar.setAttribute('user-img', 'https://randomuser.me/api/portraits/men/36.jpg');
        this.unattachedNavbar.setAttribute('user-name', 'Lebron James');
        this.unattachedNavbar.setAttribute('user-img', 'https://randomuser.me/api/portraits/men/36.jpg');
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
