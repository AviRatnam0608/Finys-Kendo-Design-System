import {Modal} from './modal.js'
import {WizardEvents as Events} from '../events/wizard-events.js'

class WizardModal extends Modal {
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

export {WizardModal}