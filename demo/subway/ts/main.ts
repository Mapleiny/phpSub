import {Draw} from './draw'
import {LineManager} from './lineManager'
import {stationMark} from './stationMark'

/*
http://182.254.154.16:808/Goods/GetLineStations
http://182.254.154.16:808/Goods/Getdatabetweentwostations
http://182.254.154.16:808/Goods/GetGoodsList
 */


// window['MainActivity'].pushTheTicketInfo(string);

// 

let getMinWidthHeight = function(sourceData){
	let offset = {
		x : 50,
		y : 50
	}
	var minSize : {width:number,height:number} = {width:0,height:0};
	for (var stationId in sourceData.stations) {
	    let station = sourceData.stations[stationId];
	    station.loc.x += offset.x;
	    station.loc.y += offset.y;
	    minSize.width = minSize.width > station.loc.x ? minSize.width : station.loc.x;
	    minSize.height = minSize.height > station.loc.y ? minSize.height : station.loc.y;
	}
	for (var lineId in sourceData.lines) {
		let line = sourceData.lines[lineId];
		if(line.loc1) {
			line.loc1.x += offset.x;
			line.loc1.y += offset.y;
		}
		if(line.loc2) {
			line.loc2.x += offset.x;
			line.loc2.y += offset.y;
		}
	}
	minSize.width += 2*offset.x; 
	minSize.height += 2*offset.y; 
	return minSize;
}

	

let xhr = new XMLHttpRequest();
xhr.addEventListener("readystatechange", function () {
	if (this.readyState === 4) {
		try{
			let info = JSON.parse(this.response);
			let MinSize = getMinWidthHeight(info.content);
			let canvas = Raphael('container',MinSize.width,MinSize.height);
			Draw.canvas = canvas;
			let lineManager = new LineManager(info.content);
		}catch(e){

		}
	}
});
xhr.open("POST", "http://182.254.154.16:808/api/Goods/GetLineStations");
xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
xhr.setRequestHeader('Accept','application/json');
xhr.send(`Citycde=021`);


window['CLEAR_MAP_INFO'] = function(){
	stationMark.hide();
};