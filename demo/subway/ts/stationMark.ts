import {Point} from './interface'
import {Draw} from './draw'

class StationMark{
	// 5 * 8
	private startMark = new Image();
	private endMark = new Image();

	private startMarkOrigin:Point;
	private endMarkOrigin:Point;

	constructor(){
		this.startMark.src = './img/icon_start_point.png';
		this.endMark.src = './img/icon_end_point.png';

		this.startMark.classList.add('mark');
		this.endMark.classList.add('mark')

		let $container = document.getElementById('container');
		$container.appendChild(this.startMark);
		$container.appendChild(this.endMark);
	}

	show(isStart:boolean,point:Point){
		if(isStart) {
			this.startMarkOrigin = point;
			this.startMark.style.display = 'block';
		}else{
			this.endMarkOrigin = point;
			this.endMark.style.display = 'block';
		}

		this.updatePosition();
	}
	hide(){
		this.startMark.style.display = 'none';
		this.endMark.style.display = 'none';
	}

	updatePosition(){
		let shift = {
			x : -25/2,
			y : -40
		};
		if(this.startMarkOrigin) {
			let convertStartPoint = Draw.pointInViewBox({
				x : this.startMarkOrigin.x,
				y : this.startMarkOrigin.y
			});
			this.startMark.style.left = convertStartPoint.x+shift.x+'px';
			this.startMark.style.top = convertStartPoint.y+shift.y+'px';
		}
		if(this.endMarkOrigin) {
			let convertEndPoint = Draw.pointInViewBox({
				x : this.endMarkOrigin.x,
				y : this.endMarkOrigin.y
			});
			this.endMark.style.left = convertEndPoint.x+shift.x+'px';
			this.endMark.style.top = convertEndPoint.y+shift.y+'px';
		}
			
	}
}


export let stationMark = new StationMark();