var FileDrag;

FileDrag = (function() {
	function FileDrag(option) {
		var dragDrop, fileInput, self;
		this.dragDrop = option.dragDrop || null;
		this.fileInput = option.fileInput || null;
		self = this;
		if (this.dragDrop) {
			dragDrop = this.dragDrop;
			dragDrop.addEventListener('dragover', function(e) {
				self.dragHover(e);
			}, false);
			dragDrop.addEventListener('dragleave', function(e) {
				self.dragHover(e);
			}, false);
			dragDrop.addEventListener('drop', function(e) {
				self.getFiles(e);
			}, false);
		}
		if (this.fileInput) {
			this.fileInput.addEventListener('change', function(e) {
				return self.getFiles(e);
			}, false);
		}
	}

	FileDrag.prototype.fileIndex = 0;

	FileDrag.prototype.fileList = {};

	FileDrag.prototype.filter = function(files) {
		return files;
	};

	FileDrag.prototype.dragHover = function(e) {
		e.stopPropagation();
		e.preventDefault();
		this[e.type === "dragover" ? "onDragOver" : "onDragLeave"].call(e.target);
		return this;
	}
	FileDrag.prototype.onDragOver = function(e) {};

	FileDrag.prototype.onDragLeave = function(e) {};

	FileDrag.prototype.onSelect = function(files) {};

	FileDrag.prototype.getFiles = function(e) {
		var files;
		this.dragHover(e);
		files = e.target.files || e.dataTransfer.files;
		if (files === null || typeof files === 'undefined') {
			return;
		}
		return this.dealFiles(files);
	};

	FileDrag.prototype.dealFiles = function(files) {
		var file, _i, _len;
		files = this.filter(files);
		for (_i = 0, _len = files.length; _i < _len; _i++) {
			file = files[_i];
			file._index = this.fileIndex;
			this.fileList[this.fileIndex] = file;
			++this.fileIndex;
		}
		return this.onSelect(files);
	};

	return FileDrag;

})();