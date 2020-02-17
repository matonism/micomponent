import WebComponentLoader from '../WebComponentLoader/WebComponentLoader.js';

class USPHeader extends HTMLElement {

	//******************* BEGIN SETUP ******************
	constructor() {
		super();
	}

	connectedCallback() {
		var shadowRoot = this.attachShadow({mode: 'open'});
		if(this.getAttribute('mobile')){
			var wc = new WebComponentLoader(this, "USPHeader/USPHeader-mobile");
		}else{
			var wc = new WebComponentLoader(this, "USPHeader/USPHeader");
		}

	}


	disconnectedCallback() {

	}

	attributeChangedCallback(name, oldValue, newValue) {

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

export default USPHeader;