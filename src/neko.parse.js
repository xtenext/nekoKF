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
