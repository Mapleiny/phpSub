class ImgToCharacter
	# (R*30 + G*59 + B*11 + 50) / 100
	createCanvas = (width, height)->
		canvas = document.createElement 'canvas'
		canvas.width = width
		canvas.height = height
		return canvas

	grayToChar = ( gray , characters , charactersWidth)->
		index = Math.floor gray/255*characters.length
		return {
			'char' : characters[index]
			'width' : charactersWidth[index]
		}

	rgbToGray = ( r , g , b )->
		return 0.299 * r + 0.578 * g + 0.114 * b

	charWidthComputed = ( char )->
		span = document.createElement 'span'
		span.setAttribute 'style','display:inline-block;white-space:pre;'
		span.innerHTML = char
		span = document.body.appendChild span
		computedStyle = window.getComputedStyle span,null
		width = parseInt computedStyle['width']
		document.body.removeChild span
		return Math.round width


	createCharMatrix = ( params )->
		imgData = params.imgData || null
		height = params.height || 0
		width = params.width || 0
		charHeight = params.charHeight || 12

		characters = params.characters
		charactersWidth = params.charactersWidth

		if !imgData then return

		heightIndex = 0
		widthIndex = 0
		currentHeight = 0
		currentPoint = 0
		html = []
		`for( heightIndex = 0 ; heightIndex < height ; heightIndex += charHeight ){
			html.push('<p>');
			currentHeight = heightIndex*width*4;
			for( widthIndex = 0 ; widthIndex < width ; widthIndex += charWidth ){
				currentPoint = currentHeight+widthIndex*4;
				r = imgData[currentPoint];
				g = imgData[currentPoint+1];
				b = imgData[currentPoint+2];
				charInfo = grayToChar(rgbToGray(r,g,b),characters,charactersWidth);
				html.push(charInfo.char);
				charWidth = charInfo.width;
			}
			html.push('</p>');
		}`

		return html.join ''

	createCharImage = (params)->
		imgData = params.imgData || null
		height = params.height || 0
		width = params.width || 0
		charHeight = params.charHeight || 12

		characters = params.characters
		charactersWidth = params.charactersWidth

		console.log charactersWidth

		canvas = createCanvas width,height
		ctx = canvas.getContext '2d'

		if !imgData then return 

		heightIndex = 0
		widthIndex = 0
		currentHeight = 0
		currentPoint = 0
		text = []

		charWidth = 0

		`for( heightIndex = 0 ; heightIndex < height ; heightIndex += charHeight ){
			currentHeight = heightIndex*width*4;
			text = [];
			for( widthIndex = 0 ; widthIndex < width ; widthIndex += charWidth ){
				currentPoint = currentHeight+widthIndex*4;
				r = imgData[currentPoint];
				g = imgData[currentPoint+1];
				b = imgData[currentPoint+2];
				charInfo = grayToChar(rgbToGray(r,g,b),characters,charactersWidth);
				text.push(charInfo.char);
				charWidth = charInfo.width;

			}
			ctx.strokeText(text.join(''),0,heightIndex);
		}`

		return canvas.toDataURL()
	constructor : (imgObj)->
		@imgObj = imgObj

		@setCharacter()


	characters : ['#','&','$','*','o','!',';',' ']
	charactersWidth : []
	length : 8

	charHeight : 12

	setCharacter : (characters)->
		@characters = characters || @characters
		@length = @characters.length

		for char,index in @characters
			@charactersWidth[index] = charWidthComputed char


	create : ( type = 'char' )->
		width = @imgObj.width
		height = @imgObj.height
		canvas = createCanvas width,height
		ctx = canvas.getContext '2d'

		ctx.drawImage @imgObj,0,0

		imgDataObj = ctx.getImageData 0,0,width,height
		imgData = imgDataObj.data

		createParams = 
			'imgData' : imgData
			'height' : height
			'width' : width
			'charHeight' : @charHeight
			'characters' : @characters
			'charactersWidth' : @charactersWidth

		if type is 'char'
			return createCharMatrix createParams
		else
			return createCharImage createParams
