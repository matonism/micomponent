import WebComponentLoader from "../WebComponentLoader/WebComponentLoader.js";

class USPTankVoteTile extends HTMLElement {

	static get observedAttributes(){
		return ['selected'];
	}

	//******************* BEGIN SETUP ******************
	constructor() {
		super();
	}

	connectedCallback() {
		var shadowRoot = this.attachShadow({mode: "open"});
		var wc = new WebComponentLoader(this, "USPTankVoteTile/USPTankVoteTile");

	}


	disconnectedCallback() {

	}

	attributeChangedCallback(name, oldValue, newValue) {
		if(name == "selected"){
			let selected = newValue;
			let tile = this.shadowRoot.querySelector(".tank-vote-tile");
			let checkmark = this.shadowRoot.querySelector(".checkmark-indicator");
			if(newValue == "true"){
				tile.classList.add("selected");
				checkmark.classList.remove("hidden");
			}else{
				tile.classList.remove("selected");
				checkmark.classList.add("hidden");
			}
		}
	}

	execute(component){
		let tankVoteTile = component.shadowRoot.querySelector(".tank-vote-tile");
		component.createImageTag(component);
		tankVoteTile.onclick = function(){
			component.markAsSelected(component, tankVoteTile);
			let SelectedTileEvent = new CustomEvent("selected-tile-event", {
				bubbles: true,
				cancelable: false,
				composed: true,
				detail: {
					id: component.getAttribute("id"),
					image: component.getAttribute("image"),
					fileName: component.getAttribute("fileName")
				}
			});
			component.dispatchEvent(SelectedTileEvent);
		};
	}
	
	//******************* END SETUP ******************

	createImageTag(component){
		if(component.hasAttribute("image")){
			let imageContainer = component.shadowRoot.querySelector(".tank-vote-tile");
			let img = document.createElement("img");
			img.src = component.getAttribute("image");
			img.classList.add("tank-vote-image");
			imageContainer.appendChild(img);
		}
	}

	markAsSelected(component, tankVoteTile){

		let allTiles = component.parentElement.querySelectorAll("usp-tank-vote-tile");
		for(let tile of allTiles){
			if(tile.hasAttribute("selected") == false || tile.getAttribute("selected") == "true"){
				tile.setAttribute("selected", "false");
			}
		}
		component.setAttribute("selected", "true");
		let checkmarkDiv = component.shadowRoot.querySelector('.checkmark-indicator');
		checkmarkDiv.classList.remove('hidden');

	}

}

export default USPTankVoteTile;