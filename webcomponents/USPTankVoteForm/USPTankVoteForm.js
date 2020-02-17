import WebComponentLoader from '../WebComponentLoader/WebComponentLoader.js';
import USPInputField from '../USPInputField/USPInputField.js';

class USPTankVoteForm extends HTMLElement {

	//******************* BEGIN SETUP ******************
	constructor() {
		super();
	}

	connectedCallback() {
		var shadowRoot = this.attachShadow({mode: 'open'});
		var wc = new WebComponentLoader(this, "USPTankVoteForm/USPTankVoteForm");

		wc.loadRemoteJavascript("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js");
		wc.loadRemoteCSS("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css")
	}


	disconnectedCallback() {

	}

	attributeChangedCallback() {

	}

	execute(component){

		var submitButton = component.shadowRoot.getElementById('submit-button');
		submitButton.onclick = component.submitTankVote(component);
		
		// var fileInput = component.shadowRoot.getElementById('file-input');
		// fileInput.onchange = component.previewFile(component);

		if(component.getAttribute('mobile') == 'true'){
			var inputFields = component.shadowRoot.querySelectorAll('input');
			for(let input of inputFields){
				input.setAttribute('mobile', 'true');
			}
		}
	}

	//******************* END SETUP ******************


	previewFile(component) {
		return function(){
			try{
				component.showModal(component, 'LOADING', 'Vefifying Design...')
				var uploadField = component.shadowRoot.getElementById("file");

				var preview = component.shadowRoot.getElementById('uploadPreview');
				var file    = component.shadowRoot.getElementById('file-input').files[0];

				if(file.size > 20 * 1024 * 1024){
					component.showModal(component, 'ERROR', 'The File Size is too large.  Please keep files under 20 MB');
					component.shadowRoot.getElementById('file-input').value = null;
					return;
				}

				var reader  = new FileReader();

				reader.onloadend = function () {
					preview.src = reader.result;
					component.hideModal(component);
				}

				if (file) {
					reader.readAsDataURL(file);
				} else {
					preview.src = "";
				
				}
			}catch(err){
				component.showModal(component, 'ERROR', 'Image could not be verified');
			}
		}
	}

	submitTankVote(component){
		return function(){
			var fieldsPopulated = component.verifyUploadInputValuesPopulated(component);
			if(fieldsPopulated){
				component.showModal(component, 'LOADING', 'Submitting vote...');
				let selectedTile = JSON.parse(component.getAttribute('selected-design'));
				try{
					$.ajax({
				        url: 'https://ultimate-summer-party.herokuapp.com/Tank/Design/Vote',
				        type: 'POST',
				        data: JSON.stringify({
				        	id: selectedTile.id,
				        	design: selectedTile.fileName,
				        	firstname: component.shadowRoot.querySelector('input[name="first-name"]').value,
				        	lastname: component.shadowRoot.querySelector('input[name="last-name"]').value
				        }),
       					contentType: "application/json; charset=utf-8",
				        success: (data) => {
							component.hideModal(component);
							component.showModal(component, 'SUCCESS', data);
				        },
				        error: (error, textStatus) => {
				        	let errorMessage = 'Something went wrong. Try again later';
				        	if(textStatus == 'timeout'){
				        		errorMessage = 'The request took too long to process.  Please try again or contact us at ultimatesummerpartyseries@gmail.com';
				        	}else if(error.responseText == 'You have already submitted a vote'){
				        		errorMessage = 'You have already submitted a vote';
				        	}
				        	console.log(error.responseText);
							component.hideModal(component);
							component.showModal(component, 'ERROR', errorMessage);
				        },    
				        timeout: 10000 // sets timeout to 10 seconds

				    });
				}catch(err){
					console.log(err);
					component.hideModal(component);
					component.showModal(component, 'ERROR', 'Something went wrong. Try again later');
				}
			}else{
				//show a modal to populate all fields
			}
		}
	}


	verifyUploadInputValuesPopulated(component){
		var fieldsPopulated = true;
		var inputs = component.shadowRoot.querySelectorAll("input");
		for(let element of inputs){
			if(element.localName == 'input'){
				if(!element.value){
					fieldsPopulated = false;
					element.classList.add('error-input');
				}else{
					element.classList.remove('error-input');
				}
			}
		}
		if(!fieldsPopulated){
			component.showModal(component, "ERROR", "You must populate all fields to submit a vote");
		}

		if(!component.getAttribute('selected-design')){
			component.showModal(component, "ERROR", "You must select a design to submit a vote");
			fieldsPopulated = false;
		}
		return fieldsPopulated;
	}

	createCustomFileUploadXHRRequest(){
		var myXhr = $.ajaxSettings.xhr();
        if (myXhr.upload) {
            // For handling the progress of the upload
            myXhr.upload.addEventListener('progress', function(e) {
                if (e.lengthComputable) {
                    $('progress').attr({
                        value: e.loaded,
                        max: e.total,
                    });
                }
            } , false);
        }
        return myXhr;
	}

	showModal(component, type, message){
		var pageShadow = component.shadowRoot.querySelector('.page-shadow');
		var modal = component.shadowRoot.querySelector('.status-modal');
		modal.innerHTML = '';
		var messageDiv = document.createElement('div');
		messageDiv.innerHTML = message;

		if(type === 'SUCCESS'){
			modal.appendChild(messageDiv);
			var closeButton = document.createElement('button');
			closeButton.innerHTML = 'Close';
			closeButton.onclick = function(){component.navigateToHome(component)};
			closeButton.classList.add('generic-button');
			modal.appendChild(closeButton);

		}else if(type === 'ERROR'){
			modal.appendChild(messageDiv);
			var closeButton = document.createElement('button');
			closeButton.innerHTML = 'Close';
			closeButton.onclick = function(){component.hideModal(component)};
			closeButton.classList.add('generic-button');
			modal.appendChild(closeButton);

		}else if(type === 'LOADING'){
			modal.appendChild(messageDiv);
		}

		modal.classList.remove('hidden');
		pageShadow.classList.remove('hidden');
	}


	hideModal(component){
		var modal = component.shadowRoot.querySelector('.status-modal');
		var pageShadow = component.shadowRoot.querySelector('.page-shadow');
		modal.classList.add('hidden');
		pageShadow.classList.add('hidden');
	}

	navigateToHome(){
		window.location.href = "./";
	}

}

export default USPTankVoteForm;