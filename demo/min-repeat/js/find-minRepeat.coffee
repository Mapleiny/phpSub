class FindMinRepeat
	createCanvas = ( width , height )->
		canvas = document.createElement('canvas')
		canvas.width = width
		canvas.height = height
		return canvas


	compareArr = ( arr1 , arr2 )->
		for value,index in arr1
			if value isnt arr2[index]
				return false
		return true
	arrayCopy = ( arr )->
		copyArr = []
		for value,index in arr
			copyArr[index] = value
		return copyArr
	arrayTransform = (arr)->
		transform = []
		i = 0
		j = 0
		sumi = arr[0].length
		sumj = arr.length
		`for(;i<sumi;++i){
			if( !transform[i] ){
				transform[i] = []
			}
			for( j=0;j<sumj;++j ){
				transform[i].push( arr[j][i] )
			}
		}`
		return transform
	compare = ( arr )->
		minRepeat = []
		compared = []
		curComp = []
		curCompSum = 0
		curCompIndex = 0
		compareCount = 0

		x = 0
		x2 = 0
		y = 0
		width = arr.length
		height = arr[0].length

		`for( x = 0 ; x < width ; ++x ){
			compared.push(arr[x])
			if( curComp.length == 0 ){
				curComp = arrayCopy(compared)
				curCompSum = curComp.length
			}
			if( curCompIndex === curCompSum ){
				curCompIndex = 0
				compareCount++
			}
			if( !compareArr(curComp[curCompIndex++],arr[x]) ){
				if( compareCount == 0 ){
					curComp.push(arr[curCompSum])
					x = curCompSum
				}else{
					curComp = arrayCopy(compared)
				}
				curCompSum = curComp.length
				curCompIndex = 0
				compareCount = 0
			}

		}`

		return curCompSum

	constructor : ( img )->
		@img = img
		@width = img.width
		@height = img.height
		@canvas = createCanvas @width,@height

	getImageData : ()->
		ctx = @canvas.getContext '2d'
		ctx.drawImage @img,0,0
		return ctx.getImageData 0,0,@width,@height
	imageDataFormat : ()->
		imageData = @getImageData()
		formatData = []
		width = @width
		i = 0
		pixIndex = 0
		x = 0
		sum = imageData.data.length
		`for(; i < sum ; i+=4){
			if(!formatData[x]){
				formatData[x] = []
			}
			formatData[x].push(imageData.data[i].toString(16)+imageData.data[i+1].toString(16)+imageData.data[i+2].toString(16)+imageData.data[i+3].toString(16))
			++pixIndex
			if( pixIndex % width == 0 ){
				x++
			}
		}`
		return formatData
	getMinSize : ()->
		imageDataHW = @imageDataFormat()
		imageDataWH = arrayTransform imageDataHW

		width = compare imageDataWH
		height = compare imageDataHW

		return{
			'height' : height
			'width' : width
		}
	getMinRepeat : (shift,size)->
		size = size || @getMinSize()
		_canvas = createCanvas size.width,size.height
		ctx = @canvas.getContext '2d'
		_ctx = _canvas.getContext '2d'
		imageData = ctx.getImageData shift.x,shift.y,size.width,size.height
		_ctx.putImageData imageData,0,0

		return _canvas.toDataURL()
