import {Line} from './line';
import {StationManager} from './stationManager'
import {LinesInfoData} from './dataSource'

export class LineManager{
	lines : {[key:string]:Line} = {};
	stationManager:StationManager;
	constructor(){
		for (var lineId in LinesInfoData) {
			let lineInfo = LinesInfoData[lineId];
			this.lines[lineId] = new Line(lineInfo);
		}
		this.stationManager = new StationManager();

		this.updateInterface();
	}

	private updateInterface(){
		for (var lineId in this.lines) {
			let line = this.lines[lineId];
			let lineColor = line.color;
			let stations = line.stationsName;

			stations.forEach((value)=>{
				let station = this.stationManager.getStation(value);
				station.borberColor = lineColor;
				station.update();
			});
		}
	}
}