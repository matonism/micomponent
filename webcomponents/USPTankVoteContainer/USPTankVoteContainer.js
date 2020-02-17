import WebComponentLoader from '../WebComponentLoader/WebComponentLoader.js';
import USPInputField from '../USPInputField/USPInputField.js';

class USPTankVoteContainer extends HTMLElement {

	static get observedAttributes(){
		return ['selected-design'];
	}
	//******************* BEGIN SETUP ******************
	constructor() {
		super();
	}

	connectedCallback() {
		var shadowRoot = this.attachShadow({mode: 'open'});
		var wc = new WebComponentLoader(this, "USPTankVoteContainer/USPTankVoteContainer");

	}


	disconnectedCallback() {

	}

	attributeChangedCallback(name, oldValue, newValue) {

		if(name == "selected-design"){
			this.shadowRoot.querySelector('usp-tank-vote-form').setAttribute('selected-design', newValue)
		}
	}

	execute(component){

		component.shadowRoot.addEventListener("selected-tile-event", function(e){
			component.setAttribute('selected-design', JSON.stringify(e.detail));
			console.log(e.detail);
		});
	}

	//******************* END SETUP ******************




}

export default USPTankVoteContainer;