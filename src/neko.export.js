//this module was supposed to generate a human-readable script file to be used in a group-translation thing. It's unused and unfinished
neko.exportScript = function(filename) { 
	var output = '', hex;

	if (!neko.output.parsedData) return;

	filename = filename || document.getElementById('filename').value
	for (var i = 0; i < neko.output.parsedData.length; i++) {

		if (neko.output.parsedData[i].important) {
			hex = '';
			for (var j = 0; j < neko.output.parsedData[i].data.length-1; j++) {

				hex += neko.helper.conversion.intToHex(neko.output.parsedData[i].data[j])+' ';
			}

			hex = neko.replace(hex);
			output += neko.helper.conversion.hexToString(hex.hex) + '\r\n';
		}
	}

	saveAs(new Blob([output]), filename);
}
