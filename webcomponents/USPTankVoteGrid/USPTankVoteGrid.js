import WebComponentLoader from "../WebComponentLoader/WebComponentLoader.js";

class USPTankVoteGrid extends HTMLElement {

	static get observedAttributes(){
		return ['tank-designs', 'selected-design'];
	}

	//******************* BEGIN SETUP ******************
	constructor() {
		super();
	}

	connectedCallback() {
		var shadowRoot = this.attachShadow({mode: "open"});
		var wc = new WebComponentLoader(this, "USPTankVoteGrid/USPTankVoteGrid");

	}


	disconnectedCallback() {

	}

	attributeChangedCallback(name, oldValue, newValue) {
		if(name == "tank-designs"){
			this.updateTankVoteTiles(newValue);
		}
	}

	execute(component){
		component.updateTankVoteTiles(component.getAttribute("tank-designs"));
		component.retrieveTankDesigns(component);

	}
	
	//******************* END SETUP ******************

	retrieveTankDesigns(component){
		//component.showModal(component, 'LOADING', 'Retrieving Tank Designs...');
		try{
			$.ajax({
		        url: 'https://ultimate-summer-party.herokuapp.com/Tank/Design/Entry?ids=all',
		        type: 'GET',
		        cache: false,
		        contentType: false,
		        processData: false,
		        success: (data) => {
					//component.hideModal(component);
					//component.showModal(component, 'SUCCESS', data);
					component.setAttribute("tank-designs", JSON.stringify(data.data));
		        },
		        error: (error, textStatus) => {
		        	if(textStatus == 'timeout'){
		        		error.responseText = 'The request took too long to process.  Please try with a different file or contact us at ultimatesummerpartyseries@gmail.com';
		        	}
		        	console.log(error.responseText);
					//component.hideModal(component);
					//component.showModal(component, 'ERROR', 'Something went wrong. Try again later');
		        },    
		        timeout: 10000 // sets timeout to 10 seconds

		    });
		}catch(err){
			console.log(err);
			//component.hideLoadingModal(component);
			//component.showModal(component, 'ERROR', 'Something went wrong. Try again later');
		}
		//show a modal to populate all fields
	}

	updateTankVoteTiles(newValue){
		let tankDesigns = JSON.parse(newValue);
		if(!!tankDesigns){
			let tankDesignTiles = [];
			for(let tankDesign of tankDesigns){
				tankDesignTiles.push(this.createTankVoteTile(this, tankDesign));
			}

			this.addTilesToGrid(tankDesignTiles);
		}
	}

	createTankVoteTile(component, tankDesign){

		let tile = document.createElement('usp-tank-vote-tile');
		tile.setAttribute('image', tankDesign.image);
		if(!!tankDesign.data){

			tile.setAttribute('image', "data:image/png;base64," + component.encode(tankDesign.data.Body.data));
		}
		tile.setAttribute('id', tankDesign.id);
		tile.setAttribute('fileName', tankDesign.fileName);
		return tile;


	}

	encode(data){
	    var str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
	    return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
	}

	addTilesToGrid(tankDesignTiles){
		let grid = this.shadowRoot.querySelector('.tank-vote-grid');
		grid.innerHTML = '';
		for(let tile of tankDesignTiles){
			grid.appendChild(tile);
		}
	}

}

export default USPTankVoteGrid;