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