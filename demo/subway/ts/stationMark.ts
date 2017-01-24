import {Point} from './interface'

class StationMark{
	// 5 * 8
	private startMark = new Image();
	private endMark = new Image();

	constructor(){
		this.startMark.src = './img/icon_start_point.png';
		this.endMark.src = './img/icon_end_point.png';

		this.startMark.classList.add('mark');
		this.endMark.classList.add('mark')


		document.body.appendChild(this.startMark);
		document.body.appendChild(this.endMark);
	}

	show(isStart:boolean,point:Point){
		let shift = {
			x : -25/2,
			y : -40
		}
		if(isStart) {
			this.startMark.style.display = 'block';
			this.startMark.style.left = point.x+shift.x+'px';
			this.startMark.style.top = point.y+shift.y+'px';
		}else{
			this.endMark.style.display = 'block';
			this.endMark.style.left = point.x+shift.x+'px';
			this.endMark.style.top = point.y+shift.y+'px';
		}
	}
	hide(){
		this.startMark.style.display = 'none';
		this.endMark.style.display = 'none';
	}
}


export let stationMark = new StationMark();