import MiCoolComponent from '../../micomponent-framework/MiCoolComponent.js';

class ButtonContainer extends MiCoolComponent {

    //inputString = '';

    static get observedAttributes(){
        return ['message'];
    }
    constructor() {
        super();
    }

    connectedCallback(){
        super.connectedCallback();
        this.message = 'There is no message here';
        this.shadowRoot.addEventListener('inputfieldtyped', this.updateMessage);
        this.shadowRoot.addEventListener('buttoncomponentevent', this.updateMessage);
    }
    
	attributeChangedCallback(name, oldValue, newValue) {
		super.attributeChangedCallback(name, oldValue, newValue);

	}

    renderedCallback() {
        super.renderedCallback();
    }

    updateMessage(event) {
        let payload = event.detail;
        this.host.setAttribute('message', payload.message);
        //this.host.querySelector('button-component').inputString = payload.message;
        
    }

}

export default ButtonContainer;