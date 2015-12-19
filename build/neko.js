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
neko.config = {
	bind: {
		fileId: 'file',
		nameFieldId: 'filename',
		outputId: 'output',
		saveButtonId: 'save',
		versionId: 'version'
	},
	lineWidth: 55,
	version: 'Revision 8.5'
};

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

neko.filter = function(data) {
	var currentFilter;
	for (var i = 0; i < neko.filter.list.length; i++) {
		currentFilter = neko.filter.list[i]
		if (neko.helper.compare(data.subarray(0, currentFilter.length), currentFilter.filter) !== currentFilter.is) return false;
	};
	return true;
};

neko.filter.list = [];

neko.filter.add = function(hex, is, name) {
	var gen = neko.helper.generateKeyFromHex(hex);
	neko.filter.list.push({
		name: name||'',
		filter: gen.key,
		length: gen.length,
		is: is || false
	});
	return neko.filter.list.length-1;
};

neko.filter.remove = function(index) {
	neko.filter.list.splice(index, 1);
};
neko.helper = {

	hookEvents: function() {
		var nodes = document.getElementsByClassName('data-container');
		for (var i = 0; i < nodes.length; i++) {
			nodes[i].addEventListener('change', function(e) {
				var dataObject = neko.output.parsedData[e.target.getAttribute('data-object')];
				dataObject.changed = true;
			});
		}
	},

	compare: function(sub, result) {

		result = typeof result === 'object' ? neko.helper.joinArray(result, '') : result;
		sub = typeof sub === 'object' ? neko.helper.joinArray(sub, '') : sub;

		return sub === result;

	},

	joinArray: function(array, seperator) {
		var result = '';
		seperator = typeof seperator !== 'string' ? ',' : seperator;

		for (var i = 0; i < array.length-1; i++) {
			result += ''+array[i]+seperator;
		}

		return result += ''+array[i];
	},

	getLengthFromWord: function(sub) {
		var built = '';
		for (var i = sub.length - 1; i >= 0; i--) {
			built += (neko.helper.conversion.intToHex(sub[i]).length === 2 ? '' : '0') + neko.helper.conversion.intToHex(sub[i]);
		}
		return neko.helper.conversion.hexToInt(built);
	},

	getWordFromLength: function(num) {
		var hex = neko.helper.conversion.intToHex(num),
			retArray = hex.match(/.{1,2}/g).reverse();

		for (var i = 0; i < retArray.length; i++) {
			retArray[i] = neko.helper.conversion.hexToInt(retArray[i]);

		}
		while (retArray.length < 4) {
			retArray.push(0);
		}
		return retArray;
	},

	generateKeyFromHex: function(hex) {
		var hexLength;

		hex = hex.split(' ');
		hexLength = hex.length;

		for (var i = 0; i < hex.length; i++) {
			hex[i] = neko.helper.conversion.hexToInt(hex[i]);
		}
		return {
			key: neko.helper.joinArray(hex, ''),
			length: hexLength
		};
	},

	wrapLines:  function(text) {
		var spaceLeft = neko.config.lineWidth,
		words = text.trim().replace(/\\n/g, ' \\n ').split(' '),
		wrappedText = '';
		for (var i=0; i < words.length; ++i) {

			if (words[i] === '\\n') {
				wrappedText += '\n';
				spaceLeft = neko.config.lineWidth;
			} else if (words[i].length+1 > spaceLeft) {
				wrappedText += '\n' + words[i] + ' ';
				spaceLeft = neko.config.lineWidth - (words[i].length + 1);
			} else {
				wrappedText += words[i] + ' ';
				spaceLeft -= (words[i].length + 1);
			}
		}
		return wrappedText.trim();
	},

	conversion: {
		intToHex: function(d) {
		    return (d.toString(16).length % 2 === 0 ? d.toString(16) : '0'+d.toString(16))
		    	.toUpperCase().match(/[0-9A-F]{2}/g).join(' ');
		},
		hexToInt: function(h) {
		    return parseInt(h, 16);
		},
		stringToHex: function (sjis) {
			var retval = '';
			for(var i = 0; i < sjis.length; i++) {
				retval += (neko._unicode_to_sjis[sjis.charCodeAt(i)]||'00') + ' ';
			}
			return retval.trim();
		},

		hexToString: function(hex) {
			var chara = '', retval = '';

			hex = hex.toUpperCase().replace(/[^0-9A-F]+/g,"");
			for(var i = 0; i < hex.length; i += 2) {
				chara = hex.substring(i, i + 2);
				if(isNaN(neko._sjis_to_unicode[chara]))  {

					chara = hex.substring(i, i + 4);
					if(isNaN(neko._sjis_to_unicode[chara])) {
						console.error('Missingno: ' + chara)
				  		chara = "?"; // Error
					}
				else
				  i += 2;
				}
				retval += String.fromCharCode(neko._sjis_to_unicode[chara]);
			}
			return retval;
		}
	}
};

