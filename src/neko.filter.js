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