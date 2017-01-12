import {Line} from './line';
import {StationManager,StationType} from './stationManager'
import {LinesInfoData} from './dataSource'
import {Draw} from './draw'

export class LineManager{
	private lines : {[key:string]:Line} = {};
	private stationManager:StationManager;
	private maskLayer : Raphael.Element;

	constructor(){
		let self = this;
		for (var lineId in LinesInfoData) {
			let lineInfo = LinesInfoData[lineId];
			let line = new Line(lineInfo);
			line.element.click(function(e){
				self.onLineClick(e,this);
			});
			this.lines[lineId] = line;
		}
		this.stationManager = new StationManager();

		this.updateInterface();


		this.maskLayer = Draw.canvas.rect(0,0,Draw.canvas.width,Draw.canvas.height);
		this.maskLayer.attr({
			fill : '#fff',
			opacity : '0.8'
		}).hide();
		this.maskLayer.click(function(){
			self.onMaskClick();
		});
	}

	private onLineClick(e:Event,targetLine:Raphael.Element){
		this.maskLayer.toFront().show();
		let line = this.lines[targetLine.id];
		line.toFront();
		this.stationManager.toFront(line.stationsName);
	}

	private onMaskClick(){
		this.maskLayer.hide();
	}

	private updateInterface(){
		for (var lineId in this.lines) {
			let line = this.lines[lineId];
			let lineColor = line.color;
			let stations = line.stationsName;


			let length = stations.length;
			let prevStation,nextStation;
			stations.forEach((value,index)=>{
				let station = this.stationManager.getStation(value);
				prevStation = nextStation = null;
				if(index > 1) {
					prevStation = stations[index-1];
				}
				if(index < length - 1) {
					nextStation = stations[index+1];
				}

				if(prevStation && nextStation) {
					if(station.relativeStations.indexOf(prevStation) == -1){
						station.relativeStations.push(prevStation);
					}
					if(station.relativeStations.indexOf(nextStation) == -1){
						station.relativeStations.push(nextStation);
					}
				}else{
					station.isTerminal = true;
				}

				if(station.lines.length > 0) {
					let isTransStop = (station.id.substr(1,2) != lineId.substr(1,2)) ||
									  (station.relativeStations.length == 2 && station.isTerminal)||
									  station.relativeStations.length > 2;
					if(isTransStop) {
						station.setStationType(StationType.trans);
					}else{
						station.setStationType(StationType.share);
					}
				}else{
					station.borberColor = lineColor;
					station.lines.push(line.id);
					station.update();
				}
			});
		}
	}
}