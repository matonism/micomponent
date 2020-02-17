import WebComponentLoader from '../WebComponentLoader/WebComponentLoader.js';

class USPSidePanel extends HTMLElement {

	static get observedAttributes(){
		return ['open'];
	}

	//******************* BEGIN SETUP ******************
	constructor() {
		super();

		var shadowRoot = this.attachShadow({mode: 'open'});
		// if(this.getAttribute('mobile')){
		// 	var wc = new WebComponentLoader(this, "USPSidePanel/USPSidePanel-mobile");
		// }else{
			var wc = new WebComponentLoader(this, "USPSidePanel/USPSidePanel");
		//}

	}

	connectedCallback() {

	}


	disconnectedCallback() {

	}

	attributeChangedCallback(name, oldValue, newValue) {

		if(name == "open"){
			this.handleOpenStateChanged(oldValue, newValue);
		}

		
	}

	execute(component){
		var contents = component.innerHTML;
		let innerContainer = component.shadowRoot.querySelector(".side-panel-inner");
		var contentContainer = document.createElement('div');
		contentContainer.innerHTML = contents;
		innerContainer.appendChild(contentContainer);
		this.setUpSidePanel();
	}



	//***************** EXTRA LOGIC *******************


	handleOpenStateChanged(oldValue, newValue){
		var side = this.getAttribute('side');
		var sidePanelNavTab = this.shadowRoot.getElementById("side-panel-nav-tab");
		var sidePanel = this.shadowRoot.getElementById("side-panel");

		//check if the side panel has been built in the dom yet
		if(sidePanel){
			if(side == 'left'){
				if(newValue == 'true'){
					this.slideSideBarOpenFromLeft(this, sidePanel, sidePanelNavTab);
				}else if(newValue == 'false'){
					this.slideSideBarClosedFromLeft(this, sidePanel, sidePanelNavTab);
				}
			}else{
				if(newValue == 'true'){
					this.slideSideBarOpenFromRight(this, sidePanel, sidePanelNavTab);
				}else if(newValue == 'false'){
					this.slideSideBarClosedFromRight(this, sidePanel, sidePanelNavTab);
				}
			}
		}
	}

	setUpSidePanel(){
		var side = 'left';
		var size = '30%';
		if(this.hasAttribute('size')){
			size = this.getAttribute('size');
			if(size == 'small' || size == 'medium' || size == 'large'){
				size = this.sizeMapping()[size];
			}
		}

		if(size.includes('vw') || size.includes('%')){
			size = document.documentElement.clientWidth * parseFloat(size) / 100
		}


		if(this.hasAttribute('side')){
			side = this.getAttribute('side');
		}

		var sidePanel = this.shadowRoot.getElementById("side-panel");
		var sidePanelNavTab = this.shadowRoot.getElementById("side-panel-nav-tab");
		var sidePanelArrow = this.shadowRoot.getElementById("side-panel-arrow");
		let sidePanelCloseButton = this.shadowRoot.querySelector('.close-side-panel')

		sidePanel.style.width = size;

		if(side == 'left'){
			sidePanel.style.left = '-' + size;
			sidePanelNavTab.style.left = '0';
			sidePanelArrow.classList.add('side-panel-arrow-right');
		}

		if(side == 'right'){
			sidePanel.style.right = '-' + size;
			sidePanelNavTab.style.right = '0';
			sidePanelArrow.classList.add('side-panel-arrow-left');
		}

		if(this.getAttribute('mobile') == 'true'){
			sidePanelNavTab.classList.add('hidden');
		}else{
			sidePanelCloseButton.classList.add('hidden');
			sidePanel.addEventListener("click", this.slideSidePanel(this));
		}

		sidePanelCloseButton.addEventListener("click", this.slideSidePanel(this));
		sidePanelNavTab.addEventListener("click", this.slideSidePanel(this));

		if(this.getAttribute('open') == 'true'){
			this.slideSidePanel(this)();
		}

	}

	sizeMapping(){
	    return {
    		small: '30%',
    		medium: '60%',
    		large: '90%'
	    }
	}

	slideSidePanel(component){
		return function(){
			var side = component.getAttribute('side');
			var sidePanelNavTab = component.shadowRoot.getElementById("side-panel-nav-tab");
			var sidePanel = component.shadowRoot.getElementById("side-panel");

			if(side == 'left'){
				let sideBarOffset = parseFloat(sidePanel.style.left);

				//if it should slide open
				if(sideBarOffset < 0){
					component.setAttribute('open', 'true');
					//component.slideSideBarOpenFromLeft(component, sidePanel, sidePanelNavTab);
				//if it should slide closed
				}else{
					component.setAttribute('open', 'false');
					//component.slideSideBarClosedFromLeft(component, sidePanel, sidePanelNavTab);
				}
			}else{
				let sideBarOffset = parseFloat(sidePanel.style.right);

				//if it should slide open
				if(sideBarOffset < 0){
					component.setAttribute('open', 'true');
					//component.slideSideBarOpenFromRight(component, sidePanel, sidePanelNavTab);
				//if it should slide closed
				}else{
					component.setAttribute('open', 'false');
					//component.slideSideBarClosedFromRight(component, sidePanel, sidePanelNavTab);
				}
			}
		}
	}


