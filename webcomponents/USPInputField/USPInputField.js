import WebComponentLoader from "../WebComponentLoader/WebComponentLoader.js"

class USPInputField extends HTMLElement {

	constructor(){
		super();
	}

	//needed to add logic in the connected callback because we needed to update template before adding it to the markup
	connectedCallback(){
		var shadowRoot = this.attachShadow({mode: 'open'});
		this.rootNode = this.parentElement;

		var wc = new WebComponentLoader(this, '/utilities/webcomponents/USPInputField/USPInputField', false);
		wc.importCSSFile('/USPInputField/USPInputField');

		fetch("/utilities/webcomponents/USPInputField/USPInputField" + ".html").then(response => response.text()).then(text => {
			var markup = wc.createElementsFromHTML(text);
			var templateClone = markup.content.cloneNode(true);
			this.setBaseInputTagAttributes(templateClone);

		});

	}

	setBaseInputTagAttributes(templateClone){
		var inputLabel = templateClone.querySelector('#input-label');
		var inputField = templateClone.querySelector('#input-field');

		inputField.type = this.getAttribute('type');

		if(inputField.type == 'file'){
			inputLabel.remove();

			// var button = document.createElement('button'); 
			// button.innerHTML = "Select File to Upload...";
			inputField.parentElement.classList.add('input-file-mask');
			// inputField.parentElement.insertBefore(button, inputField.nextSibling);
			var text = document.createTextNode("Choose a file to Upload");
			inputField.parentElement.appendChild(text);
			// button.classList.add('input-label-file');
		}

		if(inputField.type == 'button'){
			inputLabel.remove();
		}else{
			inputLabel.innerHTML = this.getAttribute('label');
		}

		if(!!this.getAttribute('name')){
			inputField.name = this.getAttribute('name');
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


	execute(){

	}

}

export default USPInputField;