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
