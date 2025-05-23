class FinysButton extends HTMLButtonElement {
    connectedCallback() {
        this.classList.add('f-button');
    }
}

class FinysTimePicker extends HTMLInputElement {
    connectedCallback() {
      this.classList.add('f-timepicker');
      this.setAttribute('data-role', 'timepicker');
      this.setAttribute('data-component-type', 'modern');
      this.setAttribute('data-messages', `{set: 'Apply'}`)
    }
  }

class FinysDropDownList extends HTMLInputElement {
    connectedCallback() {
        this.classList.add('f-dropdown');
        this.setAttribute('data-role', 'dropdownlist');
        this.setAttribute('data-text-field', this.getAttribute('data-text-field') || 'name');
        this.setAttribute('data-value-field', this.getAttribute('data-value-field') || 'id');
        this.setAttribute('data-height', this.getAttribute('data-height') || '300');
        this.setAttribute('data-option-label', this.getAttribute('data-option-label') || 'Select an option');
    }
}

class FinysDetailedDropDownList extends HTMLInputElement {
    connectedCallback() {
        this.classList.add('f-dropdown');
        this.classList.add('f-templated-dropdown');
        this.setAttribute('data-role', 'dropdownlist');
        this.setAttribute('data-text-field', this.getAttribute('data-text-field') || 'name');
        this.setAttribute('data-value-field', this.getAttribute('data-value-field') || 'id');
        this.setAttribute('data-height', this.getAttribute('data-height') || '300');
        this.setAttribute('data-text-field', this.getAttribute('data-text-field') || "textField");
        this.setAttribute('data-value-field', this.getAttribute('data-value-field') || "valueField");
        this.setAttribute('data-detail-left', this.getAttribute('data-detail-left') || "detailLeft");
        this.setAttribute('data-detail-right', this.getAttribute('data-detail-right') || "detailRight");
        this.setAttribute('data-detail-bottom', this.getAttribute('data-detail-bottom') || "detailBottom");
        this.setAttribute('data-option-label', this.getAttribute('data-option-label') || this.getOptionLabel());
        this.setAttribute('data-option-label-template', this.getAttribute('data-option-label-template') || "option-template");
        this.setAttribute('data-template', this.getAttribute('data-template') || "item-template");
        this.setAttribute('data-value-template', this.getAttribute('data-value-template') || "value-template");
        if(!document.getElementById(this.getAttribute('data-template'))) {
            document.querySelector('body').appendChild(this.getItemTemplate())
        }
        if(!document.getElementById(this.getAttribute('data-value-template'))) {
            document.querySelector('body').appendChild(this.getValueTemplate())
        }
        if(!document.getElementById(this.getAttribute('data-option-label-template'))) {
            document.querySelector('body').appendChild(this.getOptionTemplate())
        }
    }

    getOptionLabel() {
        `{ 
            ${this.getAttribute('data-text-field')}: null, 
            ${this.getAttribute('data-value-field')}: null, 
            ${this.getAttribute('data-detail-right')}: null, 
            ${this.getAttribute('data-detail-left')}: null, 
            ${this.getAttribute('data-detail-bottom')}: null 
        }`;
    }

    getValueTemplate() {
        const script = document.createElement('script');
        script.setAttribute('id', this.getAttribute('data-value-template'));
        script.setAttribute('type', 'text/x-kendo-template');
        script.innerHTML = `
            <div class="f-templated-item-dropdown-container">
                <div>#: ${this.getAttribute('data-value-field')} # - #: ${this.getAttribute('data-text-field')} #</div>
                <div>#: ${this.getAttribute('data-detail-left')} # - #: ${this.getAttribute('data-detail-right')} #</div>
                <div>#: ${this.getAttribute('data-detail-bottom')} #</div>
            </div>
        `
        return script
    }

    getOptionTemplate() {
        const script = document.createElement('script');
        script.setAttribute('id', this.getAttribute('data-option-label-template'));
        script.setAttribute('type', 'text/x-kendo-template');
        script.innerHTML = `
            <div class="f-templated-item-dropdown-container">
                <div style="font-size: 0.656rem">&nbsp;</div>
                <div style="font-size: 1em">Select an option...</div>
                <div>&nbsp;</div>
            </div>
        `
        return script;
    }

    getItemTemplate() {
        const script = document.createElement('script');
        script.setAttribute('id', this.getAttribute('data-template'));
        script.setAttribute('type', 'text/x-kendo-template');
        script.innerHTML = `
            <div class="f-templated-item-dropdown-container">
                <div>#: ${this.getAttribute('data-value-field')} # - #: ${this.getAttribute('data-text-field')} #</div>
                <div>#: ${this.getAttribute('data-detail-left')} # - #: ${this.getAttribute('data-detail-right')} #</div>
                <div>#: ${this.getAttribute('data-detail-bottom')} #</div>
            </div>
        `
        return script;
    }
} 

class FinysGrid extends HTMLDivElement {
    // do not include events: {detailInit}, this causes misalignment of columns
    connectedCallback() {
        this.setAttribute('data-role', 'grid');
        this.setAttribute('data-toolbar', this.getAttribute('data-toolbar') || "[{template: kendo.template($('#table-header').html())}]")
        this.setAttribute('data-scrollable', this.getAttribute('data-scrollable') || 'false');
        if(!document.getElementById('table-header')) {
            document.querySelector('body').appendChild(this.getHeaderTemplate())
        }
    }

