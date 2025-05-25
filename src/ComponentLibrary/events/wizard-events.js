import {Events} from './base-events.js';

class WizardEvents extends Events {
    static NAMES = {
        UPDATED_STEP: 'updated-step',
        SELECT_STEP: 'select-step',
        UPDATED_CONTENT: 'updated-content',
    }
}

export {WizardEvents};