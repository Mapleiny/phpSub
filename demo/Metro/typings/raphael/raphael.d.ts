// Type definitions for Raphael 2.1
// Project: http://raphaeljs.com
// Definitions by: CheCoxshall <https://github.com/CheCoxshall>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace Raphael{
    interface BoundingBox {
        cx:number;
        cy:number;
        x: number;
        y: number;
        x2: number;
        y2: number;
        width: number;
        height: number;
        toString():string;
    }

    interface Animation {
        delay(delay: number): Animation;
        repeat(repeat: number): Animation;
    }

    interface Font {
        w:number;
        face:any;
        glyphs:any;
    }

    interface Element {
        animate(params: { [key: string]: any; }, ms: number, easing?: string, callback?: Function): Element;
        animate(animation: Animation): Element;
        animateWith(el: Element, anim: Animation, params: any, ms: number, easing?: string, callback?: Function): Element;
        animateWith(el: Element, anim: Animation, animation: Animation): Element;
        attr(attrName: string, value: any): Element;
        attr(attrName: string): any;
        attr(attrNames: string[]): any[];
        attr(params: any): Element;
        click(handler: Function): Element;
        clone(): Element;
        data(key: string): any;
        data(key: string, value: any): Element;
        dblclick(handler: Function): Element;
        drag(onmove: (dx: number, dy: number, x: number, y: number, event: DragEvent) =>{ }, onstart: (x: number, y: number, event: DragEvent) =>{ }, onend: (DragEvent: any) =>{ }, mcontext?: any, scontext?: any, econtext?: any): Element;
        getBBox(isWithoutTransform?: boolean): BoundingBox;
        glow(glow?: { width?: number; fill?: boolean; opacity?: number; offsetx?: number; offsety?: number; color?: string; }): Set;
        hide(): Element;
        hover(f_in: Function, f_out: Function, icontext?: any, ocontext?: any): Element;
        id: string;
        insertAfter(el: Element): Element;
        insertBefore(el: Element): Element;
        isPointInside(x: number, y: number): boolean;
        isVisible(): boolean;
        matrix: Matrix;
        mousedown(handler: Function): Element;
        mousemove(handler: Function): Element;
        mouseout(handler: Function): Element;
        mouseover(handler: Function): Element;
        mouseup(handler: Function): Element;
        next: Element;
        node: SVGElement;
        onDragOver(f: Function): Element;
        paper: Paper;
        pause(anim?: Animation): Element;
        prev: Element;
        Raphael: Static;
        remove(): void;
        removeData(key?: string): Element;
        resume(anim?: Animation): Element;
        rotate(deg: number, cx?: number, cy?: number): Element;
        setTime(anim: Animation): void;
        setTime(anim: Animation, value: number): Element;
        show(): Element;
        status(): { anim: Animation; status: number; }[];
        status(anim: Animation): number;
        status(anim: Animation, value: number): Element;
        stop(anim?: Animation): Element;
        toBack(): Element;
        toFront(): Element;
        touchcancel(handler: Function): Element;
        touchend(handler: Function): Element;
        touchmove(handler: Function): Element;
        touchstart(handler: Function): Element;
        transform(): string;
        transform(tstr: string): Element;
        unclick(handler: Function): Element;
        undblclick(handler: Function): Element;
        undrag(): Element;
        unhover(): Element;
        unhover(f_in: Function, f_out: Function): Element;
        unmousedown(handler: Function): Element;
        unmousemove(handler: Function): Element;
        unmouseout(handler: Function): Element;
        unmouseover(handler: Function): Element;
        unmouseup(handler: Function): Element;
        untouchcancel(handler: Function ): Element;
        untouchend(handler: Function): Element;
        untouchmove(handler: Function): Element;
        untouchstart(handler: Function): Element;
    }

    interface Path extends Element {
        getPointAtLength(length: number): { x: number; y: number; alpha: number; };
        getSubpath(from: number, to: number): string;
        getTotalLength(): number;
    }

    interface Set {
        clear(): void;
        exclude(element: Element): boolean;
        forEach(callback: Function, thisArg?: any): Set;
        pop(): Element;
        push(...Element: any[]): Set;
        splice(index: number, count: number): Set;
        splice(index: number, count: number, ...insertion: Element[]): Set;
        length: number;

        [key: number]: Element;
        animate(params: { [key: string]: any; }, ms: number, easing?: string, callback?: Function): Set;
        animate(animation: Animation): Set;
        animateWith(el: Element, anim: Animation, params: any, ms: number, easing?: string, callback?: Function): Set;
        animateWith(el: Element, anim: Animation, animation: Animation): Set;
        attr(attrName: string, value: any): Set;
        attr(params: { [key: string]: any; }): Set;
        attr(attrName: string): any;
        attr(attrNames: string[]): any[];
        click(handler: Function): Set;
        clone(): Set;
        data(key: string): any;
        data(key: string, value: any): Set;
        dblclick(handler: Function): Set;
        drag(onmove: (dx: number, dy: number, x: number, y: number, event: DragEvent) =>{ }, onstart: (x: number, y: number, event: DragEvent) =>{ }, onend: (DragEvent: any) =>{ }, mcontext?: any, scontext?: any, econtext?: any): Set;
        getBBox(isWithoutTransform?: boolean): BoundingBox;
        glow(glow?: { width?: number; fill?: boolean; opacity?: number; offsetx?: number; offsety?: number; color?: string; }): Set;
        hide(): Set;
        hover(f_in: Function, f_out: Function, icontext?: any, ocontext?: any): Set;
        id: string;
        insertAfter(el: Element): Set;
        insertBefore(el: Element): Set;
        isPointInside(x: number, y: number): boolean;
        isVisible(): boolean;
        matrix: Matrix;
        mousedown(handler: Function): Set;
        mousemove(handler: Function): Set;
        mouseout(handler: Function): Set;
        mouseover(handler: Function): Set;
        mouseup(handler: Function): Set;
        next: Set;
        onDragOver(f: Function): Set;
        paper: Paper;
        pause(anim?: Animation): Set;
        prev: Set;
        Raphael: Static;
        remove(): void;
        removeData(key?: string): Set;
        resume(anim?: Animation): Set;
        setTime(anim: Animation): void;
        setTime(anim: Animation, value: number): Set;
        show(): Set;
        status(): { anim: Animation; status: number; }[];
        status(anim: Animation): number;
        status(anim: Animation, value: number): Set;
        stop(anim?: Animation): Set;
        toBack(): Set;
        toFront(): Set;
        touchcancel(handler: Function): Set;
        touchend(handler: Function): Set;
        touchmove(handler: Function): Set;
        touchstart(handler: Function): Set;
        transform(): string;
        transform(tstr: string): Set;
        unclick(handler: Function): Set;
        undblclick(handler: Function): Set;
        undrag(): Set;
        unhover(): Set;
        unhover(f_in: Function, f_out: Function): Set;
        unmousedown(handler: Function): Set;
        unmousemove(handler: Function): Set;
        unmouseout(handler: Function): Set;
        unmouseover(handler: Function): Set;
        unmouseup(handler: Function): Set;
        untouchcancel(handler: Function): Set;
        untouchend(handler: Function): Set;
        untouchmove(handler: Function): Set;
        untouchstart(handler: Function): Set;
    }

    interface Matrix {
        add(a: number, b: number, c: number, d: number, e: number, f: number, matrix: Matrix): Matrix;
        clone(): Matrix;
        invert(): Matrix;
        rotate(a: number, x: number, y: number): void;
        scale(x: number, y?: number, cx?: number, cy?: number): void;
        split(): { dx: number; dy: number; scalex: number; scaley: number; shear: number; rotate: number; isSimple: boolean; };
        toTransformString(): string;
        translate(x: number, y: number): void;
        x(x: number, y: number): number;
        y(x: number, y: number): number;
    }

    interface Paper {
        add(JSON: any): Set;
        bottom: Element;
        canvas: SVGSVGElement;
        circle(x: number, y: number, r: number): Element;
        clear(): void;
        defs: SVGDefsElement;
        ellipse(x: number, y: number, rx: number, ry: number): Element;
        forEach(callback: (el: Element) => boolean, thisArg?: any): Paper;
        getById(id: number): Element;
        getElementByPoint(x: number, y: number): Element;
        getElementsByPoint(x: number, y: number): Set;
        getFont(family: string, weight?: string, style?: string, stretch?: string): Font;
        getFont(family: string, weight?: number, style?: string, stretch?: string): Font;
        height: number;
        image(src: string, x: number, y: number, width: number, height: number): Element;
        path(pathString?: string | (string | number)[]): Path;
        print(x: number, y: number, str: string, font: Font, size?: number, origin?: string, letter_spacing?: number): Path;
        rect(x: number, y: number, width: number, height: number, r?: number): Element;
        remove(): void;
        renderfix(): void;
        safari(): void;
        set(elements?: Element[]): Set;
        setFinish(): Set;
        setSize(width: number, height: number): void;
        setStart(): void;
        setViewBox(x: number, y: number, w: number, h: number, fit: boolean): void;
        text(x: number, y: number, text: string): Element;
        top: Element;
        width: number;
    }

    interface Static {
        (container: HTMLElement, width: number, height: number, callback?: Function): Paper;
        (container: string, width: number, height: number, callback?: Function): Paper;
        (x: number, y: number, width: number, height: number, callback?: Function): Paper;
        (all: any[], callback?: Function): Paper;
        (onReadyCallback?: Function): Paper;

        angle(x1: number, y1: number, x2: number, y2: number, x3?: number, y3?: number): number;
        animation(params: any, ms: number, easing?: string, callback?: Function): Animation;
        bezierBBox(p1x: number, p1y: number, c1x: number, c1y: number, c2x: number, c2y: number, p2x: number, p2y: number): { min: { x: number; y: number; }; max: { x: number; y: number; }; };
        bezierBBox(bez: any[]): { min: { x: number; y: number; }; max: { x: number; y: number; }; };
        color(clr: string): { r: number; g: number; b: number; hex: string; error: boolean; h: number; s: number; v: number; l: number; };
        createUUID(): string;
        deg(deg: number): number;
        easing_formulas: any;
        el: any;
        findDotsAtSegment(p1x: number, p1y: number, c1x: number, c1y: number, c2x: number, c2y: number, p2x: number, p2y: number, t: number): { x: number; y: number; m: { x: number; y: number; }; n: { x: number; y: number; }; start: { x: number; y: number; }; end: { x: number; y: number; }; alpha: number; };
        fn: any;
        format(token: string, ...parameters: any[]): string;
        fullfill(token: string, json: JSON): string;
        getColor:{
            (value?: number): string;
            reset(): void;
        };
        getPointAtLength(path: string, length: number): { x: number; y: number; alpha: number; };
        getRGB(colour: string): { r: number; g: number; b: number; hex: string; error: boolean; };
        getSubpath(path: string, from: number, to: number): string;
        getTotalLength(path: string): number;
        hsb(h: number, s: number, b: number): string;
        hsb2rgb(h: number, s: number, v: number): { r: number; g: number; b: number; hex: string; };
        hsl(h: number, s: number, l: number): string;
        hsl2rgb(h: number, s: number, l: number): { r: number; g: number; b: number; hex: string; };
        is(o: any, type: string): boolean;
        isBBoxIntersect(bbox1: string, bbox2: string): boolean;
        isPointInsideBBox(bbox: string, x: number, y: number): boolean;
        isPointInsidePath(path: string, x: number, y: number): boolean;
        matrix(a: number, b: number, c: number, d: number, e: number, f: number): Matrix;
        ninja(): void;
        parsePathString(pathString: string): string[];
        parsePathString(pathString: string[]): string[];
        parseTransformString(TString: string): string[];
        parseTransformString(TString: string[]): string[];
        path2curve(pathString: string): string[];
        path2curve(pathString: string[]): string[];
        pathBBox(path: string): BoundingBox;
        pathIntersection(path1: string, path2: string): { x: number; y: number; t1: number; t2: number; segment1: number; segment2: number; bez1: any[]; bez2: any[]; }[];
        pathToRelative(pathString: string): string[];
        pathToRelative(pathString: string[]): string[];
        rad(deg: number): number;
        registerFont(font: Font): Font;
        rgb(r: number, g: number, b: number): string;
        rgb2hsb(r: number, g: number, b: number): { h: number; s: number; b: number; };
        rgb2hsl(r: number, g: number, b: number): { h: number; s: number; l: number; };
        setWindow(newwin: Window): void;
        snapTo(values: number, value: number, tolerance?: number): number;
        snapTo(values: number[], value: number, tolerance?: number): number;
        st: any;
        svg: boolean;
        toMatrix(path: string, transform: string): Matrix;
        toMatrix(path: string, transform: string[]): Matrix;
        transformPath(path: string, transform: string): string;
        transformPath(path: string, transform: string[]): string;
        type: string;
        vml: boolean;
    }
}
    
declare var Raphael: Raphael.Static;
declare module "raphael" {
    export = Raphael;
}