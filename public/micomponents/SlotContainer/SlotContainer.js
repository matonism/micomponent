import MiCoolComponent from "../../micomponent-framework/MiCoolComponent.js";

class SlotContainer extends MiCoolComponent {

    static get observedAttributes(){
        return [];
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

export default SlotContainer;