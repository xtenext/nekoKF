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
