import {StationsInfoData} from './dataSource'
import {selectTips} from './selectTips'

export * from './station'
import {Station} from './station'

export class StationManager{
	
	private stations : {[key:string]:Station} = {};

	constructor(){
		for (var stationName in StationsInfoData) {
			let stationInfo = StationsInfoData[stationName];
			let station = new Station(stationInfo);
			station.click(function(e){
				selectTips.showTips({
					x : station.element.getBBox().cx,
					y : station.element.getBBox().cy
				},function(type){
					selectTips.hideTips();
					if(type == 'start') {
						console.log('set station:'+station.stationLabel.text+' as start');
					}else{
						console.log('set station:'+station.stationLabel.text+' as end');
					}
				});
			});
			this.stations[stationName] = station;
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