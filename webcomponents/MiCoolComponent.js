import WebComponentLoader from '../WebComponentLoader/WebComponentLoader.js';

class MiCoolComponent extends HTMLElement {

	//******************* BEGIN SETUP ******************
	constructor() {
		super();
	}

	//If you are going to override this method in a child class, you must call the following from you child class
	//super.connectedCallback();
	connectedCallback() {
		let fileName = this.getComponentFileName();
		var shadowRoot = this.attachShadow({mode: 'open'});
		var wc = new WebComponentLoader(this, fileName + '/' + fileName);

	}

	//If you override this method in a child class and want merge field functionality, call the following class
	//super.attributeChangedCallback(name, oldValue, newValue);
	attributeChangedCallback(name, oldValue, newValue){
		if(!!this.constructor.observedAttributes && !!this.baseMarkup){
			
			let newMarkup = this.baseMarkup;

			this.constructor.observedAttributes.forEach((attribute, index) => {
				let regex = new RegExp('{!' + attribute + '}', "g");
				newMarkup = newMarkup.replace(regex, newValue);
			});
	        
	        this.clearMarkup();

			let markup = this.createElementsFromHTML(newMarkup);
			this.shadowRoot.appendChild(markup.content.cloneNode(true));
			this.renderedCallback();
		}
		

	}

	renderedCallback(component){
		
	}

	/************** Private methods ******************/

	clearMarkup(){
		let first = this.shadowRoot.firstElementChild; 

        while (!!first) { 
            first.remove(); 
            first = this.shadowRoot.firstElementChild; 
        } 
	}
	createElementsFromHTML(htmlString) {
		var markup = new DOMParser().parseFromString(htmlString, "text/html");
		return markup.querySelector('template');
	}


	getComponentFileName(){
		let tagName = this.localName;
		let fileName = '';
		for(let i = 0; i < tagName.length; i++){
			let character = tagName[i];
			if(i == 0){
				fileName += character.toUpperCase();
			}else if(tagName[i - 1] == '-'){
				fileName += tagName[i].toUpperCase();
			}else{
				fileName += tagName[i].toLowerCase();
			}
		};

		return fileName.replace(/-/gi, '');
	}

	static get template() {
		var root = this;
		while (root.parentNode) {
			root = root.parentNode;
		}
		return root;
    }
}

export default MiCoolComponent;