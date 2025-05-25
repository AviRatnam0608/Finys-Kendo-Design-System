import {WizardEvents} from '../events/wizard-events'

class ProgressStepper extends HTMLElement {
    destroyListenerFuncs = [];

    get currentView() {
        return this.viewIndex[this.vm.currentStep - 1];
    }

    constructor() {
        super();
        this.uuid = crypto.randomUUID();
        this.popoverId = `stepper-dropdown-${this.uuid}`;
        this.anchorName = `--menu-button-${this.uuid}`;
        this.emitter = new WizardEvents();
        this.vm = kendo.observable({
            currentStep: 1,
            onSelect: (e) => {
                const value = e.step.options.index + 1;
                this.setStep(value);
                this.updateContent();
                this.emitter.emit(WizardEvents.NAMES.SELECT_STEP, {step: value, max: this.max})
            }
        })
        const destroyFunc = this.emitter.on(WizardEvents.NAMES.UPDATED_STEP, this.setStepFromEvent)
        this.destroyListenerFuncs.push(destroyFunc);
    }

    connectedCallback() {
        this.initContent();
        this.classList.add('f-progressbar-stepper-container');
        this.setAttributes();
        this.createShadowRoot();
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

    createShadowRoot() {
        this.attachShadow({mode: 'open'});
        const kendoStyles = document.createElement('link');
        kendoStyles.setAttribute('rel', 'stylesheet');
        kendoStyles.setAttribute('href', 'https://kendo.cdn.telerik.com/themes/8.2.1/default/default-main.css');
        const componentStyles = document.createElement('link');
        componentStyles.setAttribute('rel', 'stylesheet');
        componentStyles.setAttribute('href', '../styles/components/progress-stepper-shadow.css');
        const stepperStyles = document.createElement('link');
        stepperStyles.setAttribute('rel', 'stylesheet');
        stepperStyles.setAttribute('href', '../styles/components/stepper.css');
        this.shadowRoot.appendChild(kendoStyles);
        this.shadowRoot.appendChild(componentStyles);
        this.shadowRoot.appendChild(stepperStyles);
        this.container = document.createElement('div');
        this.container.classList.add('container');
        this.menuButton = this.createProgressbarMenuButton();
        this.container.appendChild(this.menuButton);
        this.container.appendChild(this.createProgressbar());
        this.nav = this.createStepperNav();
        this.container.appendChild(this.nav);
        this.shadowRoot.appendChild(this.container);
        this.shadowRoot.appendChild(document.createElement('slot'));
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

customElements.define('finys-progress-stepper', ProgressStepper);
export {ProgressStepper};