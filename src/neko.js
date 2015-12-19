window.neko = function() {
	var file = document.getElementById(neko.config.bind.fileId).files[0],
	reader = new FileReader(),
	blob;
	if(!file) return;
	blob = file.slice();
	neko.output.fileBlob = blob;

	document.getElementById(neko.config.bind.nameFieldId).value = file.name;

	reader.onloadend = function(e) {
		if (reader.readyState === FileReader.DONE) {
			neko.output.parsedData = neko.parse(new Uint8Array(reader.result));

			neko.render(neko.output.parsedData);
			neko.helper.hookEvents();
		}
	};

	reader.readAsArrayBuffer(blob);
};

neko.output = {};