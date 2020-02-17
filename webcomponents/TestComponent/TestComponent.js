import MiCoolComponent from '../MiCoolComponent.js';

class TestComponent extends MiCoolComponent {


	static get observedAttributes(){
		return ['display-text'];
	}

	//******************* BEGIN SETUP ******************
	constructor() {
		super();
	}

	connectedCallback() {
		super.connectedCallback();
	}

	//******************* END SETUP ********************

	attributeChangedCallback(name, oldValue, newValue) {
		super.attributeChangedCallback(name, oldValue, newValue);

	}

	renderedCallback(){
		let element = this.shadowRoot.querySelector('div');
		element.innerHTML = this.getAttribute('display-text');
		element.onclick = this.addExclamation;
	}

	addExclamation(){
		let component = document.querySelector('test-component');
		component.setAttribute('display-text', component.getAttribute('display-text') + '!');
	}

}

export default TestComponent;