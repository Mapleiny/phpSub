import {Point} from './interface'
import {ILineInfoData,StationsInfoData} from './dataSource'
import {Path} from './shape'
import {LineLabel} from './lineLabel'

var linkWidth = 8;

var getStationLoaction = function(stationName:string):Point{
	return StationsInfoData[stationName].loc;
};

var zoom = 1.2;
var azimuth = {
	bb: {x: 0, y: linkWidth*zoom/2},
	tt: {x: 0, y: -linkWidth*zoom/2},
	rr: {x: linkWidth*zoom/2, y: 0},
	ll: {x: -linkWidth/2, y: 0},
	br: {x: linkWidth*zoom*0.7/2, y: linkWidth*zoom*0.7/2},
	bl: {x: -linkWidth*zoom*0.7/2, y: linkWidth*zoom*0.7/2},
	tr: {x: linkWidth*zoom*0.7/2, y: -linkWidth*zoom*0.7/2},
	tl: {x: -linkWidth*zoom*0.7/2, y: -linkWidth*zoom*0.7/2},
	BB: {x: 0, y: linkWidth*zoom},
	TT: {x: 0, y: -linkWidth*zoom},
	RR: {x: linkWidth*zoom, y: 0},
	LL: {x: -linkWidth, y: 0},
	BR: {x: linkWidth*zoom*0.7, y: linkWidth*zoom*0.7},
	BL: {x: -linkWidth*zoom*0.7, y: linkWidth*zoom*0.7},
	TR: {x: linkWidth*zoom*0.7, y: -linkWidth*zoom*0.7},
	TL: {x: -linkWidth*zoom*0.7, y: -linkWidth*zoom*0.7}
};

var converStationsToPoints = function(stations:{[key:string]:string|Point}):Array<Point>{
	var pathPoints = [];
	for (var stationName in stations) {
		let pathPoint:Point;
		let maybeString = stations[stationName];
		if(typeof maybeString == 'string') {
			let stationMMName = maybeString as string;
			let offset:Point = {x:0,y:0}; 
			pathPoint = getStationLoaction(stationMMName.slice(0,6));
			let offsetKey = stationMMName.slice(6,8);
			if(offsetKey) {
				offset = azimuth[offsetKey];
			}
			pathPoint.x += offset.x;
			pathPoint.y += offset.y;
		}else{
			pathPoint = maybeString as Point;
		}
		pathPoints.push(pathPoint);
	}
	return pathPoints;
};

export class Line extends Path{
	id : string;
	lineNumber:string;
	name : string;
	stationsName : Array<string> = [];
	lineLabel1 : LineLabel;
	lineLabel2 : LineLabel;
	constructor(lineInfoData:ILineInfoData){
		super({
			points : converStationsToPoints(lineInfoData.stations),
			color : lineInfoData.color,
			width : linkWidth
		});
		this.lineLabel1 = new LineLabel(lineInfoData);
		this.lineLabel2 = new LineLabel(lineInfoData);

		this.lineLabel1.updatePosition(lineInfoData.loc1);
		this.lineLabel2.updatePosition(lineInfoData.loc2);


		this.id = lineInfoData.id || (new Date()).toTimeString();
		this.name = lineInfoData.name || '';
		
		this.element.id = this.id;

		for (var stationName in lineInfoData.stations) {
			let mayString = lineInfoData.stations[stationName];
			if(typeof mayString == 'string') {
				let realStationName = (mayString as string).slice(0,6);
				this.stationsName.push(realStationName);
			}
		}
	}

	toFront(){
		this.element.toFront();
		this.lineLabel1.toFront();
		this.lineLabel2.toFront();
	}
}