import {Round,Text} from './shape'
import {Point} from './interface'
import {IStationInfoData} from './dataSource'



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
	stationLabel:StationLabel;

	constructor(stationInfo:IStationInfoData){
		super({radius : 5,location:stationInfo.loc, color:'#fff'});

		this.id = stationInfo.id;
		this.stationLabel = new StationLabel(stationInfo);
		this.stationLabel.converLocation(this.element);
	}
}