import {StationsInfoData} from './dataSource'
import {Station} from './station'

export class StationManager{
	private stations : {[key:string]:Station} = {};
	constructor(){
		for (var stationName in StationsInfoData) {
			let stationInfo = StationsInfoData[stationName];
			this.stations[stationName] = new Station(stationInfo);
		}
	}

	getStation(stationName:string):Station{
		return this.stations[stationName];
	}

	setTraslateStation(stationName:string){
		let station = this.stations[stationName];
		
	}

	toFront(stations?:Array<string>){
		let self = this;
		if(Raphael.is(stations,'array')) {
			stations.forEach(function(stationName:string){
				let station = self.stations[stationName];
				station.toFront();
			});
		}
	}
}