	slideSideBarOpenFromLeft(component, sidePanel, sidePanelNavTab){

		var incrementOnInterval = component.getIncrementOnInterval(component);
		var intervalDuration = component.getIntervalDuration(component);

		var interval = setInterval(function(){

			var currentSideBarOffset = parseFloat(sidePanel.style.left);
			var navTabOffset = parseFloat(sidePanelNavTab.style.left);
			if(currentSideBarOffset >= -incrementOnInterval){
				incrementOnInterval = -currentSideBarOffset;
				sidePanel.style.left = (currentSideBarOffset + incrementOnInterval).toString();
				sidePanelNavTab.style.left = (navTabOffset + incrementOnInterval).toString();
				clearInterval(interval);
			}else{

				sidePanel.style.left = (currentSideBarOffset + incrementOnInterval).toString();
				sidePanelNavTab.style.left = (navTabOffset + incrementOnInterval).toString();
			}
		}, intervalDuration);
	}

	slideSideBarClosedFromLeft(component, sidePanel, sidePanelNavTab){
		var incrementOnInterval = component.getIncrementOnInterval(component);
		var intervalDuration = component.getIntervalDuration(component);

		var interval = setInterval(function(){
			var currentSideBarWidth = parseFloat(sidePanel.style.width);
			var currentSideBarOffset = parseFloat(sidePanel.style.left);
			var navTabOffset = parseFloat(sidePanelNavTab.style.left);
			//var mainContentLeftPadding = parseFloat($('.main-content').css("padding-left"));
			//var mainContentRightMargin = parseFloat($('.main-content').css("margin-right"));

			if(currentSideBarOffset <= -currentSideBarWidth + incrementOnInterval){
				incrementOnInterval = (currentSideBarWidth + currentSideBarOffset);
				sidePanel.style.left = (currentSideBarOffset - incrementOnInterval).toString();
				sidePanelNavTab.style.left = (navTabOffset - incrementOnInterval).toString();
				clearInterval(interval);
			}else{

				sidePanel.style.left = (currentSideBarOffset - incrementOnInterval).toString();
				sidePanelNavTab.style.left = (navTabOffset - incrementOnInterval).toString();
			}
		}, intervalDuration);
	}
	slideSideBarOpenFromRight(component, sidePanel, sidePanelNavTab){
		var incrementOnInterval = component.getIncrementOnInterval(component);
		var intervalDuration = component.getIntervalDuration(component);

		var interval = setInterval(function(){
			var currentSideBarOffset = parseFloat(sidePanel.style.right);
			var navTabOffset = parseFloat(sidePanelNavTab.style.right);

			if(currentSideBarOffset >= -incrementOnInterval){
				incrementOnInterval = -currentSideBarOffset;
				sidePanel.style.right =  (currentSideBarOffset + incrementOnInterval).toString();
				sidePanelNavTab.style.right = (navTabOffset + incrementOnInterval).toString();
				clearInterval(interval);
			}else{

				sidePanel.style.right = (currentSideBarOffset + incrementOnInterval).toString();
				sidePanelNavTab.style.right = (navTabOffset + incrementOnInterval).toString();
			}
		}, intervalDuration);
	}

	slideSideBarClosedFromRight(component, sidePanel, sidePanelNavTab){
		var incrementOnInterval = component.getIncrementOnInterval(component);
		var intervalDuration = component.getIntervalDuration(component);
		var interval = setInterval(function(){
			var currentSideBarWidth = parseFloat(sidePanel.style.width);
			var currentSideBarOffset = parseFloat(sidePanel.style.right);
			var navTabOffset = parseFloat(sidePanelNavTab.style.right);

			if(currentSideBarOffset <= -currentSideBarWidth+incrementOnInterval){

				incrementOnInterval = (currentSideBarWidth + currentSideBarOffset);
				sidePanel.style.right = (currentSideBarOffset - incrementOnInterval).toString();
				sidePanelNavTab.style.right = (navTabOffset - incrementOnInterval).toString();
				clearInterval(interval);

			}else{

				sidePanel.style.right = (currentSideBarOffset - incrementOnInterval).toString();
				sidePanelNavTab.style.right = (navTabOffset - incrementOnInterval).toString();
			}
		}, intervalDuration);
	}



	getIncrementOnInterval(component){

		if(component.getAttribute('mobile') == 'true'){
			return 40;
		}else{
			return 10;
		}

	}

	getIntervalDuration(component){

		if(component.getAttribute('mobile') == 'true'){
			return 5;
		}else{
			return 10;
		}

	}

}


export default USPSidePanel;