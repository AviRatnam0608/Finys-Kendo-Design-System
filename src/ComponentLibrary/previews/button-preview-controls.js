class ButtonControls extends HTMLElement {
    registeredListeners = [];

    static appendChildren(node, elements) {
        elements.forEach(element => {
            node.appendChild(element);
        })
    }

    connectedCallback() {
        this.buttonContainer1 = document.createElement('section');
        this.buttonContainer2 = document.createElement('section');
        this.buttonContainer1.setAttribute('id', 'size-buttons');
        this.buttonContainer2.setAttribute('id', 'color-buttons');
        this.constructor.appendChildren(this.buttonContainer1, [
            this.createResizeSmallButton(),
            this.createResizeMediumButton(),
            this.createResizeLargeButton(),
        ])
        this.constructor.appendChildren(this.buttonContainer2, [
            this.createSetPrimaryButton(),
            this.createSetSecondaryButton(),
            this.createSetTertiaryButton(),
            this.createSetDestructiveButton(),
            this.createIconToggle(),
        ])
        this.constructor.appendChildren(this, [
            this.buttonContainer1,
            this.buttonContainer2
        ])
    }

    disconnectedCallback() {
        this.destroy();
    }

    setButtonSize = (size) => () => {
        const buttonPreview = document.querySelector('button-preview');
        buttonPreview.setButtonSize(size);
    }

    setButtonColor = (color) => () => {
        const buttonPreview = document.querySelector('button-preview');
        buttonPreview.setButtonColor(color);
    }

    registerClickListener(object, func) {
        const destroyFunc = () => object.removeEventListener('click', func);
        this.registeredListeners.push(destroyFunc);
        object.addEventListener('click', func);
    }

    createResizeSmallButton() {
        this.makeSmallButton = document.createElement('button', { is: 'finys-button' });
        this.makeSmallButton.setAttribute('id', 'make-small-button');
        this.makeSmallButton.classList.add('f-button-small')
        this.makeSmallButton.textContent = 'Small';
        this.registerClickListener(this.makeSmallButton, this.setButtonSize('small'))
        return this.makeSmallButton;
    }

    createResizeMediumButton() {
        this.makeMediumButton = document.createElement('button', { is: 'finys-button' });
        this.makeMediumButton.setAttribute('id', 'make-medium-button');
        this.makeMediumButton.classList.add('f-button-medium')
        this.makeMediumButton.textContent = 'Medium';
        this.registerClickListener(this.makeMediumButton, this.setButtonSize('medium'))
        return this.makeMediumButton;
    }

    createResizeLargeButton() {
        this.makeLargeButton = document.createElement('button', { is: 'finys-button' });
        this.makeLargeButton.setAttribute('id', 'make-large-button');
        this.makeLargeButton.classList.add('f-button-large')
        this.makeLargeButton.textContent = 'Large';
        this.registerClickListener(this.makeLargeButton, this.setButtonSize('large'))
        return this.makeLargeButton;
    }

    createSetPrimaryButton() {
        this.primaryBtn = document.createElement('button', { is: 'finys-button' });
        this.primaryBtn.setAttribute('id', 'make-primary-button');
        this.primaryBtn.classList.add('f-button-medium')
        this.primaryBtn.classList.add('f-button-primary')
        this.primaryBtn.textContent = 'Primary';
        this.registerClickListener(this.primaryBtn, this.setButtonColor('primary'))
        return this.primaryBtn;
    }

    createSetSecondaryButton() {
        this.secondaryBtn = document.createElement('button', { is: 'finys-button' });
        this.secondaryBtn.setAttribute('id', 'make-secondary-button');
        this.secondaryBtn.classList.add('f-button-medium')
        this.secondaryBtn.classList.add('f-button-secondary')
        this.secondaryBtn.textContent = 'Secondary';
        this.registerClickListener(this.secondaryBtn, this.setButtonColor('secondary'))
        return this.secondaryBtn;
    }

    createSetTertiaryButton() {
        this.tertiaryBtn = document.createElement('button', { is: 'finys-button' });
        this.tertiaryBtn.setAttribute('id', 'make-tertiary-button');
        this.tertiaryBtn.classList.add('f-button-medium')
        this.tertiaryBtn.classList.add('f-button-tertiary')
        this.tertiaryBtn.textContent = 'Tertiary';
        this.registerClickListener(this.tertiaryBtn, this.setButtonColor('tertiary'))
        return this.tertiaryBtn;
    }

    createSetDestructiveButton() {
        this.destructiveBtn = document.createElement('button', { is: 'finys-button' });
        this.destructiveBtn.setAttribute('id', 'make-destructive-button');
        this.destructiveBtn.classList.add('f-button-medium')
        this.destructiveBtn.classList.add('f-button-destructive')
        this.destructiveBtn.textContent = 'Destructive';
        this.registerClickListener(this.destructiveBtn, this.setButtonColor('destructive'))
        return this.destructiveBtn;
    }

    createIconToggle() {
        this.iconToggle = document.createElement('input', { is: 'finys-toggle' });
        this.iconToggle.setAttribute('id', 'toggle-icon');
        this.iconToggle.vm.set('onChange',  function(e) {
            const buttonPreview = document.querySelector('button-preview');
            if(e.checked) {
                buttonPreview.setIconContent('Action');
            } else {
                buttonPreview.setContent('Action')
            }
        })
        return this.iconToggle;
    }
        
        

    destroy() {
        this.registeredListeners.forEach((func) => {
            func();
        })
    }
}

customElements.define('finys-button-controls', ButtonControls);
export {ButtonControls};
