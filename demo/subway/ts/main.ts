import {MinSize} from './dataSource'
import {Draw} from './draw'
import {LineManager} from './lineManager'

let canvas = Raphael('container',MinSize.width,MinSize.height);

Draw.canvas = canvas;

/*
http://182.254.154.16:808/Goods/GetLineStations
http://182.254.154.16:808/Goods/Getdatabetweentwostations
http://182.254.154.16:808/Goods/GetGoodsList
 */


document.getElementById('click').addEventListener('click',function(){
	let string = JSON.stringify({
		string : 'string info',
		number : 123
	});
	try{
		window['MainActivity'].pushTheTicketInfo(string);
	}catch(e){
		alert(e);
	}
	alert('MainActivity.pushTheTicketInfo:'+string)
});

let lineManager = new LineManager();