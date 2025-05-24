class Events extends EventTarget {
    static NAMES = {
        UPDATED_STEP: 'updated-step',
        SELECT_STEP: 'select-step',
        UPDATED_CONTENT: 'updated-content',
    }

    on(event, handler) {
        this.addEventListener(event, handler);
        return () => this.removeEventListener(event, handler);
    }

    emit(event, detail) {
        this.dispatchEvent(new CustomEvent(event, {detail}));
    }
}

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
        this.classList.add("f-grid");
        this.setAttribute('data-role', 'grid');
        this.setAttribute('data-toolbar', this.getAttribute('data-toolbar') || "[{template: kendo.template($('#table-header').html())}]")
        this.setAttribute('data-scrollable', this.getAttribute('data-scrollable') || 'false');
        if(!document.getElementById('table-header')) {
            document.querySelector('body').appendChild(this.getHeaderTemplate())
        }
        this.showGridCounter();
    }

    showGridCounter() {
        const regex = /(?<start>\d+)\s*-\s*(?<end>\d+)\s*of\s*(?<total>\d+)/i;
        const stringItem = $(".f-grid .k-pager-info.k-label").text();
        const { groups: { start, end, total } = {} } = stringItem.match(regex) || {};
  
        $(".f-grid .k-pager-info.k-label").html(`
            <span>Items ${start} - ${end}  </span>
            <span style="
                color: var(--neutral);
                margin-left: 4px;
            "> of ${total}</span>`
        );
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

class FinysWizardModal extends FinysModal {
    destroyListenerFuncs = [];

    destroy() {
        super.destroy();
        this.destroyListenerFuncs.forEach(func => func());
    }

    create() {
        this.modalContainer = document.createElement('div', {
            is: "finys-modal-target"
        });
        this.modalContainer.setAttribute('size', this.options.size || 'large');
        document.querySelector('body').appendChild(this.modalContainer);
        $(this.modalContainer).kendoWindow(this.options);
        $(this.modalContainer).data('kendoWindow')
            .toFront()
            .center();
        kendo.bind(this.modalContainer.querySelector('.f-modal-footer.f-generated-template'), this.vm)
        const back = document.querySelector('.f-wizard-footer > button:first-child');
        const next = document.querySelector('.f-wizard-footer > button:first-child + button');
        const stepper = this.getProgressStepper();
        this.registerListener('click', back, () => {
            const step = this.getProgressStepper().previous();
            this.updateBackNextVisibility();
            this.dispatchUpdatedStep(step);
        })
        this.registerListener('click', next, () => {
            const step = this.getProgressStepper().next();
            this.updateBackNextVisibility();
            this.dispatchUpdatedStep(step);
        })
        const destroyFunc = stepper.emitter.on(Events.NAMES.SELECT_STEP, this.updateBackNextVisibility);
        this.destroyListenerFuncs.push(destroyFunc);
    }

    getProgressStepper = () => {
        return this.getKendoModal().element[0].querySelector('finys-progress-stepper')
    }

    updateBackNextVisibility = () => {
        const back = document.querySelector('.f-wizard-footer > button:first-child');
        const next = document.querySelector('.f-wizard-footer > button:first-child + button');
        const stepper = this.getProgressStepper();
        const {step, max} = stepper.getStatus();
        if(step >= max) {
            next.classList.add('f-hidden');
            back.classList.remove('f-hidden');
        } else if(step <= 1) {
            next.classList.remove('f-hidden');
            back.classList.add('f-hidden');
        } else {
            next.classList.remove('f-hidden');
            back.classList.remove('f-hidden');
        }

    }

    renderFooter() {
        return `
        <div class='f-modal-footer f-wizard-footer f-generated-template'>
            <button is="finys-button" class="f-button-secondary f-hidden">Back</button>
            <button is="finys-button" class="f-button-primary">Next</button>
        </div>
    `
    }

    dispatchUpdatedStep(step) {
        this.getProgressStepper().emitter.emit(Events.NAMES.UPDATED_STEP, step);
    }

    registerListener(event, obj, method) {
        obj.addEventListener(event, method);
        this.destroyListenerFuncs.push(() => obj.removeEventListener(event, method))
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
      // you can still tweak classes/attributes here
      this.classList.add("f-radiobutton", "k-radio", "k-radio-md");
      this.setAttribute("data-role", "radiobutton");
    }
}

class FinysTooltip extends HTMLElement {
    connectedCallback() {
        this.classList.add('f-tooltip');
    }
}

class FinysProgressStepper extends HTMLElement {
    destroyListenerFuncs = [];

    get currentView() {
        return this.viewIndex[this.vm.currentStep - 1];
    }

    constructor() {
        super();
        this.uuid = crypto.randomUUID();
        this.popoverId = `stepper-dropdown-${this.uuid}`;
        this.anchorName = `--menu-button-${this.uuid}`;
        this.emitter = new Events();
        this.vm = kendo.observable({
            currentStep: 1,
            onSelect: (e) => {
                const value = e.step.options.index + 1;
                this.setStep(value);
                this.updateContent();
                this.emitter.emit(Events.NAMES.SELECT_STEP, {step: value, max: this.max})
            }
        })
        const destroyFunc = this.emitter.on(Events.NAMES.UPDATED_STEP, this.setStepFromEvent)
        this.destroyListenerFuncs.push(destroyFunc);
    }

    connectedCallback() {
        this.initContent();
        this.classList.add('f-progressbar-stepper-container');
        this.attachShadow({mode: 'open'});
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', 'https://kendo.cdn.telerik.com/themes/8.2.1/default/default-main.css');
        const link2 = document.createElement('link');
        link2.setAttribute('rel', 'stylesheet');
        link2.setAttribute('href', '../styles/components/progress-stepper-shadow.css');
        const link3 = document.createElement('link');
        link3.setAttribute('rel', 'stylesheet');
        link3.setAttribute('href', '../styles/components/stepper.css');
        this.shadowRoot.appendChild(link);
        this.shadowRoot.appendChild(link2);
        this.shadowRoot.appendChild(link3);
        this.setAttributes();
        this.container = document.createElement('div');
        this.container.classList.add('container');
        this.menuButton = this.createProgressbarMenuButton();
        this.container.appendChild(this.menuButton);
        this.container.appendChild(this.createProgressbar());
        this.nav = this.createStepperNav();
        this.container.appendChild(this.nav);
        this.shadowRoot.appendChild(this.container);
        this.shadowRoot.appendChild(document.createElement('slot'));
        kendo.bind(this.container, this.vm);
    }

    disconnectedCallback() {
        this.destroyListenerFuncs.forEach(func => func());
    }

    setStep = (value) => {
        this.updateMenuButton(value);
        this.vm.set('currentStep', value);
    }

    setAttributes() {
        this.steps = this.getAttribute('steps');
        this.max = JSON.parse(this.steps).length;
    }

    createProgressbarMenuButton() {
        const menu = document.createElement('button');
        menu.style['anchor-name'] = this.anchorName;
        menu.classList.add('f-progressbar-menu');
        menu.setAttribute('popovertarget', this.popoverId);
        menu.innerHTML = `<span>${this.vm.currentStep}</span>/<span>${this.max}</span>`
        return menu;
    }

    createProgressbar() {
        const progressbar = document.createElement('div');
        progressbar.classList.add('f-progressbar')
        progressbar.setAttribute('data-role', 'progressbar');
        progressbar.setAttribute('data-min', '0');
        progressbar.setAttribute('data-max', this.max);
        progressbar.setAttribute('data-bind', "value: currentStep");
        return progressbar;
    }

    createStepperNav() {
        const popover = document.createElement('div');
        popover.setAttribute('popover', "");
        popover.setAttribute('id', this.popoverId);
        popover.style['position-anchor'] = this.anchorName;
        const nav = document.createElement('nav');
        nav.setAttribute('data-role', 'stepper');
        nav.setAttribute('data-orientation', 'vertical');
        nav.setAttribute('data-label', 'true');
        nav.setAttribute('data-linear', 'false');
        nav.setAttribute('data-steps', this.steps);
        nav.setAttribute('data-bind', "events: {select: onSelect}")
        popover.appendChild(nav);
        return popover;
    }

    createContent() {
        const content = document.createElement('article');
        return content;
    }
    
    updateMenuButton(integer) {
        this.menuButton.querySelector('span:first-child').textContent = integer;
    }

    previous() {
        this.setStep(this.vm.currentStep - 1);
        this.updateContent();
        return this.vm.get('currentStep');
    }

    next() {
        this.setStep(this.vm.currentStep + 1);
        this.updateContent();
        return this.vm.get('currentStep');
    }

    getStatus() {
        return {step: this.vm.get('currentStep'), max: this.max}
    }

    setStepFromEvent = (e) => {
        $(this.nav.querySelector('nav[data-role="stepper"]')).data('kendoStepper').select(e.detail - 1);
    }

    registerListener(event, obj, method) {
        obj.addEventListener(event, method);
        this.destroyListenerFuncs.push(() => obj.removeEventListener(event, method))
    }

    initContent() {
        const elements = this.querySelectorAll('[step]');
        this.viewIndex = elements;
        this.updateContent();
    }

    updateContent() {
        const elements = this.querySelectorAll('[step]');
        elements.forEach(element => {
            element.classList.add('f-display-none');
        })
        this.currentView.classList.remove('f-display-none');
    }
}

customElements.define('finys-progress-stepper', FinysProgressStepper);
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
