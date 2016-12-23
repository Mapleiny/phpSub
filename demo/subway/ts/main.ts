import {MinSize} from './dataSource'
import {Draw} from './draw'
import {LineManager} from './lineManager'

let canvas = Raphael('container',MinSize.width,MinSize.height);

Draw.canvas = canvas;

let lineManager = new LineManager();