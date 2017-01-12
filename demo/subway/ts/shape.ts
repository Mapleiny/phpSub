import {Point} from './interface'
import {Draw} from './draw'

interface ShapeParams{
	location?:Point;
	color?:string;
}
export class Shape{
	location:Point;
	color:string;
	canvas:Raphael.Paper;
	element:Raphael.Element;
	constructor(shapeParams:ShapeParams){
		this.canvas = Draw.canvas;
		this.location = shapeParams.location || {x:0,y:0};
		this.color = shapeParams.color || 'tansparent';
	}
}

// round

export interface RoundParams extends ShapeParams{
	radius:number;
	borberColor?:string;
	borderWidth?:number;
}

export class Round extends Shape{
	radius:number ;
	borberColor:string;
	borderWidth:number;

	constructor(roundParams:RoundParams){
		super(roundParams);

		this.radius = roundParams.radius || 5;
		this.borberColor = roundParams.borberColor || "#000";
		this.borderWidth = roundParams.borderWidth || 1;

		this.element = this.canvas.circle(this.location.x,this.location.y,5);

		this.update();
		
	}

	update(){
		this.element.attr({
			x : this.location.x,
			y : this.location.y,
			fill : this.color,
			stroke : this.borberColor,
			'stroke-width':this.borderWidth
		});
	}
}

// text
export interface TextParams extends ShapeParams{
	text:string;
	size?:number;
}
export class Text extends Shape{
	text:string;
	size:number;
	constructor(textParams?:TextParams){
		super(textParams);

		this.text = textParams.text || "";
		this.size = textParams.size || 14;

		this.element = this.canvas.text(this.location.x,this.location.y,this.text);
		this.element.attr({
			'font-size':this.size,
			'fill' : this.color
		});
	}
}

// path

export interface PathParams extends ShapeParams{
	points : Array<Point>
	width : number;
}

export class Path extends Shape{
	points : Array<Point>
	width : number;

	constructor(pathParams:PathParams){
		super(pathParams);

		this.width = pathParams.width || 1;

		this.element = this.canvas.path(this.createPathString(pathParams.points));
		this.element.attr({
			'stroke-linejoin' : 'round',
			'stroke-width' : this.width,
			'stroke' : this.color
		});
	}

	createPathString(points:Array<Point>):string{
		var pathArray = [];
		pathArray.push('M');
		for (var i = 0; i < points.length; i++) {
			let point = points[i];
			pathArray.push(point.x+","+point.y);
			if(i < points.length - 1) {
				pathArray.push('L');
			}
		}

		return pathArray.join('');
	}
}

