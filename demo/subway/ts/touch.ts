import {Draw} from './draw'
import {selectTips} from './selectTips'
import {stationMark} from './stationMark'

export class TouchControl{

	private startEvent:TouchEvent;
	private $container:HTMLElement;
	private canvas:Raphael.Paper;
	private lastEvent:TouchEvent;
	private windowSize = {
		width : Math.max(window.innerHeight,window.innerWidth),
		height : Math.min(window.innerHeight,window.innerWidth)
	};

	private touchCount:number;

	private didMove:boolean = false;


	constructor( container:HTMLElement , layer:Raphael.Paper ){
		let self = this;
		container.addEventListener('touchstart',function(e){
			self.touchStart(e);
		});

		container.addEventListener('touchmove',function(e){
			e.preventDefault();
			self.touchMove(e);
		});

		container.addEventListener('touchend',function(e){
			self.touchEnd(e);
		});

		this.$container = container;
		this.canvas = layer;

		Draw.scale({x:0,y:0},0.1);
	}

	private touchStart(event:TouchEvent){
		this.startEvent = event;
		this.touchCount = event.touches.length;
	}

	private touchMove(event:TouchEvent){
		if(this.touchCount != event.touches.length) {
			return ;
		}
		event.stopPropagation();
		this.didMove = true;
		if(event.touches.length == 1) {
			let offset = this.getOffset(this.startEvent.touches[0],event.touches[0]);
			this.moveContainer(offset.pageX,offset.pageY);
		}else{
			let center = this.getCenter(event.touches);
			let scale = this.getScale(this.startEvent.touches,event.touches);
			this.scaleContainer(center,scale);
		}
		this.lastEvent = event;
	}

	private touchEnd(event:TouchEvent){
		if(event.touches.length != 0 || !this.didMove) {
			return ;
		}
		event.stopPropagation();
		this.didMove = false;
		if(this.lastEvent.touches.length == 1) {
			let offset = this.getOffset(this.startEvent.touches[0],this.lastEvent.touches[0]);
			this.moveCanvas(offset.pageX,offset.pageY);
		}else{
			let center = this.getCenter(this.lastEvent.touches);
			let scale = this.getScale(this.startEvent.touches,this.lastEvent.touches);
			this.scaleCanvas(center,scale);
		}
		this.resetContainer();
		selectTips.updatePosition();
		stationMark.updatePosition();
	}

	private moveContainer(x:number,y:number){
		this.$container.style.transform = this.getTransformMatrix(x,y);
	}
	private scaleContainer(origin:{x:number,y:number},scale:number){
		this.$container.style.transform = this.getTransformMatrix(0,0,scale);
		this.$container.style.transformOrigin = `${origin.x}px ${origin.y}px`;
	}

	private resetContainer(){
		this.$container.style.transform = this.getTransformMatrix(0,0,1);
	}

	private moveCanvas(x:number,y:number){
		Draw.move(x,y);
	}
	private scaleCanvas(origin:{x:number,y:number},scale:number):boolean{
		// let originScale =  this.canvas.scale()
		// this.canvas.scale({
		// 	x : scale * originScale.x,
		// 	y : scale * originScale.y
		// });
		// this.redirect(origin);
		return Draw.scale(origin,scale);
	}


	private getTransformMatrix(x, y, scale?) {
		if(!scale) {
			scale = 1;
		}
		var s = [scale, 0, 0, scale, x, y];
		return "matrix(" + s.join(",") + ")"
	}

	private getTransformMatrixTranslate(matrix:string){
		// matrix.match(//)
	}



	private getCenter(list:TouchList){
		for (var e = [], n = [], r = 0, i = list.length; i > r; r++){
			e.push(list[r].pageX);
			n.push(list[r].pageY);
		}
		return {
			x : (Math.min.apply(Math, e) + Math.max.apply(Math, e)) / 2,
			y : (Math.min.apply(Math, n) + Math.max.apply(Math, n)) / 2
		}
	}

	private getOffset(start:Touch,end:Touch){
		return {
			pageX : end.pageX - start.pageX,
			pageY : end.pageY - start.pageY
		}
	}

	private getDistance(start:Touch,end:Touch){
		var n = end.pageX - start.pageX,
		r = end.pageY - start.pageY;
		return Math.sqrt(n * n + r * r)
	}

	private getScale(startList:TouchList,endList:TouchList){
		if(startList.length >= 2 && endList.length >= 2) {
			return this.getDistance(endList[0], endList[1]) / this.getDistance(startList[0], startList[1]);
		}else{
			return 1;
		}
	}
}