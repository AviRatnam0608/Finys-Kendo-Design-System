class Modal {
    constructor(options = {}) {
        const template = options.content?.template?.() || ''; 
        this.setOptions({
            draggable: false,
            ...options
        });
        options.content.template = () => ([
            template,
            this.renderFooter(),
        ]
            .filter(Boolean)
            .join(''))
        this.vm = kendo.observable({
            onCancel: () => this.onCancel(),
            onApply: () => this.onApply(),
        })
    }

    onCancel() {
        this.close();
    }

    onApply() {
        console.log('testing apply')
    }

    renderFooter() {
        if(this.options?.footer) 
            return `
                <div class='f-modal-footer f-generated-template'>
                    ${this.options.footer}
                </div>
        `;
        return `
            <div class='f-modal-footer f-generated-template'>
                <button is="finys-button" data-bind="click: onCancel" class="f-button-tertiary">Cancel</button>
                <button is="finys-button" data-bind="click: onApply" class="f-button-primary">Accept</button>
            </div>
        `
    }

    create() {
        this.modalContainer = document.createElement('div', {
            is: "finys-modal-target"
        });
        this.modalContainer.setAttribute('size', this.options.size || 'medium');
        document.querySelector('body').appendChild(this.modalContainer);
        $(this.modalContainer).kendoWindow(this.options);
        $(this.modalContainer).data('kendoWindow')
            .toFront()
            .center();
        kendo.bind(this.modalContainer.querySelector('.f-modal-footer.f-generated-template'), this.vm)
            
    }

    setOptions(options) {
        this.options = options;
    }

    getKendoModal() {
        return $(this.modalContainer).data('kendoWindow');
    }

    close() {
        this.getKendoModal().close();
    }

    open() {
        const modal = this.getKendoModal();
        if(!modal) {
            this.create();
        } else {
            modal.open();
            modal.toFront().center();
        }
    }

    destroy() {
        this.getKendoModal().destroy();
    }
}

export {Modal};