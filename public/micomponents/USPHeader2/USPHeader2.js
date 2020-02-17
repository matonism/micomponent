import MiCoolComponent from '../../micomponent-framework/MiCoolComponent.js';

class USPHeader2 extends MiCoolComponent {

	//******************* BEGIN SETUP ******************
	constructor() {
		super();
	}

	connectedCallback() {
		super.connectedCallback();

	}

	attributeChangedCallback(name, oldValue, newValue) {

	}

	renderedCallback(){
		// let menuNav = this.shadowRoot.querySelector('.hamburger-nav');
		// menuNav.onclick = this.toggleMenu();
	}
	
	//******************* END SETUP ******************

	toggleMenu(){

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

export default USPHeader2;