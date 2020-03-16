import MiCoolComponent from "../../micomponent-framework/MiCoolComponent.js";

class SlotComponent extends MiCoolComponent {

    static get observedAttributes(){
        return ['slot-description'];
    }
    
    constructor(){
        super();
    }

    connectedCallback(){
        super.connectedCallback();
    }

    renderedCallback(){
    }
        
}

export default SlotComponent;