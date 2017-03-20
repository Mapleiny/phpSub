import {Point} from './interface'
import {Draw} from './draw'
let template = `
<button value="start">设为起点</button>
<button value="end">设为终点</button>
`

class SelectTips{

	private selectHandle:Function;

	private element:HTMLElement;

	private origin:Point;

	constructor(){
		this.createDom();
	}

	showTips(position:Point,handle:Function){
		this.selectHandle = handle;
		this.element.style.display = 'block';
		this.origin = position;

		this.updatePosition();
		
	}

	updatePosition(){
		if(!this.origin) {
			return ;
		}
		let convertPoint = Draw.pointInViewBox({
			x : this.origin.x,
			y : this.origin.y
		});
		this.element.style.left = convertPoint.x - this.element.clientWidth/2 + 3 + 'px';
		this.element.style.top = convertPoint.y - this.element.clientHeight - 12 + 'px';
	}

	hideTips(){
		this.element.style.display = 'none';
	}

	private createDom(){
		let self = this;
		this.element = document.createElement('section');
		this.element.classList.add('select-tips');
		this.element.innerHTML = template;

		this.element.addEventListener('click',function(e){
			self.didSelect((e.target as HTMLElement).getAttribute('value'));
		});
		document.getElementById('container').appendChild(this.element);
	}

	private didSelect(type:string){
		this.selectHandle(type);
	}

}


export let selectTips = new SelectTips();