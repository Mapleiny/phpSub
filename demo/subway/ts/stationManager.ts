// import {StationsInfoData} from './dataSource'
import {selectTips} from './selectTips'
import {stationMark} from './stationMark'

export * from './station'
import {Station} from './station'

export class StationManager{
	
	private stations : {[key:string]:Station} = {};

	startStation:Station;
	endStation:Station;

	constructor(stationsInfoData){
		let self = this;
		for (var stationName in stationsInfoData) {
			let stationInfo = stationsInfoData[stationName];
			let station = new Station(stationInfo);
			let box = station.element.getBBox();
			station.click(function(e){
				selectTips.showTips({
					x : box.cx,
					y : box.cy
				},function(type){
					selectTips.hideTips();
					if(type == 'start') {
						stationMark.show(true,{
							x : box.cx,
							y : box.cy
						});
						if(self.endStation == station) {
							self.endStation = null;
						}
						self.startStation = station;
					}else{
						stationMark.show(false,{
							x : box.cx,
							y : box.cy
						});
						if(self.startStation == station) {
							self.startStation = null;
						}
						self.endStation = station;
					}
					self.checkStartAndEnd();
				});

				
			});
			this.stations[stationName] = station;
		}
	}

	getDataBetweenTowStation(startStation:Station,endStation:Station,callback:Function){
		if(!startStation || !endStation) {
			return ;
		}

		let xhr = new XMLHttpRequest();
		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
				var info;
				try{
					info = JSON.parse(this.response);
				}catch(e){

				}
				callback(info);
			}
		});
		xhr.open("POST", "http://182.254.154.16:808/api/Goods/Getdatabetweentwostations");
		xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xhr.setRequestHeader('Accept','application/json');
		xhr.send(`Cityid=021&originating%20station=${startStation.requestId}&terminate%20station=${endStation.requestId}`);
	}

	checkStartAndEnd(){
		let self = this;
		this.getDataBetweenTowStation(this.startStation,this.endStation,function(result){
			if(!result) {
				return ;
			}
			let message = `起点站：${self.startStation.name}\n终点站: ${self.endStation.name}\n价格:${result.content.Price}分`;
			if(confirm(message)) {
				if(window['MainActivity']) {
					window['MainActivity'].pushTheTicketInfo(JSON.stringify(result));
				}
			}
		});
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