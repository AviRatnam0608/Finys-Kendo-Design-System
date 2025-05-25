class Radio extends HTMLInputElement {
    connectedCallback() {
      // you can still tweak classes/attributes here
      this.classList.add("f-radiobutton", "k-radio", "k-radio-md");
      this.setAttribute("data-role", "radiobutton");
    }
}

customElements.define('finys-radiobutton', Radio, {extends: 'input'})
export {Radio};