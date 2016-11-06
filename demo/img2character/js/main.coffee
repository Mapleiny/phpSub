do ()->
	$createArea = $ '#create-area'
	$resualtArea = $ '#resualt-area'

	$fileCapture = $ '#file-capture'
	$fileSelect = $ '#file-select'
	$fileSelectBtn = $ '#file-select-btn'
	$captureInfo = $fileCapture.find '.info'




	imgToCharacter = null
	imageCut = null
	$imgPreview = $ '#img-preview'
	$charDisplay = $ '#char-display'


	$fileSelectBtn.on 'click',()->
		$fileSelect.click()

	fileDrag = new FileDrag
		'dragDrop' : $fileCapture[0]
		'fileInput' : $fileSelect[0]
	fileDrag.filter = (files)->
		fileslist = []

		for file in files
			# if file.type.indexOf('image')>=0
			fileslist.push file
		return fileslist

	fileDrag.onDragOver = (e)->
		$captureInfo.html '可以放手了，大侠！'
		$fileCapture.addClass 'hover'
	fileDrag.onDragLeave = (e)->
		$captureInfo.html '将图片拖进此处或'
		$fileCapture.removeClass 'hover'
	fileDrag.onSelect = (files)->

		if files.length is 0 then return

		reader = new FileReader()

		file = files.shift()

		reader.readAsBinaryString file

		reader.onload = ( evt )->
			# console.log evt
			workbook = XLSX.read evt.target.result, {type: 'binary'}
			
			# img = new Image()
			# img.src = evt.target.result
			# img.onload = ()->
			# 	resultDisplay img

	resultDisplay = (imgObj)->
		$createArea.hide()
		$resualtArea.show()
		imageCut = new ImageCut imgObj

		imageCut.setCutParams
			'maxWidth' : 500
		imageCut.create (newImgObj)->
			imgToCharacter = new ImgToCharacter newImgObj
			$imgPreview.html newImgObj


	eventHandle = ()->
		$resualtArea.on 'click','.compile',()->
			$this = $ @
			type = $this.data 'type'
			result = imgToCharacter.create type
			console.log type
			if type is 'char'
				$charDisplay.html result
			else
				$charDisplay.html '<img src="'+result+'">'
	eventHandle()



