neko.init = function(config) {
	if (typeof config === 'object') {
		neko.config.bind.fileId = config.fileId || neko.config.bind.fileId;
		neko.config.bind.nameFieldId = config.nameFieldId || neko.config.bind.nameFieldId;
		neko.config.bind.outputId = config.outputId || neko.config.bind.outputId;
		neko.config.bind.saveButtonId = config.saveButtonId || neko.config.bind.saveButtonId;
		neko.config.bind.versionId = config.versionId || neko.config.bind.versionId;
	}
	document.getElementById(neko.config.bind.versionId).innerText = neko.config.version;
	document.getElementById(neko.config.bind.fileId).addEventListener('change', neko);
	document.getElementById(neko.config.bind.saveButtonId).addEventListener('click', neko.save);
};

neko.parse = function(ia) {
	var offset = 0,
		partArray = [],
		garbageStart = 0,
		garbageEnd;

	while (offset < ia.length) {
		if (ia[offset] === 91 && neko.helper.compare(ia.subarray(offset, offset+15),'911311011317613188131103149921421669332')) {
			//collect garbage
			offset -= 4;
			garbageEnd = offset;
			partArray.push(neko.set.garbage(ia, garbageStart, garbageEnd));

			//get legit parts
			while (!(ia[offset] === 1 && neko.helper.compare(ia.subarray(offset, offset+10), '1000010000') )) {
				partArray.push(neko.set.part(ia, offset));
				offset += partArray[partArray.length-1].data.length+4;
			}

			garbageStart = offset;

		} else {
			offset++;
		}

	}
	//get last peice of garbage
	partArray.push(neko.set.garbage(ia, garbageStart, offset));



	return partArray;
};

neko.render = function(pd) {
	var output = document.getElementById(neko.config.bind.outputId),
		hex = '', input, small;

	output.remove();
	output = document.createElement('div');
	output.id = neko.config.bind.outputId;

	for (var i = 0; i < pd.length; i++) {
		if (pd[i].important) {
			hex = '';
			for (var j = 0; j < pd[i].data.length-1; j++) {

				hex += neko.helper.conversion.intToHex(pd[i].data[j])+' ';
			}

			hex = neko.replace(hex);

			if (hex.replaced) {
				pd[i].changed = true;
			}

			input = document.createElement('input');
			input.type = 'text';
			input.maxlength = 220;
			input.className = 'data-container';
			input.id = 'do'+i;
			input.setAttribute('data-object', i);
			input.value = neko.helper.conversion.hexToString(hex.hex);
			small = document.createElement('small');
			small.innerText = hex.hex;

			output.appendChild(input);
			output.appendChild(small);
			output.appendChild(document.createElement('hr'));
		}
	}
	document.body.appendChild(output);
};

neko.replace = function(hex) {
	//called from the neko.render function
	var currentReplace, i;

	for (i = 0; i < neko.replace.list.length; i++) {

		currentReplace = neko.replace.list[i];

		if (hex.trim() === currentReplace.findHex) {
			return {replaced: true, hex: currentReplace.newHex};
		}
	}

	return {replaced: false, hex: hex};
};

neko.replace.list = [];

neko.replace.add = function(find, replace, name) {
	var findHex = neko.helper.conversion.stringToHex(find),
		newHex = neko.helper.conversion.stringToHex(replace);

	neko.replace.list.push({
		name: name||'',
		findHex: findHex,
		newHex: newHex
	});
};

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

neko.set = {
	part: function(ia, offset) {
		var length = neko.helper.getLengthFromWord(ia.subarray(offset, offset+4)),
		data = ia.subarray(offset+4, offset+4+length);
		return {
			length: length,
			changed: false,
			garbage: false,
			important: length > 1 && neko.filter(data),
			data: data
		}
	},
	garbage: function(ia, start, end) {
		return {
			changed: false,
			garbage: true,
			important: false,
			data: ia.subarray(start, end)
		}
	}
};