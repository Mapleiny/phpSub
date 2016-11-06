do ()->
	$createArea = $ '#create-area'
	$operationArea = $ '#opration-area'

	$fileCapture = $ '#file-capture'
	$fileSelect = $ '#file-select'
	$fileSelectBtn = $ '#file-select-btn'
	$captureInfo = $fileCapture.find '.info'

	$selectArea = $ '#select-area'
	$imgComtainer = $ '#img-conrainer'
	$minSelect = $ '#min-select'

	$selectPreview = $ '#select-preview'
	$imgPreview = null
	$getMinRepeat = $ '#get-min-repeat'


	$loading = $ '#loading'


	findMinRepeat = null

	$fileSelectBtn.on 'click',()->
		$fileSelect.click()

	fileDrag = new FileDrag
		'dragDrop' : $fileCapture[0]
		'fileInput' : $fileSelect[0]
	fileDrag.filter = (files)->
		fileslist = []

		for file in files
			if file.type.indexOf('image')>=0
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

		$loading.show()
		$createArea.hide()
		reader = new FileReader()

		file = files.shift()

		reader.readAsDataURL file

		reader.onload = ( evt )->
			img = new Image()
			img.src = evt.target.result
			img.onload = ()->
				imageSelectInit img,img.width,img.height 
	screenChange = ( type )->
		if type is 'select'
			$createArea.show()
			$operationArea.hide()
		else
			$createArea.hide()
			$operationArea.show()

	getMinRepeatSize = (imgObject)->
		findMinRepeat = new FindMinRepeat imgObject
		return findMinRepeat.getMinSize()

	getMinRepeatImg = (repeatSize)->
		return findMinRepeat.getMinRepeat repeatSize


	imageSelectInit = (imgObject,originWidth,originHeight)->
		screenChange 'opration'
		$loading.hide()
		maxWidth = $selectArea.width()

		minRepeatSize = getMinRepeatSize imgObject

		if originWidth > maxWidth
			imgObject.width = maxWidth

		$imgObject = $(imgObject)
		$imgObject.appendTo $imgComtainer

		width = $imgObject.width()
		height = $imgObject.height()
		$imgComtainer.width width
		$imgComtainer.height height

		

		createImgSelect {
			'width' : minRepeatSize.width
			'height' : minRepeatSize.height
		},{
			'width' : width
			'height' : height
		},{
			'width' : originWidth
			'height' : originHeight
		}
		$imgPreview = $(imgObject).clone().removeAttr('width')
		createPreview $imgPreview,
			'width' : minRepeatSize.width
			'height' : minRepeatSize.height

	createImgSelect = (originRepeatSize,containerSize,originSize)->
		repeatSize = {}
		scale = containerSize.width / originSize.width

		repeatSize.width = originRepeatSize.width*scale
		repeatSize.height = originRepeatSize.height*scale

		tbwidth = 2*containerSize.width-repeatSize.width
		tbheight = containerSize.height-repeatSize.height

		lrwidth = containerSize.width-repeatSize.width

		divInfoList = [{
			'width'  : tbwidth
			'height' : tbheight
			'bottom' : repeatSize.height
			'left' : repeatSize.width-containerSize.width
		},{
			'width'  : lrwidth
			'height' : repeatSize.height
			'top' : 0
			'left' : repeatSize.width
		},{
			'width'  : tbwidth
			'height' : tbheight
			'top' : repeatSize.height
			'left' : repeatSize.width-containerSize.width
		},{
			'width'  : lrwidth
			'height' : repeatSize.height
			'top' : 0
			'right' : repeatSize.width
		}]
		$minSelect.css repeatSize
		for divInfo in divInfoList
			$minSelect.append $('<div></div>').css divInfo

		addSelectEvent $minSelect,containerSize,originRepeatSize

		

	moveElem = ($elem,x,y,containerSize)->
		repeatWidth = $elem.width()
		repeatHeight = $elem.height()
		rangeX = containerSize.width-repeatWidth
		rangeY = containerSize.height-repeatHeight
		if x < 0 then x = 0
		if x > rangeX then x = rangeX
		if y < 0 then y = 0
		if y > rangeY then y = rangeY

		$elem.css '-webkit-transform','matrix(1, 0, 0, 1, '+x+','+y+')'
		showPreview x,y,containerSize
	getTranslateXY = ($elem)->
		translate = $elem.css '-webkit-transform'
		if translate is 'none'
			translate = 'matrix(1,0,0,1,0,0)'

		translate = translate.replace 'matrix(',''
		translate = translate.replace ')',''
		translate = translate.split ','
		translateX = parseInt translate[4]
		translateY = parseInt translate[5]
		
		return {
			'x' : translateX
			'y' : translateY
		}
	createPreview = ( imgObj , minRepeatSize )->
		$selectPreview.append(imgObj).css minRepeatSize

	showPreview = (x,y,containerSize)->
		translateX = x/containerSize.width*100
		translateY = y/containerSize.height*100
		$imgPreview.css '-webkit-transform','translate(-'+translateX+'%,-'+translateY+'%)'

	addSelectEvent = ($elem,containerSize,repeatSize)->
		isMove = false
		originX = 0
		originY = 0
		currentX = 0
		currentY = 0
		moveSelect = (e)->
			event.preventDefault()
			if isMove
				moveElem $elem,e.pageX-originX+currentX,e.pageY-originY+currentY,containerSize
		$elem.on 'mousedown',(e)->
			event.preventDefault()
			isMove = true
			originX = e.pageX
			originY = e.pageY
			currentTranslate = getTranslateXY $elem
			currentX = currentTranslate.x
			currentY = currentTranslate.y
			$(document).one 'mouseup',(e)->
				isMove = false
				$(document).off 'mousemove.select'
			$(document).on 'mousemove.select',moveSelect
		$getMinRepeat.on 'click',()->
			shift = getTranslateXY $imgPreview
			shift.x = Math.abs shift.x
			shift.y = Math.abs shift.y
			src = getMinRepeatImg shift,repeatSize
			window.open src




			
			
