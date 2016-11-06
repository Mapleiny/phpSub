Object.prototype.deepClone = function(){
	var obj = {};
	for( var key in this ){
		if( key == 'deepClone' || this[key] == null ){
            continue;
        }
		if( this[key].toString() == "[object Object]" ){
			obj[key] = this[key].deepClone();
		}else if( this[key] instanceof Array ){
			obj[key] = this[key].deepClone();
		}else{
			obj[key] = this[key];
		}
	}
	return obj;
};
Array.prototype.deepClone = function(){
	var i , sum , arr = [];
	for( i = 0 , sum = this.length ; i < sum ; ++i ){
		if( !this[i] ){
			continue;
		}
		if( this[i].toString() == "[object Object]" ){
			arr[i] = this[i].deepClone();
		}else if( this[i] instanceof Array ){
			arr[i] = this[i].deepClone();
		}else{
			arr[i] = this[i];
		}
	}
	return arr;
};
Array.prototype.del = function(n){
	if(n<0){
		return this;
	}else{
		return this.slice( 0 , n ).concat( this.slice( n + 1 , this.length ) );
	}
};


var createCanvas = function( width , height ){
	var _canvas = document.createElement('canvas');
	_canvas.width = width;
	_canvas.height = height;
	return _canvas;
};
var randomArea = function(init){
	var x = Math.random(),
		result = [],
		key;
	for( key in init ){
		if( x < init[key].percent ){
			result.push(init[key].value);
		}
	}
	return result;
};

