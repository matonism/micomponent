function WebComponentLoader(component, directoryName, loadComponentsAtInit){

	this.baseMarkup;
	this.component = component;
	this.directoryName = directoryName;
	if(!component.rootNode){
		component.rootNode = component.shadowRoot;
	}


	this.loadWebComponentResources = (component, directoryName) => {
		this.importCSSFile(directoryName);

		this.importHTMLTemplate(directoryName).then((markupText) => {
			this.component.baseMarkup = markupText;
			if(this.component.renderedCallback != null){
				this.component.renderedCallback();
			}
		});
	};

	this.importCSSFile = function(directoryName){
		
		var cssFile = document.createElement("link");
		cssFile.href = "/" + directoryName + ".css";
		cssFile.rel = "stylesheet";
		this.component.rootNode.appendChild(cssFile);
	}

	this.importHTMLTemplate = function(directoryName){

		return fetch("/" + directoryName + ".html").then(response => response.text()).then(text => {
			let markup = this.createElementsFromHTML(text);
			this.component.rootNode.appendChild(markup.content.cloneNode(true));
			return text;
		});
	}

	this.createElementsFromHTML = function(htmlString) {
		var markup = new DOMParser().parseFromString(htmlString, "text/html");
		return markup.querySelector('template');
	}


	this.loadRemoteJavascript = function(url){

		var jsFile = document.createElement("script");
		jsFile.src = url;
		this.component.rootNode.appendChild(jsFile);
	}

	this.loadRemoteCSS = function(url){
		var cssFile = document.createElement("link");
		cssFile.href = url;
		cssFile.rel = "stylesheet";
		this.component.rootNode.appendChild(cssFile);

	}

	if(loadComponentsAtInit == null || loadComponentsAtInit){
		this.loadWebComponentResources(component, directoryName);
	}
}

export default WebComponentLoader;
