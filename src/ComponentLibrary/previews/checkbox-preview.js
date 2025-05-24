class CheckboxPreview extends HTMLElement {

    constructor(){
        super();
        this.vm = kendo.observable({
            basicDropdownValue: null,
            listData: new kendo.data.DataSource({
                data: [
                  {
                    id: 1,
                    name: "test1",
                  },
                  {
                    id: 2,
                    name: "test2",
                  },
                  {
                    id: 3,
                    name: "test3",
                  },
                ],
            }),
        });
    }

    connectedCallback() {
        this.checkbox = this.createCheckbox();
        this.unattachedCheckbox = this.createCheckbox();
        this.init();
        this.appendChild(this.checkbox);
        this.render();
    }

    createCheckbox() {
        return document.createElement('input', { is: "finys-checkbox" });
    }

    render(checkbox) {
        kendo.bind($(checkbox), this.vm);
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
