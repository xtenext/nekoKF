//main function that is called when a file is selected
window.neko = function() {
	var file = document.getElementById(neko.config.bind.fileId).files[0],
	reader = new FileReader(),
	blob;
	if(!file) return;
	blob = file.slice();
	neko.output.fileBlob = blob;

	document.getElementById(neko.config.bind.nameFieldId).value = file.name;

	//when the file is completely blobed by the browser
	reader.onloadend = function(e) {
		if (reader.readyState === FileReader.DONE) {
			//cast the data to a simple data array and parse it
			neko.output.parsedData = neko.parse(new Uint8Array(reader.result));
			//render the parsed data
			neko.render(neko.output.parsedData);
			//set up events to monitor changes
			neko.helper.hookEvents();
		}
	};

	//read the file
	reader.readAsArrayBuffer(blob);
};

neko.output = {}; //init output variable