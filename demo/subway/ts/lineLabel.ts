import {Point} from './interface'
import {Text} from './shape'
import {ILineInfoData,StationsInfoData} from './dataSource'
export class LineLabel extends Text{
	private label : Text;
	constructor(lineInfoData:ILineInfoData){
		super({
			text : lineInfoData.num,
			size : 30,
			color : lineInfoData.color
		});

		this.label = new Text({
			text : lineInfoData.lab,
			size : 20
		});
	}

	updatePosition(location:Point){
		this.element.attr(location);
		let numBox = this.element.getBBox();
		let labelBox = this.label.element.getBBox();
		this.label.element.attr({
			x : numBox.x2 + labelBox.width / 2 + 5,
			y : numBox.cy
		});
	}

	toFront(){
		this.element.toFront();
		this.label.element.toFront();
	}
}