import {Round,Text,Shape} from './shape'
import {Point} from './interface'
import {IStationInfoData} from './dataSource'

let transImagePath = './img/icons_trans.png';
let shareImagePath = './img/icons_share.png';
let startImagePath = './img/icons_start_point.png'
let endImagePath = './img/icons_end_point.png'

export enum StationType{
	share,trans
}


export class StationLabel extends Text{
	locationLabel:string;
	constructor(stationInfo:IStationInfoData){
		super({text:stationInfo.name,size:12});
		this.locationLabel = stationInfo.label;
	}
	converLocation(parentElement:Raphael.Element){
		let textBox = this.element.getBBox();

		let parentBox = parentElement.getBBox();

		let padding = 5;
		var x,y;
		switch (this.locationLabel) {
			case "left.left":
				x = parentBox.x - textBox.width/2 - padding;
				y = parentBox.cy;
				this.element.attr({
					x : x,
					y : y
				});
				break;
			case "topleft.topleft":
				x = parentBox.x - textBox.width/2;
				y = parentBox.y - textBox.height/2;
				this.element.attr({
					x : x,
					y : y
				});
				break;
			case "top.top":
				x = parentBox.cx;
				y = parentBox.y - textBox.height/2 - padding;
				this.element.attr({
					x : x,
					y : y
				});
				break;
			case "topleft.topright":
				x = parentBox.x + textBox.width/2;
				y = parentBox.y - textBox.height/2 - padding;
				this.element.attr({
					x : x,
					y : y
				});
				break;
			case "topright.topright":
				x = parentBox.x2 + textBox.width/2;
				y = parentBox.y - textBox.height/2;
				this.element.attr({
					x : x,
					y : y
				});
				break;
			case "right.right":
				x = parentBox.x2 + textBox.width/2 + padding;
				y = parentBox.cy;
				this.element.attr({
					x : x,
					y : y
				});
				break;
			case "bottomright.bottomright":
				x = parentBox.x2 + textBox.width/2;
				y = parentBox.y2 + textBox.height/2;
				this.element.attr({
					x : x,
					y : y
				});
				break;
			case "bottom.bottom":
				x = parentBox.cx;
				y = parentBox.y2 + textBox.height/2 + padding;
				this.element.attr({
					x : x,
					y : y
				});
				break;
			case "bottomleft.bottomright":
				x = parentBox.x + textBox.width/2;
				y = parentBox.y2 + textBox.height/2 + padding;
				this.element.attr({
					x : x,
					y : y
				});
				break;
			case "bottomleft.bottomleft":
				x = parentBox.x - textBox.width/2;
				y = parentBox.y2 + textBox.height/2 + padding;
				this.element.attr({
					x : x,
					y : y
				});
				break;
			case "bottomright.bottomleft":
				x = parentBox.x2 - textBox.width/2;
				y = parentBox.y2 + textBox.height/2 + padding;
				this.element.attr({
					x : x,
					y : y
				});
				break;
			default:
				console.log(this.locationLabel)
				break;
		}
	}
}

export class Station extends Round{
	id:string;
	lines : Array<string> = [];
	stationLabel:StationLabel;

	isTerminal:boolean = false;

	relativeStations:Array<string> = [];

	requestId : string;

	readonly name : string;

	private stationType:StationType;

	private handle;

	constructor(stationInfo:IStationInfoData){
		super({radius : 5,location:stationInfo.loc, color:'#fff'});

		this.id = stationInfo.id;
		this.stationLabel = new StationLabel(stationInfo);
		this.stationLabel.converLocation(this.element);
		this.name = stationInfo.name;
	}

	setStationType(type:StationType){
		if(this.stationType == type) {
			return ;
		}
		this.stationType = type;
		let currentBox = this.element.getBBox();
		this.element.remove();
		switch (type) {
			case StationType.share:
				this.element = this.canvas.image(shareImagePath,currentBox.x,currentBox.y,10,10);
				break;
			case StationType.trans:
				this.element = this.canvas.image(transImagePath,currentBox.x-4,currentBox.y-4,16,16);
				break;
			default:
				break;
		}
		this.element.click(this.handle);
		this.toFront();
	}

	click(handle:Function){
		this.handle = handle;

		this.element.click(this.handle);
	}

	toFront(){
		this.element.toFront();
		this.stationLabel.element.toFront();
	}
}