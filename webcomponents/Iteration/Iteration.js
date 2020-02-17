import WebComponentLoader from '../WebComponentLoader/WebComponentLoader.js';

class Iteration extends HTMLElement {

	//******************* BEGIN SETUP ******************
	constructor() {
		super();
	}

	connectedCallback() {
		var shadowRoot = this.attachShadow({mode: 'open'});
		if(this.getAttribute('mobile')){
			var wc = new WebComponentLoader(this, "Iteration/Iteration-mobile");
		}else{
			var wc = new WebComponentLoader(this, "Iteration/Iteration");
		}

	}


	disconnectedCallback() {

	}

	attributeChangedCallback(name, oldValue, newValue) {
		let collection = this.getAttribute("collection");
	}

	execute(component){
		let menuNav = component.shadowRoot.querySelector('.hamburger-nav');
		menuNav.onclick = function(){component.toggleMenu(component)};
	}
	
	//******************* END SETUP ******************

	toggleMenu(component){

		let sidePanel = document.querySelector('usp-side-panel');
		if(!!sidePanel){
			if(sidePanel.hasAttribute('open') == false || sidePanel.getAttribute('open') == 'false'){
				sidePanel.setAttribute('open', 'true');
			}else{
				sidePanel.setAttribute('open', 'false');
			}
		}
		
	}
}

export default Iteration;