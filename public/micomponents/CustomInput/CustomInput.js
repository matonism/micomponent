import MiCoolComponent from "../../micomponent-framework/MiCoolComponent.js";
//attributes
//type, class, accept, value, label, name
class CustomInput extends MiCoolComponent {

    static get observedAttributes(){
        return ['label', 'name', 'file-input-label'];
    }
    
    constructor(){
        super();
    }

    connectedCallback(){
        super.connectedCallback();
    }

    renderedCallback(){
        this.setUpInputFormat();
    }

    setUpInputFormat(){
        var inputLabel = this.shadowRoot.querySelector('#input-label');
        var inputField = this.shadowRoot.querySelector('#input-field');
        inputField.addEventListener('keyup', this.handleKeyUp);
        inputField.addEventListener('blur', this.handleBlur);
        inputField.type = this.getAttribute('type');

        if(inputField.type == 'file'){
            inputLabel.classList.add('hide');

            inputField.parentElement.classList.add('input-file-mask');
            let fileInputLabel = this.shadowRoot.querySelector('.file-input-label');
            fileInputLabel.classList.remove('hide');
            inputField.parentElement.classList.add('input-file-mask');

        }

        if(inputField.type == 'button'){
            inputLabel.classList.add('hide');
        }

        // if(!!this.id){
        //     inputField.id = this.id;
        // }
        if(!!this.onchange){
            inputField.onchange = this.onchange;
        }
        if(!!this.onclick){
            inputField.onclick = this.onclick;
        }
        if(!!this.getAttribute('accept')){
            inputField.accept = this.getAttribute('accept');
        }
        if(!!this.getAttribute('class')){
            inputField.classList.add(this.getAttribute('class'));
        }
        if(!!this.getAttribute('value')){
            inputField.value = this.getAttribute('value');
        }

    }

    handleKeyUp(event){
        let component = event.currentTarget.getRootNode().host;
        let inputChangedEvent = new CustomEvent('custominputkeyup', {
            bubbles: true,
            detail: {
                inputField: event.currentTarget.name,
                value: event.currentTarget.value
            }
        });
        component.setAttribute('value', event.currentTarget.value);
        component.dispatchEvent(inputChangedEvent);
        
    }

    handleBlur(event){
        let component = event.currentTarget.getRootNode().host;
        let inputChangedEvent = new CustomEvent('custominputblur', {
            bubbles: true,
            detail: {
                inputField: event.currentTarget.name,
                value: event.currentTarget.value
            }
        })
        component.dispatchEvent(inputChangedEvent);
    }
        
}

export default CustomInput;