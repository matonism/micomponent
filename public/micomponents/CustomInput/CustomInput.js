import MiCoolComponent from "../../micomponent-framework/MiCoolComponent";

class CustomInput extends MiCoolComponent {

    static get observedAttributes(){
        return ['label', 'name'];
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
        inputField.addEventListener('onblur', this.handleBlur);
        inputField.type = this.getAttribute('type');

        if(inputField.type == 'file'){
            //inputLabel.remove();

            inputField.parentElement.classList.add('input-file-mask');

            // var text = document.createTextNode("Choose a file to Upload");
            // inputField.parentElement.appendChild(text);

        }

        if(inputField.type == 'button'){
            inputLabel.display = 'none';
        }

        if(!!this.id){
            inputField.id = this.id;
        }
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

        this.rootNode.insertBefore(templateClone, this);
        this.remove();

    }

    handleKeyUp(event){
        let component = event.currentTarget.getRootNode().host();
        let inputChangedEvent = new CustomEvent('custominputkeyup', {
            bubbles: true,
            detail: {
                inputField: event.currentTarget.name,
                value: event.currentTarget.value
            }
        })
        component.dispatchEvent(inputChangedEvent);
    }

    handleBlur(event){
        let component = event.currentTarget.getRootNode().host();
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