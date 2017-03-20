import {Round,RoundParams} from './shape'


var lastClientRect = {
	x : 0,
	y : 0,
	width : window.innerWidth,
	height : window.innerHeight,
	fit: false
};

var currentScale:number = 1;

let setViewBox = function(){
	Draw.canvas.setViewBox(lastClientRect.x,lastClientRect.y,lastClientRect.width/currentScale,lastClientRect.height/currentScale,lastClientRect.fit);
};

export class Draw{
	static canvas:Raphael.Paper;
	static minScale:number = 1;
	static set size(v : {width:number,height:number}) {
		this._size = v;
		var scaleW = this.canvas.width / v.width;
		var scaleH = this.canvas.height / v.height;
		var minScale = Math.min(scaleW,scaleH);
		this.minScale = minScale;
	}
	static get size() : {width:number,height:number} {
		return this._size;
	}
	private static _size:{width:number,height:number};
	static move(x:number,y:number):boolean{

		lastClientRect.x -= x/currentScale;
		lastClientRect.y -= y/currentScale;

		lastClientRect.x = Math.min(Math.max(lastClientRect.x,0),this.size.width - this.canvas.width/currentScale);
		if(currentScale < this.canvas.height / this.size.height) {
			lastClientRect.y = Math.min(Math.max(lastClientRect.y,this.size.height - this.canvas.height/currentScale),0);
		}else{
			lastClientRect.y = Math.min(Math.max(lastClientRect.y,0),this.size.height - this.canvas.height/currentScale);
		}

		setViewBox();
		return true
	}
	static scale(origin:{x:number,y:number},scale:number):boolean{

		if(currentScale == 3 && scale >= 1) {
			return ;
		}

		currentScale *= scale;

		currentScale = Math.max(Math.min(currentScale,3),this.minScale);

		// if(currentScale != 3) {
			lastClientRect.x += origin.x * ( scale - 1 ) / currentScale;
			lastClientRect.y += origin.y * ( scale - 1 ) / currentScale;
		// }

		if(currentScale == this.minScale) {
			lastClientRect.x = -(lastClientRect.width/currentScale - this.size.width) / 2;
			lastClientRect.y = -(lastClientRect.height/currentScale - this.size.height) / 2;
		}

		setViewBox();
		return true;
	}
	static pointInViewBox(origin:{x:number,y:number}){
		return {
			x : (origin.x - lastClientRect.x) * currentScale,
			y : (origin.y - lastClientRect.y) * currentScale
		}
	}
}
