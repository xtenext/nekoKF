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
