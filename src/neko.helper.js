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
