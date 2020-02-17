import WebComponentLoader from '../WebComponentLoader/WebComponentLoader.js';

class USPFooter extends HTMLElement {

	//******************* BEGIN SETUP ******************
	constructor() {
		super();
	}

	connectedCallback() {
		var shadowRoot = this.attachShadow({mode: 'open'});
		var wc = new WebComponentLoader(this, "USPFooter/USPFooter");

	}


	disconnectedCallback() {

	}

	attributeChangedCallback() {

	}

	execute(component){
		
	}
	
	//******************* END SETUP ******************

}

export default USPFooter;