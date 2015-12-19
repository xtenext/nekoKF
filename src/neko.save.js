neko.save = function() {
	var workingVal, workingLen;
	fullData = [];
	for (var i = 0; i < neko.output.parsedData.length; i++) {

		workingVal = null;

		if (neko.output.parsedData[i].garbage) {
			fullData.push(neko.output.parsedData[i].data);

		} else if (neko.output.parsedData[i].changed) {
			workingVal = neko.helper.conversion.stringToHex(neko.helper.wrapLines(document.getElementById('do'+i).value)).split(' ');

			for (var j = 0; j < workingVal.length; j++) {
				workingVal[j] = neko.helper.conversion.hexToInt(workingVal[j]);
			}
			workingVal.push(0);

			fullData.push(new Uint8Array(neko.helper.getWordFromLength(workingVal.length).concat(workingVal)) );

		} else {
			fullData.push(new Uint8Array(neko.helper.getWordFromLength(neko.output.parsedData[i].length)) );
			fullData.push(neko.output.parsedData[i].data);
		}
	}
	neko.output.createdBlob = new Blob(fullData);
	saveAs(neko.output.createdBlob, document.getElementById('filename').value);
	return neko.output.createdBlob;
};
