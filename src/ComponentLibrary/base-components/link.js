class Link extends HTMLAnchorElement {
    connectedCallback() {
        this.classList.add('f-link');
    }
}

customElements.define('finys-link', Link, {extends: 'a'})
export {Link};