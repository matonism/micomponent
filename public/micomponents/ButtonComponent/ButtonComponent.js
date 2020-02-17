import MiCoolComponent from '../../micomponent-framework/MiCoolComponent.js';

class ButtonComponent extends MiCoolComponent {

    static get observedAttributes(){
        return ['display-message', 'label'];
    }

    constructor() {
        super();
    }

    connectedCallback(){
        super.connectedCallback();
    }
    
	attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
	}

    renderedCallback() {
        super.renderedCallback();
        let button = this.shadowRoot.querySelector('button');
        button.addEventListener('click', this.handleClick);
        let input = this.shadowRoot.querySelector('#input-field');
        input.addEventListener('keyup', this.handleTextChange);
    }

    handleClick(event) {
        let buttonEvent = new CustomEvent('buttoncomponentevent', {
            bubbles: true,
            cancelable: false,
            detail: { 
                message: 'Display this string'
            }
        });

        event.currentTarget.getRootNode().host.dispatchEvent(buttonEvent);
    }

    handleTextChange(event) {        
        let keyUpEvent = new CustomEvent('inputfieldtyped', {
            bubbles: true,
            cancelable: false,
            detail: { 
                message: event.currentTarget.value
            }
        });

        event.currentTarget.getRootNode().host.dispatchEvent(keyUpEvent);
        this.getRootNode().host.setAttribute('display-message', event.currentTarget.value);
    }

}

export default ButtonComponent;