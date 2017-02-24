'use strict';

var UI;
var Action;
var Level1;

window.onload = function() { init() };

function init() {
	Level1 = {
		Action: {	
			clickChuckNorris: function () {
				document.getElementById("error-message").innerHTML = "";
				var oReq = new XMLHttpRequest();
				oReq.open("GET", "http://api.icndb.com/jokes/random");
				oReq.overrideMimeType("JSON; charset=x-user-defined");
				oReq.addEventListener("load", this.showMessage);
				oReq.addEventListener("error", this.showMessageError);
				oReq.send();
			},
			clickGitHub: function (e) {
				document.getElementById("error-message").innerHTML = "";
				if (e.keyCode == 13) {
					if (document.getElementById("inp-git-hub").value != null && document.getElementById("inp-git-hub").value.length > 0 ) {
				        var oReq = new XMLHttpRequest();
						oReq.open("GET", "https://api.github.com/search/repositories?q=" + document.getElementById("inp-git-hub").value);
						oReq.overrideMimeType("JSON; charset=x-user-defined");
						oReq.addEventListener("load", this.loadResultGit);
						oReq.addEventListener("error", this.showMessageError);
						oReq.send();
					} else {
						document.getElementById("ul-git-hub").innerHTML = "";
						document.getElementById("error-message").innerHTML = "";

						var text = document.createTextNode("Debe digitar al menos un caracter."); 
						document.getElementById("error-message").appendChild(text);
					}
				    return false;
			    }
			    return true;
			},
			showMessage: function (response) {
				var result = JSON.parse(response.srcElement.responseText);
				
				var text = document.createTextNode(result.value.joke); 
				document.getElementById("info-message").innerHTML = "";
				document.getElementById("info-message").appendChild(text);
			},
			showMessageError: function (response) {
				document.getElementById("ul-git-hub").innerHTML = "";
				document.getElementById("error-message").innerHTML = "";

				var text = document.createTextNode("No encontro ningun elemento."); 
				document.getElementById("error-message").appendChild(text);
			},
			loadResultGit: function (response) {
				var result = JSON.parse(response.srcElement.responseText);
				document.getElementById("ul-git-hub").innerHTML = "";
				var ul = document.getElementById("ul-git-hub");
  				
  				if (result.items.length > 0) {
					for (var i = 0; i < result.items.length; i++) {
						var li = document.createElement("li");
						li.appendChild(document.createTextNode(result.items[i].full_name));
						ul.appendChild(li);
					}
				}
			}
		}
	}
}