var Aircraft = function(init){
	for( var key in init ){
		this[key] = init[key];
	}
	this.fly = this.fly();
	this.damage = this.damage();
	this.destroy = this.destroy();
	this.weapon = [];
	this.area = [[0,0],[0,0]];
	this.loadWeapon();
};
Aircraft.prototype = {
	health : 0,
	speed : 0,
	score : 0,
	die : false,
	checkArea : true,
	ownWeapon : null,
	animateType : 'fly',
	fly : function(){
		return function(){};
	},damage : function(){
		return function(){};
	},destroy : function(){
		return function(){};
	},loadWeapon : function(){
		var i ,sum ,
			weaponList = this.weaponList,
			weapon = [];
		
		if( weaponList instanceof Array ){
			if( weaponList.length == 0 ){
				this.getOwnWeapon();
			}
			for( i = 0 , sum = weaponList.length ; i < sum ; ++i ){
				weapon.push(new Weapon(weaponList[i].deepClone(),this));
			}
		}
		this.weapon = weapon;
		return this;
	},remove : function(){
		if( this.shape.destY > 1000 ){
			this.die = true;
		}
		return this.die;
	},move : function(){
		this.shape.destY += this.speed;
	},control : function(){
		if( !this.isDied() ){
			this.move();
		}
		this.updataArea();
		this[this.animateType].call(this);
		return null;
	},isDied : function(){
		if( this.health > 0 ){
			return false;
		}else{
			this.animateType = 'destroy';
			this.checkArea = false;
			return true;
		}
	},getDamage : function( attack ){
		this.health -= attack;
		this.animateType = 'damage';
		return this;
	},updataArea : function(){
		var x = (this.shape.destWidth - this.size[0])/2,
			y = (this.shape.destHeight - this.size[1])/2;
		this.area[0][0] = x + this.shape.destX;
		this.area[0][1] = y + this.shape.destY;
		this.area[1][0] = this.area[0][0] + this.size[0];
		this.area[1][1] = this.area[0][1] + this.size[1];
		return this;
	},fire : function(){
		var i , sum , 
		weapon = this.weapon,
		bullets = [];
		for( i = 0 , sum = weapon.length ; i < sum ; ++i ){
			if( !weapon[i].isEmpty() ){
				bullets = bullets.concat( weapon[i].fire() );
			}else{
				this.weaponList = this.weaponList.del(i);
				this.loadWeapon();
			}
		}
		return bullets;
	},weaponUpgrade : function(weaponObj,name){
		var i , sum,
			weaponList = this.weaponList;
		for( i = 0 , sum = weaponList.length ; i < sum ; ++i ){
			if( weaponList[i].name == name ){
				weaponList[i] = weaponObj;
			}
		}
		this.loadWeapon();
	},addWeapon : function(weaponObj){
		this.weaponList.push(weaponObj);
		this.loadWeapon();
	},getOwnWeapon : function(){
		this.weaponList.push(this.ownWeapon);
	}
};
var Weapon = function( init , airCraft ){
	for( var key in init ){
		this[key] = init[key];
	}
	this.airCraft = airCraft;
	this.fire = null;
	this.loadBullet();
};
Weapon.prototype = {
	airCraft : null,
	bullet : null,
	bulletSum : 0,
	speed : 0,
	posX : 0,
	posY : 0,
	shiftX : 0,
	shiftY : 0,
	upgrade : function(init){
		for( var key in init ){
			this[key] = init[key];
		}
	},updataPos : function(){
		var airCraftShape = this.airCraft.shape;
		this.posX = airCraftShape.destX+this.shiftX;
		this.posY = airCraftShape.destY+this.shiftY;
		return this;
	},loadBullet : function(){
		this.fire = (function(speed,_this){
			var time,count;
			time = count = speed;
			return function(){
				var bulletList = [],
					bulletObj = [];
				
				if( count != 0 ){
					--count;
					return [];
				}else{
					count = time;
					if( _this.isEmpty() ){
						return [];
					}
					--_this.bulletSum;
					_this.updataPos();
					bulletList = _this.bulletBeforeFire(_this.bullet.deepClone());
					if( bulletList instanceof Array ){
						for( i = 0 , sum = bulletList.length ; i < sum ; ++i ){
							bulletObj.push(new Bullet(bulletList[i]));
						}
					}
					return bulletObj;
				}
			};
		})(this.speed,this);
	},bulletRunout : function(){
		this.bullet = normalBullet;
		this.bulletSum = Infinity;
	},bulletBeforeFire : function(){
		return [];
	},isEmpty : function(){
		return this.bulletSum <= 0;
	}
};
var Bullet = function( init ){
	for( var key in init ){
		this[key] = init[key];
	}
	this.area = [[0,0],[0,0]];
	this.fly = this.fly();
	this.damage = this.damage();
	this.destroy = this.destroy();
};
Bullet.prototype = {
	speed : 0,
	health : 0,
	attack : 0,
	die : false,
	animateType : 'fly',
	checkArea : true,
	fly : function(){
		return function(){};
	},damage : function(){
		return function(){};
	},destroy : function(){
		return function(){
			this.die = true;
		};
	},control : function(){
		if( !this.isDied() ){
			this.move();
		}
		this.updataArea();
		this[this.animateType].call(this);
		return null;
	},getDamage : function( attack ){
		this.health -= attack;
		return this;
	},remove : function(){
		if( this.shape.destY < 0 ){
			this.die = true;
		}
		return this.die;
	},move : function(){
		this.shape.destY -= this.speed;
	},updataArea : function(){
		var x = (this.shape.destWidth - this.size[0])/2,
			y = (this.shape.destHeight - this.size[1])/2;
		this.area[0][0] = x + this.shape.destX;
		this.area[0][1] = y + this.shape.destY;
		this.area[1][0] = this.area[0][0] + this.size[0];
		this.area[1][1] = this.area[0][1] + this.size[1];
		return this;
	},isDied : function(){
		if( this.health > 0 ){
			return false;
		}else{
			this.animateType = 'destroy';
			this.checkArea = false;
			return true;
		}
	}
};
var Supply = function( init ){
	for( var key in init ){
		this[key] = init[key];
	}
	this.area = [[0,0],[0,0]];
	this.fly = this.fly();
	this.damage = this.damage();
	this.destroy = this.destroy();
};
Supply.prototype = {
	type : '', // upgrade、add
	upgradeTarget : '',
	value : null,
	speed : 0,
	health : 1,
	die : false,
	checkArea : true,
	animateType : 'fly',
	fly : function(){
		return function(){};
	},damage : function(){
		return function(){};
	},destroy : function(){
		return function(){
			this.die = true;
		};
	},remove : function(){
		if( this.shape.destY > 1000 ){
			this.die = true;
		}
		return this.die;
	},control : function(){
		if( !this.isDied() ){
			this.move();
		}
		this.updataArea();
		this[this.animateType].call(this);
		return null;
	},updataArea : function(){
		var x = (this.shape.destWidth - this.size[0])/2,
			y = (this.shape.destHeight - this.size[1])/2;
		this.area[0][0] = x + this.shape.destX;
		this.area[0][1] = y + this.shape.destY;
		this.area[1][0] = this.area[0][0] + this.size[0];
		this.area[1][1] = this.area[0][1] + this.size[1];
		return this;
	},move : function(){
		this.shape.destY += this.speed;
	},getSupply : function(){
		return this.value.deepClone();
	},isDied : function(){
		if( this.health > 0 ){
			return false;
		}else{
			this.animateType = 'destroy';
			this.checkArea = false;
			return true;
		}
	},getDamage : function( attack ){
		this.health -= attack;
		return this;
	}
};
var GameControl = function( ctx , player , enemy , supply , width , height ){
	this.ctx = ctx;
	this.player = new Aircraft(player);
	this.enemyList = enemy;
	this.supplyList = supply;
	this.maxWidth = width;
	this.maxHeight = height;
	this._canvasBuffer = createCanvas( width , height );
	this._ctx = this._canvasBuffer.getContext('2d');
	this.keyBoardEvet(this.player);
};
GameControl.prototype = {
	$score : $('#score'),
	ctx : null,
	_canvasBuffer : null,
	_ctx : null,
	player : null,
	enemyList : null,
	supplyList : null,
	bulletControlList : [],
	enemyControlList : [],
	supplyControlList : [],
	animateList : [],
	maxWidth : 0,
	maxHeight : 0,
	time : 0,
	score : 0,
	push : function( obj , type ){
		if( obj ){
			var i ,sum;
			switch(type){
				case 'bullet' :
					for( i = 0 , sum = obj.length ; i < sum ; ++i ){
						this.bulletControlList.push(obj[i]);
					}
					break;
				case 'enemy' : 
					this.enemyControlList.push(obj);
					break;
				case 'supply':
					this.supplyControlList.push(obj);
			}
		}
		return this;
	},remove : function(index){
		this.animateList.del(index);
		return this;
	},draw : function(){
		this.control();
		var i ,
			sum ,
			animateList = this.animateList,
			ctx = this.ctx,
			_ctx = this._ctx,
			_canvasBuffer = this._canvasBuffer;
		_ctx.clearRect( 0 , 0 , this.maxWidth , this.maxHeight );
		for( i = 0 , sum = animateList.length ; i < sum ; ++i ){
			this.drawFactory(_ctx,animateList[i]);
		}
		ctx.drawImage(_canvasBuffer, 0, 0);
		return this;
	},drawFactory : function(ctx,obj){
		var _canvas,_ctx;
		if( obj.rotate ){
			_canvas = createCanvas(obj.destWidth , obj.destHeight);
			_ctx = _canvas.getContext('2d');
			_ctx.rotate(obj.rotate);
			_ctx.translate();
			_ctx.drawImage( obj.image , obj.sourceX , obj.sourceY , obj.sourceWidth , obj.sourceHeight , 0 , 0 , obj.destWidth , obj.destHeight );
			ctx.drawImage(_canvas, 0 , 0 , obj.sourceWidth , obj.sourceHeight , obj.destX , obj.destY , obj.destWidth , obj.destHeight );
			_canvas = null;
		}else{
			ctx.drawImage( obj.image , obj.sourceX , obj.sourceY , obj.sourceWidth , obj.sourceHeight , obj.destX , obj.destY , obj.destWidth , obj.destHeight );
		}
	},control : function(){
		var i , sum ,
			enemyControlList = this.enemyControlList,
			bulletControlList = this.bulletControlList,
			supplyControlList = this.supplyControlList;
		this.animateList = [];
		if( this.player.remove() ){
			//game over
			//alert( 'game over' );
		}
		this.player.control();
		this.push(this.player.fire(),'bullet');
		this.animateList.push(this.player.shape);


		i = 0 , sum = enemyControlList.length;
		
		while( i < sum ){
			if( enemyControlList[i]['remove']() ){
				this.score += enemyControlList[i].score;
				this.enemyControlList = enemyControlList.del(i);
			}
			this.animateList.push(enemyControlList[i]['shape']);
			enemyControlList[i]['control']();
			++i;
		}

		i = 0 , sum = bulletControlList.length;

		while( i < sum ){
			if( bulletControlList[i]['remove']() ){
				this.bulletControlList = bulletControlList.del(i);
			}
			this.animateList.push(bulletControlList[i]['shape']);
			bulletControlList[i]['control']();
			++i;
		}

		i = 0 , sum = supplyControlList.length;

		while( i < sum ){
			if( supplyControlList[i]['remove']() ){
				this.supplyControlList = supplyControlList.del(i);
			}
			this.animateList.push(supplyControlList[i]['shape']);
			supplyControlList[i]['control']();
			++i;
		}
		
		this.cheakDistance();
		this.addEnemy();
		this.addSupply();
		this.showScore();
	},cheakDistance : function(){
		// check palyer and enemy
		var i , sumi , j , sumj,
			eAList = this.enemyControlList,
			bAList = this.bulletControlList,
			sAlList = this.supplyControlList,
			player = this.player;

		for( i = 0 , sumi = eAList.length ; i < sumi ; ++i ){
			if( player.checkArea && eAList[i].checkArea && this.checkOverlap( player.area , eAList[i].area ) ){
				player.getDamage( eAList[i].attack );
			}
		}

		for( i = 0 , sumi = sAlList.length ; i < sumi ; ++i ){
			if( player.checkArea && sAlList[i].checkArea && this.checkOverlap( player.area , sAlList[i].area ) ){
				switch( sAlList[i].type ){
					case 'upgrade' :
						player.weaponUpgrade( sAlList[i].getSupply() , sAlList[i].upgradeTarget );
						sAlList[i].getDamage(1);
						break;
				}
				
			}
		}

		// check bullet and enemy
		
		for( i = 0 , sumi = eAList.length ; i < sumi ; ++i ){
			for( j = 0 , sumj = bAList.length ; j < sumj ; ++j ){
				if( eAList[i].checkArea && bAList[j].checkArea && this.checkOverlap( eAList[i].area , bAList[j].area ) ){
					eAList[i].getDamage(bAList[j].attack);
					bAList[j].getDamage(eAList[i].attack);
				}
			}
		}
	},addEnemy : function(){
		var index = randomArea(this.randEnemy),
				enemy,
				i,
				sum;
		if( Math.random() < 0.03 ){
			for( i = 0 , sum = index.length ; i < sum ; ++i ){
				this.enemyList[index[i]].shape.destX = Math.ceil(Math.random()*(this.maxWidth-this.enemyList[index[i]].shape.destWidth));
				enemy = this.enemyList[index[i]].deepClone();
				this.push( new Aircraft(enemy) , 'enemy' );
			}
		}
	},addSupply : function(){
		if( Math.random() < 0.001 ){
			this.supplyList[0].shape.destX = Math.ceil(Math.random()*(this.maxWidth-this.supplyList[0].shape.destWidth))
			this.push( new Supply(this.supplyList[0].deepClone()) , 'supply' );
		}
	},levelControl : function(){	
	},checkOverlap : function( arr1 , arr2 ){
		if( arr1[1][0] < arr2[0][0] || arr1[1][1] < arr2[0][1] || arr1[0][0] > arr2[1][0] || arr1[0][1] > arr2[1][1] ){
			return false;
		}else{
			return true;
		}
	},randEnemy : [
		{
			percent : 0.7,
			value : 0
		},{
			percent : 0.25,
			value : 1
		},{
			percent : 0.05,
			value : 2
		}
	],keyBoardEvet : function(obj){
		var arrowUp = 38,
			arrowRight = 39,
			arrowDown = 40,
			arrowLeft = 37;

		$(window).on('keydown',function(e){
			var keyCode = e.keyCode;
			if( keyCode == arrowUp ){
				obj.moveUp = true;
			}else if( keyCode == arrowRight ){
				obj.moveRight = true;
			}else if( keyCode == arrowDown ){
				obj.moveDown = true;
			}else if( keyCode == arrowLeft ){
				obj.moveleft = true;
			}
		});
		$(window).on('keyup',function(e){
			var keyCode = e.keyCode;
			if( keyCode == arrowUp ){
				obj.moveUp = false;
			}else if( keyCode == arrowRight ){
				obj.moveRight = false;
			}else if( keyCode == arrowDown ){
				obj.moveDown = false;
			}else if( keyCode == arrowLeft ){
				obj.moveleft = false;
			}
		});


		$('#canvas')[0].addEventListener('touchstart',function(e){
			var touchPoint = e.touches[0];
			if( !(touchPoint.pageX < obj.shape.destX || touchPoint.pageY < obj.shape.destY || touchPoint.pageX > (obj.shape.destX+obj.shape.destWidth) || touchPoint.pageY > (obj.shape.destY+obj.shape.destHeight)) ){
				obj.touchmove = true;
			}
		});
		$('#canvas')[0].addEventListener('touchmove',function(e){
			var touchPoint = e.touches[0];
			if( obj.touchmove ){
				obj.shape.destX = touchPoint.pageX-30;
				obj.shape.destY = touchPoint.pageY-60;
			}
		});
		$('#canvas')[0].addEventListener('touchend',function(e){
			obj.touchmove = false;
		});
	},showScore : function(){
		this.$score.html(this.score);
	}
};

