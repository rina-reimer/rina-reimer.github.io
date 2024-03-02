class Translate {
	constructor(attribute, lng) {
		//initialization
		this.attribute = attribute;
		this.lng = lng;
	}
	//translate 
	process() {
		var attr = this.attribute;
		var xrhFile = new XMLHttpRequest();
		//load content data 
		xrhFile.open("GET", "https://rina-reimer.github.io/lng/" + this.lng + ".json", false);
		xrhFile.onreadystatechange = function () {
			if (xrhFile.readyState === 4) {
				if (xrhFile.status === 200 || xrhFile.status == 0) {
					var LngObject = JSON.parse(xrhFile.responseText);
					var allDom = document.getElementsByTagName("*");
					for (var i = 0; i < allDom.length; i++) {
						var elem = allDom[i];
						var key = elem.getAttribute(attr);
						if (key != null) { 
							elem.innerHTML = LngObject[key];
						}
					}

				}
			}
		};
		xrhFile.send();
	};
}