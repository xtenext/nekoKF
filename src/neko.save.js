neko.save = function() {
	var workingVal, workingLen;
	fullData = [];
	for (var i = 0; i < neko.output.parsedData.length; i++) {

		workingVal = null;

		//push the data as-is if it's garbage
		if (neko.output.parsedData[i].garbage) {
			fullData.push(neko.output.parsedData[i].data);

			//if not garbage, it was rendered. If it was changed by the user, convert their text to hex and 'compile' it properly
		} else if (neko.output.parsedData[i].changed) {
			//apply word-wrap and convert to hex
			workingVal = neko.helper.conversion.stringToHex(neko.helper.wrapLines(document.getElementById('do'+i).value)).split(' ');

			//convert the hex strings to ints, because thats how it saves
			for (var j = 0; j < workingVal.length; j++) {
				workingVal[j] = neko.helper.conversion.hexToInt(workingVal[j]);
			}
			//add 0 at the end, because that's how strings in the script files are.
			workingVal.push(0);

			//get the length of the string encoded as a size-word, and push that + our converted value to the file data
			fullData.push(new Uint8Array(neko.helper.getWordFromLength(workingVal.length).concat(workingVal)) );

			//if it was rendered but they didn't edit it, just push it to the file data
		} else {
			//we have to create the size-word first
			fullData.push(new Uint8Array(neko.helper.getWordFromLength(neko.output.parsedData[i].length)) );
			fullData.push(neko.output.parsedData[i].data);
		}
	}
	neko.output.createdBlob = new Blob(fullData);
	saveAs(neko.output.createdBlob, document.getElementById('filename').value);
	return neko.output.createdBlob;
};