$(function(){
	var $canvas = $('#canvas'),
		ctx = $canvas.get(0).getContext('2d'),
		canvasWidth = $canvas.width(),
		canvasHeight = $canvas.height(),
		shoot = new Image(),
		shootBackground = new Image(),
		scale = 1,
		resizeCanvas = function(){
			var height = $(window).height() > 850 ? 850 : $(window).height(),
				width = $(window).width() > 480 ? 480 : $(window).width();
			$canvas.attr('width', width);
			$canvas.attr('height',height);
			canvasWidth = $canvas.width();
			canvasHeight = $canvas.height();
			scale = height / 850;
		};
		resizeCanvas();

	shoot.src = 'images/shoot.png';
	shootBackground.src = 'images/shoot_background.png';

	var normalBullet = {
		speed : 20,
		attack : 1,
		health : 1,
		shape : {
			image : shoot,
			sourceX : 1004,
			sourceY : 987,
			sourceWidth : 10,
			sourceHeight : 22,
			destX : 0,
			destY : 0,
			destWidth : 10* scale,
			destHeight : 22* scale
		},size : [10*scale,18*scale]
	},blueBullet = {
		speed : 20,
		attack : 3,
		health : 1,
		shape : {
			image : shoot,
			sourceX : 69,
			sourceY : 77,
			sourceWidth : 10,
			sourceHeight : 22,
			destX : 0,
			destY : 0,
			destWidth : 10 * scale,
			destHeight : 22 * scale
		},size : [10*scale,22*scale]
	},trackingMissiles = {
		speed : 10,
		attack : 1,
		health : 1,
		fly : function(){
			var time , count;
			time = count = 20;
			return function(){
				switch( count ){
					case time :
						this.shape.sourceX = 115;
						this.shape.sourceY = 37;
						break;
					case time / 2 :
						this.shape.sourceX = 99;
						this.shape.sourceY = 37;
						break;
				}
				--count;
				if( count < 0 ){
					count = time
				}
			}
		},shape : {
			image : shoot,
			sourceX : 99,
			sourceY : 37,
			sourceWidth : 15,
			sourceHeight : 51,
			destX : 0,
			destY : 0,
			destWidth : 15*scale,
			destHeight : 51*scale
		},size : [15*scale,51*scale]
	},normalWeapon = {
		name : 'normalWeapon',
		bullet : normalBullet,
		bulletSum : Infinity,
		speed : 5,
		shiftX : 50*scale,
		shiftY : -10*scale,
		bulletBeforeFire : function(bullet){
			bullet.shape.destX = this.posX;
			bullet.shape.destY = this.posY;
			return [bullet];
		}
	},doubleBulletWeapon = {
		name : 'doubleBulletWeapon',
		bullet : blueBullet,
		bulletSum : 100,
		speed : 5,
		shiftX : 50*scale,
		shiftY : -10*scale,
		bulletBeforeFire : function(bullet){
			var bullet1 = bullet.deepClone(),
				bullet2 = bullet.deepClone();
			bullet1.shape.destX = this.posX-30*scale;
			bullet1.shape.destY = this.posY+20*scale;
			bullet2.shape.destX = this.posX+30*scale;
			bullet2.shape.destY = this.posY+20*scale;
			return [bullet1,bullet2];
		}
	},trackingMissilesWeapon = {
		name : 'trackingMissilesWeapon',
		bullet : trackingMissiles,
		bulletSum : Infinity,
		speed : 40,
		shiftX : 50,
		shiftY : -10,
		bulletBeforeFire : function(bullet){
			var bullet1 = bullet.deepClone(),
				bullet2 = bullet.deepClone();
			bullet1.shape.destX = this.posX-36;
			bullet1.shape.destY = this.posY+30;
			bullet2.shape.destX = this.posX+30;
			bullet2.shape.destY = this.posY+30;
			return [bullet1,bullet2];
		}
	},playerAircraft = {
		moveUp : false,
		moveDown : false,
		moveleft : false,
		moveRight : false,
		health : Infinity,
		speed : 6,
		score : 0,
		touchmove : false,
		ownWeapon : normalWeapon,
		weaponList : [normalWeapon],
		fly : function(){
			var time , count;
			time = count = 20;
			return function(){
				switch( count ){
					case time :
						this.shape.sourceX = 165;
						this.shape.sourceY = 360;
						break;
					case time / 2 :
						this.shape.sourceX = 0;
						this.shape.sourceY = 99;
						break;
				}
				--count;
				if( count < 0 ){
					count = time
				}
			}
		},damage : function(){
			var time , count;
			time = count = 20;
			return function(){
				switch( count ){
					case time :
						this.shape.sourceX = 165;
						this.shape.sourceY = 360;
						break;
					case time / 2 :
						this.shape.sourceX = 0;
						this.shape.sourceY = 99;
						break;
				}
				--count;
				if( count < 0 ){
					count = time
				}
			}
		},destroy : function(){
			var time , count;
			time = count = 20;
			return function(){
			}
		},move : function(){
			if( this.moveUp && this.shape.destY > 0 ){
				this.shape.destY -= this.speed;
			}
			if( this.moveDown && this.shape.destY < canvasHeight - this.shape.destHeight ){
				this.shape.destY += this.speed;
			}
			if( this.moveleft && this.shape.destX > 0 ){
				this.shape.destX -= this.speed;
			}
			if( this.moveRight && this.shape.destX < canvasWidth - this.shape.destWidth ){
				this.shape.destX += this.speed;
			}
		},
		shape : {
			image : shoot,
			sourceX : 0,
			sourceY : 99,
			sourceWidth : 100,
			sourceHeight : 120,
			destX : canvasWidth / 2 - 50,
			destY : canvasHeight - 150,
			destWidth : 100*scale,
			destHeight : 120*scale
		},size : [40*scale,120*scale]
	},shape1Aircraft = {
		health : 1,
		speed : 5,
		score : 1000,
		attack : 1,
		destroy : function(){
			var time,count;
			time = count = 32;
			return function(){
				switch( count ){ 
					case time :
						this.shape.sourceX = 268; // 268
						this.shape.sourceY = 350; // 350
						break;
					case time * 3 / 4 :
						this.shape.sourceX = 874;
						this.shape.sourceY = 700;
						break;
					case time * 2 / 4:
						this.shape.sourceX = 268;
						this.shape.sourceY = 300;
						break;
					case time / 4:
						this.shape.sourceX = 933;
						this.shape.sourceY = 700;
						break;
					case 0 : 
					    this.die = true;
						break;
				}
				--count;		
			}
		},shape : {
			image : shoot,
			sourceX : 535, // 535
			sourceY : 610, // 610
			sourceWidth : 56,
			sourceHeight : 45,
			destX : 0,
			destY : -100,
			destWidth : 56*scale, 
			destHeight : 45*scale,
		},size : [48*scale,45*scale]
	},shape2Aircraft = {
		health : 10,
		speed : 3,
		score : 6000,
		attack : 1,
		damage : function(){
			var time , count;
			time = count = 20;
			return function(){
				switch( count ){
					case time :
						this.shape.sourceX = 432;
						this.shape.sourceY = 527;
						break;
					case time / 2 :
						this.shape.sourceX = 0;
						this.shape.sourceY = 2;
						break;
				}

				--count;
				if( count < 0 ){
					count = time;
				}
			};
		},destroy : function(){
			var time,count;
			time = count = 32;
			return function(){
				switch( count ){
					case time :
						this.shape.sourceX = 534;
						this.shape.sourceY = 657;
						break;
					case time * 3 / 4 :
						this.shape.sourceX = 603;
						this.shape.sourceY = 657;
						break;
					case time * 2 / 4:
						this.shape.sourceX = 672;
						this.shape.sourceY = 656;
						break;
					case time / 4:
						this.shape.sourceX = 741;
						this.shape.sourceY = 657;
						break;
					case 0 :
					    this.die = true;
					    break;
				}
				--count;
			}
		},shape : {
			image : shoot,
			sourceX : 0, // 0
			sourceY : 2, // 2
			sourceWidth : 69,
			sourceHeight : 93,
			destX : 0,
			destY : -100,
			destWidth : 69*scale, 
			destHeight : 93*scale,
		},size : [69*scale,93*scale]
	},shape3Aircraft = {
		health : 30,
		speed : 2,
		score : 30000,
		attack : 1,
		fly : function(){
			var time , count;
			time = count = 20;
			return function(){
				switch( count ){
					case time :
						this.shape.sourceX = 507;
						this.shape.sourceY = 749;
						break;
					case time / 2 :
						this.shape.sourceX = 338;
						this.shape.sourceY = 749;
						break;
				}
				--count;
				if( count < 0 ){
					count = time;
				}
			}
		},damage : function(){
			var time , count;
			time = count = 8;
			return function(){
				switch( count ){
					case time :
						this.shape.sourceX = 169;
						this.shape.sourceY = 749;
						break;
					case time / 2 :
						this.shape.sourceX = 338;
						this.shape.sourceY = 749;
						break;
				}
				--count;
				if( count < 0 ){
					count = time
				}
			};
		},destroy : function(){
			var time,count;
			time = count = 48;
			return function(){
				switch( count ){
					case time :
						this.shape.sourceX = 1;
						this.shape.sourceY = 485;
						break;
					case time * 5 / 6 :
						this.shape.sourceX = 1;
						this.shape.sourceY = 223;
						break;
					case time * 4 / 6:
						this.shape.sourceX = 840;
						this.shape.sourceY = 746;
						break;
					case time * 3 / 6:
						this.shape.sourceX = 166;
						this.shape.sourceY = 484;
						break;
					case time * 2 / 6:
						this.shape.sourceX = 674;
						this.shape.sourceY = 745;
						break;
					case time / 6:
						this.shape.sourceX = 3; // 3
						this.shape.sourceY = 756; // 756
						break;
					case 0 :
						this.die = true;
						break;
				}
				--count;
			}
		},shape : {
			image : shoot,
			sourceX : 338, // 338
			sourceY : 749, // 749
			sourceWidth : 164,
			sourceHeight : 256,
			destX : 0,
			destY : -300,
			destWidth : 164*scale, 
			destHeight : 256*scale,
		},size : [164*scale,256*scale]
	},supplyBlueBullet = {
		type : 'upgrade', // upgrade、add
		upgradeTarget : 'normalWeapon',
		value : doubleBulletWeapon,
		speed : 10,
		shape : {
			image : shoot,
			sourceX : 266,
			sourceY : 398,
			sourceWidth : 57,
			sourceHeight : 86,
			destX : 0,
			destY : -100,
			destWidth : 57*scale,
			destHeight : 86*scale
		},size : [57*scale,86*scale]
	};
	var player = playerAircraft,
	enemylist = [
		shape1Aircraft,
		shape2Aircraft,
		shape3Aircraft
	],supplyList = [
		supplyBlueBullet
	],
	gameControl = new GameControl(ctx,player,enemylist,supplyList,canvasWidth,canvasHeight);
	



	var FPS = 60,

		Frames = 0,

		Second = 0,

		beginTime = 0,

		showFPS = $('#FPS').find('span'),

		playAnimation = true,

		shootBackgroundPosY = 0,

		draw = function(obj){
			ctx.drawImage( obj.image , obj.sourceX , obj.sourceY , obj.sourceWidth , obj.sourceHeight , obj.destX , obj.destY , obj.destWidth , obj.destHeight );
		},animate = function(){
			ctx.clearRect( 0 , 0 , canvasWidth , canvasHeight );
			drawBackground();
			
			Second = (new Date().getTime() - beginTime);
			Frames++;

			if( Second >= 300 ){
				showFPS.html(Math.ceil(Frames*1000/Second));
				beginTime = new Date().getTime();
				Second = 0;
				Frames = 0;
			}
			//draw( supplyBlueBullet.shape );
			gameControl.draw();
			if( playAnimation ){
				setTimeout( animate , 1000 / FPS );
			}
		},drawBackground = function(){
			shootBackgroundPosY = shootBackgroundPosY >= canvasHeight ? 0 : shootBackgroundPosY;
			ctx.drawImage( shootBackground , 0 , 75 , canvasWidth , canvasHeight , 0 , shootBackgroundPosY , canvasWidth , canvasHeight );
			ctx.drawImage( shootBackground , 0 , 75 , canvasWidth , canvasHeight , 0 , shootBackgroundPosY-canvasHeight , canvasWidth , canvasHeight );
			shootBackgroundPosY += 5;
		};
	$('#begin').click(function(){
		animate();
		$('#begin').hide();
	});
	$('#begin').click(); 
});