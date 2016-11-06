do( DOC = document )->
	screenWidth = DOC.body.clientWidth
	html = DOC.getElementsByTagName('html')[0]
	html.style.fontSize = 10*screenWidth/320+'px'
do( WIN = window , DOC = document )->
	$container = $ '#game-capture'
	$block1 = $container.find '.block1'
	$block2 = $container.find '.block2'

	containerHeight = $container.height()
	eachHeight = containerHeight/3

	currentBlock = 1
	$currentBlock = $block1
	$nextBlock = $block2

	currentStep = 2

	isGameOver = false

	score = 0



	createRow = (rowIndex,blockNo)->
		contentHtml = []
		contentHtml.push '<div class="row">'
		safePos = createSafePos()
		
		for colIndex in [0...4]
			safe = ''
			if colIndex is safePos then safe = ' safe'
			contentHtml.push """<div class="col#{safe}" row="#{rowIndex}" col="#{colIndex}" block="#{blockNo}"></div>"""
		
		contentHtml.push '</div>'
		return contentHtml.join ''

	createSafePos = ()->
		return Math.floor(Math.random()*4)


	gameInit = ()->
		for i in [0...3]
			$block1.append createRow i,1
			$block2.append createRow i,2
		setBeginPos $block2
		eventHandle()
		return
	gameRest = ()->
		$block1.empty()
		$block2.empty()
		currentBlock = 1
		$currentBlock = $block1
		$nextBlock = $block2
		currentStep = 2
		isGameOver = false
		score = 0
		for i in [0...3]
			$block1.append createRow i,1
			$block2.append createRow i,2
		resetPos $block1
		setBeginPos $block2
		return

	gameOver = ( $elem )->
		isGameOver = true
		alert 'gameOver!得分：'+score
		gameRest()

	gameStatus = ( $elem )->
		block = +$elem.attr 'block'
		row = +$elem.attr 'row'
		isSafe = $elem.hasClass 'safe'
		if isGameOver then return
		if block is currentBlock and row is currentStep
			if isSafe
				next()
			else
				gameOver $elem 
		return
	next = ()->
		score++
		poxY = setStepPos currentStep
		animateTo $currentBlock,poxY.currentBlock
		animateTo $nextBlock,poxY.nextBlock

		if currentStep is 0
			blockNo = currentBlock
			if currentBlock is 1
				currentBlock = 2
				$currentBlock = $block2
				$nextBlock = $block1
			else
				currentBlock = 1
				$currentBlock = $block1
				$nextBlock = $block2
			currentStep = 3
			$nextBlock.on 'webkitTransitionEnd',()->
				setBeginPos $nextBlock
				createBlock $nextBlock,blockNo
				$nextBlock.off 'webkitTransitionEnd'
		--currentStep

	createBlock = ( $elem , blockNo )->
		$elem.empty()
		for i in [0...3]
			$elem.append createRow i,blockNo
		return
		

	animateTo = ( $elem , posY )->
		$elem.addClass 'animate'
			.css '-webkit-transform','matrix(1, 0, 0, 1, 0,'+posY+')'

	resetPos = ( $elem )->
		$elem.removeClass 'animate'
			.css '-webkit-transform','matrix(1, 0, 0, 1, 0,0)'

	setBeginPos = ( $elem )->
		$elem.removeClass 'animate'
			.css '-webkit-transform','matrix(1, 0, 0, 1, 0,'+-containerHeight+')'
	setStepPos = ( step )->
		step = 3 - step
		return {
			'currentBlock' : step*eachHeight
			'nextBlock' : step*eachHeight-containerHeight
		}
	eventHandle = ()->
		$ 'html'
			.on 'touchstart touchmove touchend',(e)->
				event.preventDefault()
		$container.on 'touchstart','.col',()->
			gameStatus $ @
	do gameInit