    getHeaderTemplate() {
        const script = document.createElement('script');
        script.setAttribute('id', 'table-header');
        script.setAttribute('type', 'text/x-kendo-template');
        script.innerHTML = `
            <header class="f-table-header f-generated-template">
                <div class="f-table-header-group">
                    <span class='f-table-label'>${this.getAttribute('data-finys-label')}</span>
                    <span class="f-tag" data-bind="text: ${this.getAttribute('data-finys-tag')}"></span>
                </div>
                <div class="f-table-header-group">
                    ${this.getAttribute('data-finys-header-buttons') || ''}
                </div>
            </header>
        `
        return script;
    }
}

class FinysNestedGrid extends FinysGrid {
    // nested grids inside of nested grids must have a different dataSources
    // they must also define events: { detailInit: someInitFunc }
    connectedCallback() {
        if(!this._dataDetailTemplateId) {
            this._dataDetailTemplateId = `${crypto.randomUUID()}-detail-template`
        }
        this.setAttribute('data-role', 'grid');
        this.setAttribute('data-toolbar', this.getAttribute('data-toolbar') || "[{template: kendo.template($('#table-header').html())}]")
        this.setAttribute('data-scrollable', this.getAttribute('data-scrollable') || 'false');
        this.setAttribute('data-detail-template', this.getAttribute('data-detail-template') || this._dataDetailTemplateId);
        this.templateHTML = this.innerHTML;
        this.innerHTML = '';
        if(!document.getElementById(this.getAttribute('data-detail-template'))) {
            document.querySelector('body').appendChild(this.getDetailTemplate())
        }
        if(!document.getElementById('table-header')) {
            document.querySelector('body').appendChild(this.getHeaderTemplate())
        }
    }

    getDetailTemplate() {
        const script = document.createElement('script');
        script.setAttribute('id', this.getAttribute('data-detail-template'));
        script.setAttribute('type', 'text/x-kendo-template');
        script.innerHTML = `
            <div class="f-inner-table-container f-generated-template">
                ${this.templateHTML}
            </div>
        `
        return script;
    }
}

class FinysToggle extends HTMLInputElement {
    constructor() {
        super();
        this.vm = window[this.getAttribute('viewModel')] || kendo.observable({
            isEnabled: true,
            isChecked: false,
        })
    }

    connectedCallback() {
        this.classList.add(
            'f-toggle-switch',
            'f-toggle-small'
        );
        this.setAttribute('data-role', 'switch');
        this.setAttribute('data-bind', 'checked: isChecked, events: {change: onChange}');
    }
}

class FinysContextMenu extends HTMLButtonElement {
    connectedCallback() {
        this.classList.add('f-context-menu')
        this.setAttribute('data-role', 'dropdownbutton');
        this.innerHTML = `
            <i class="ph ph-dots-three-vertical"></i>
        `
    }
}

class FinysTextBox extends HTMLInputElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.setAttribute('data-role', 'textbox');
    }
}
class FinysMaskedTextBox extends HTMLInputElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.setAttribute('data-role', 'maskedtextbox');
    }
}


class FinysModalElement extends HTMLDivElement {
    connectedCallback() {
        const size = this.getAttribute('size') || 'large'
        this.classList.add('f-modal', `f-modal-${size}`);
    }
}

class FinysModal {
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
        if(!this.getKendoModal()) {
            this.create();
        } else {
            this.getKendoModal().open();
        }
    }

    destroy() {
        this.getKendoModal().destroy();
    }
}

class FinysValidation extends HTMLElement {
    connectedCallback() {
        this.classList.add('f-validation', 'f-hidden');
        this.for = this.getAttribute('for');
        this.innerSpan = document.createElement('span');
        this.innerSpan.textContent = this.textContent;
        this.textContent = '';
        this.appendChild(this.innerSpan)
    }
    show() {
        this.highlightAssociatedElement();
        this.classList.remove('f-hidden');
    }

    hide() {
        this.classList.add('f-hidden');
    }

    highlightAssociatedElement() {
        if(this.for) {
            return document.querySelector(`#${this.for}`).classList.add('f-error');
        }
         return this.previousElementSibling.classList.add('f-error');
    }
}

class FinysCheckbox extends HTMLInputElement {
    
    connectedCallback() {
        this.setAttribute("type", "checkbox");
        this.setAttribute("data-role", "checkbox");
        this.classList.add("f-checkbox");
    }
}

class FinysRadioButton extends HTMLInputElement {    
    connectedCallback() {
        this.setAttribute("type", "radio");
        this.setAttribute("data-role", "radio");
        this.classList.add("k-radio");
        this.classList.add("k-radio-md");
        this.classList.add("f-radiobutton");
    }
}

class FinysTooltip extends HTMLElement {
    connectedCallback() {
        this.classList.add('f-tooltip');
    }
}


customElements.define('finys-validation', FinysValidation)
customElements.define('finys-tooltip', FinysTooltip)
customElements.define('finys-modal-target', FinysModalElement, {extends: 'div'})
customElements.define('finys-context-menu', FinysContextMenu, {extends: 'button'})
customElements.define('finys-toggle', FinysToggle, {extends: 'input'})
customElements.define('finys-timepicker', FinysTimePicker, {extends: 'input'})
customElements.define('finys-dropdownlist', FinysDropDownList, {extends: 'input'})
customElements.define('finys-detailed-dropdownlist', FinysDetailedDropDownList, {extends: 'input'})
customElements.define('finys-nested-grid', FinysNestedGrid, {extends:  'div'})
customElements.define('finys-grid', FinysGrid, {extends:  'div'})
customElements.define('finys-button', FinysButton, {extends: 'button'})
customElements.define('finys-text-box', FinysTextBox, {extends: 'input'})
customElements.define('finys-masked-text-box', FinysMaskedTextBox, {extends: 'input'})
customElements.define('finys-checkbox', FinysCheckbox, {extends: 'input'})
customElements.define('finys-radiobutton', FinysRadioButton, {extends: 'input'})
