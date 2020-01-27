"use strict";
class CanvasArea {
    constructor(svgId, XYtranslation) {
        this.XYtranslation = XYtranslation;
        let canva = document.getElementById(svgId);
        canva.addEventListener('mousedown', this.dragStart.bind(this));
        canva.addEventListener('mousemove', this.drag.bind(this));
        canva.addEventListener('mouseup', this.dragEnd.bind(this));
    }
    dragStart() {
        let target = event.target;
        if (target.classList.contains("draggable")) {
            this.dragEl = target;
			target.addEventListener('drag', (evt) => {
				console.log('event:\t', evt);
			});
        }
        ;
    }
    drag() {
        if (this.dragEl)
            this.move(this.dragEl, event.offsetX, event.offsetY);
    }
	
    dragEnd() { this.dragEl = null; }
	
    move(el, x, y) {
        let translX = this.XYtranslation && this.XYtranslation.x || 0, translY = this.XYtranslation && this.XYtranslation.y || 0;
        if (el) {
            if (el.tagName /*toLowerCase?*/ == 'circle') {
                el.setAttributeNS(null, "cx", x + translX);
                el.setAttributeNS(null, "cy", y + translY);
            }
            else if (el.tagname == 'line') {
                el.setAttributeNS(null, "x1", x + translX);
                el.setAttributeNS(null, "y1", y + translY);
            }
            el.ondrag && el.ondrag();
            let dragEvent = new CustomEvent('drag', {
                detail: {
                    x: x + translX,
                    y: y + translY
                },
                bubbles: true,
                cancelable: true
            });
            el.dispatchEvent(dragEvent);
        }
    }
}


function GetElevation(elementId/*: string*/) {
	const wrapElement = document.querySelector('#' + elementId);

	// 	====================== UTIL FUNCTIONS =======================

	const getElevationByDegree = (degrees, radius) => {
		if(degrees > 90) {
			throw('Degrees mustn\'t be greater 90');
		}

		const cord  = { 
			x1: radius,
			y1: 0, // TODO: Verify how is this true
			x2: getCircleX(degrees, radius),
			y2: getCircleY(degrees, radius)
		};

		debugger
		var xm = (cord.x1 + cord.x2) / 2;
		var ym = (cord.y1 + cord.y2) / 2
		var elevationPointA  = {x: xm, y: ym};

		//	Squared root of sum of squared catets
		var cateto_a = elevationPointA.x;
		var cateto_b = elevationPointA.y;
		let ghostLineLength = Math.sqrt((cateto_a * cateto_a)  + (cateto_b * cateto_b));

		var line_factor =  that.radius / ghostLineLength;
		var elevationPointB = {x: elevationPointA.x * line_factor ,y: elevationPointA.y * line_factor};

		cateto_a = elevationPointA.x - elevationPointB.x;
		cateto_b = elevationPointA.y - elevationPointB.y;
		const elevation =Math.sqrt((cateto_a * cateto_a)  + (cateto_b * cateto_b));
		return elevation;

	}

	const getElevationByDistance = (distance, radius) => {
		const circunference = 2 * Math.PI * that.radius;
		if (distance > circunference / 2) {
			throw('distance mustn\' be greater than half circunference')
		}
		const degrees = distance / circunference * 360;
		return getElevationByDegree(degrees, radius);
	}

	var getCircleX = (degrees, radius) => {
		var r = degrees * Math.PI/180; // Convert degrees to radians;
		return Math.cos(r) * radius;
	}

	var getCircleY = (degrees, radius) => {
		var r = degrees * Math.PI/180; // Convert degrees to radians;
		return Math.sin(r) * radius;
	}

	var getMiddlePoint = (pointA, pointB) => {
		var x = (pointA.x + pointB.x) / 2;
		var y = (pointA.y + pointB.y) / 2;
		return {x: x, y: y};
	}


	// 	====================== UTIL FUNCTIONS =======================


	const that = this;
	this.radius = 6371;
	this.circunference = 2 * Math.PI * this.radius;
	this.measureDegrees = 0.26979765176117915;
	this.measureDist =  this.measureDegrees / 360 * this.circunference;
	this.elevation = getElevationByDegree(this.measureDegrees, this.radius);


	this.setRadius = function(radius) {
		console.log(radius);
		that.radius = radius;
		that.circunference = 2 * Math.PI * that.radius;
		that.measureDist =  that.measureDegrees / 360 * that.circunference;
		that.elevation = getElevationByDegree(that.measureDegrees, that.radius);
	}

	this.setMeasureDist = function(distance) {
		console.log(event);
		if(distance >  that.circunference / 2) {
			throw('Distance mustn\'t be greater than circunference');
		}
		that.measureDegrees = distance / that.circunference * 360;
		that.measureDist = distance;
		that.elevation = getElevationByDegree(that.measureDegrees, that.radius);
	}

	this.setDegrees = function(degrees) {
		console.log(event);
		if(degrees > 90 && degrees <= 0) {
			throw('Degrees mustn\'t be greater 90 and greater than 0');
		}
		that.measureDist = degrees / 360 * that.circunference;
		that.elevation = getElevationByDegree(that.measureDegrees, that.radius);
	}

}

// var elevationCalculator = new GetElevation('svg-wrap');



var GetElevationObj = new GetElevation();
document.addEventListener('DOMContentLoaded', () => {
	GetElevationObj.init('svg-wrap')

    //Just make my dots draggable
    new CanvasArea('main-canva', { x: -300, y: -300 });
	var gElement = document.getElementById('points-group');
	drawPoints(gElement);
    // drawSections(200, null, 9);
});
function drawPoints(gElement) {
	var radius = 200; // 6371
	var circunference = Math.PI * 2 * radius;
	var oneKMDegree = circunference / 360;
	var centerPoint = {x: radius, y: radius};


	var getCircleX = (degrees, radius) => {
		var r = degrees * Math.PI/180; // Convert degrees to radians;
		return Math.cos(r) * radius;
	}
	var getCircleY = (degrees, radius) => {
		var r = degrees * Math.PI/180; // Convert degrees to radians;
		return Math.sin(r) * radius;
	}

	var points = [];
	for(var i = 0; i < 360; i += 10 ) {
		var degrees = i;
		points.push({deg: degrees, x: getCircleX(degrees, radius) + radius, y: getCircleY(degrees, radius) + radius });
	}
	points;
	
	points.forEach((point) => {
		
        let dotInCircunf = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dotInCircunf.setAttributeNS(null, 'deg', point.deg);
        dotInCircunf.setAttributeNS(null, 'r', 3);
        dotInCircunf.setAttributeNS(null, 'fill', 'transparent');
        dotInCircunf.setAttributeNS(null, 'stroke', 'red');
        dotInCircunf.setAttributeNS(null, 'stroke-width', .8);
        dotInCircunf.setAttributeNS(null, 'cx', point.x);
        dotInCircunf.setAttributeNS(null, 'cy', point.y);
        gElement.appendChild(dotInCircunf);
		
	});

}


function dragCircle(event) {
    let target = event.target;
    if (event.type !== 'drag')
        return;
    let line = document.getElementById(target.getAttribute('connectto'));
    let cord001 = document.getElementById('cord-001');
    let cta001 = document.getElementById('cta-001');
    let ctb001 = document.getElementById('ctb-001');
    //Where is (x2,y2) if hip => 200?
    /*
      1) Get handleHipotenuse length
      2) Find point(x2,y2) for mainhip.length=200
      3)...
    */
    let lineObj = { x1: 0, y1: 0, x2: event.detail.x, y2: event.detail.y };
    let lx1 = 0, ly1 = 0, lx2 = event.detail.x, ly2 = event.detail.y;
    let lcata = (lx1 - lx2), lcatb = (ly1 - ly2);
    lineObj.width = Math.sqrt((lcata * lcata) + (lcatb * lcatb));
    let mainHip = { _length: 200, cata: {}, catb: {} };
    let factor = mainHip._length / lineObj.width;
    mainHip.cata.x2 = lx2 * factor;
    mainHip.cata.y2 = ly2 * factor;
    mainHip.cata.x1 = 0;
    mainHip.cata.y1 = mainHip.cata.y2;
    mainHip.catb.x1 = mainHip.cata.x2;
    mainHip.catb.y1 = 0;
    mainHip.catb.x2 = mainHip.cata.x2;
    mainHip.catb.y2 = mainHip.cata.y2;
    var catA = (mainHip.cata.x2 - mainHip.cata.x1);
    var catB = mainHip.catb.y2 - mainHip.catb.y1;
    mainHip._length = Math.sqrt(catA * catA + catB * catB);
    let dotOverCircunf = document.getElementById('dot-over-circunf');
    dotOverCircunf.setAttributeNS(null, 'cx', mainHip.cata.x2);
    dotOverCircunf.setAttributeNS(null, 'cy', mainHip.cata.y2);
    cta001.setAttributeNS(null, 'x1', mainHip.cata.x1);
    cta001.setAttributeNS(null, 'y1', mainHip.cata.y1);

	if(mainHip.cata.y2 <= 0 && mainHip.cata.x2 >= 0) {
		cord001.setAttributeNS(null, 'x2', mainHip.cata.x2);
		cord001.setAttributeNS(null, 'y2', mainHip.cata.y2);
		let midPoint = getMiddlePoint({x: 0, y: -200}, {x: mainHip.cata.x2, y: mainHip.cata.y2});
		
		let ghostLineLength = Math.sqrt(midPoint.x * midPoint.x + midPoint.y * midPoint.y);
		
		var line_factor =  200 / ghostLineLength;
		var nextPoint = {x: midPoint.x * line_factor ,y: midPoint.y * line_factor};
		
		var catA = midPoint.x - nextPoint.x;
		var catB = midPoint.y - nextPoint.y;
		
		let elevationLineLength = Math.sqrt(catA * catA + catB  * catB);
		
		 
		let elevation = document.getElementById('elevation');
		elevation.setAttributeNS(null, 'x1', '' + midPoint.x);
		elevation.setAttributeNS(null, 'y1', '' + midPoint.y);
		elevation.setAttributeNS(null, 'data-ghostLineLength', ghostLineLength);
		elevation.setAttributeNS(null, 'data-elevationLineLength', 200 - ghostLineLength);
		elevation.setAttributeNS(null, 'x2', nextPoint.x);
		elevation.setAttributeNS(null, 'y2', nextPoint.y);
		
	}

    cta001.setAttributeNS(null, 'x2', mainHip.cata.x2);
    cta001.setAttributeNS(null, 'y2', mainHip.cata.y2);
    ctb001.setAttributeNS(null, 'x1', mainHip.catb.x1);
    ctb001.setAttributeNS(null, 'y1', mainHip.catb.y1);
    ctb001.setAttributeNS(null, 'x2', mainHip.catb.x2);
    ctb001.setAttributeNS(null, 'y2', mainHip.catb.y2);
    //main-vline main-hline
    line.setAttributeNS(null, 'x2', event.detail.x);
    line.setAttributeNS(null, 'y2', event.detail.y);
    let newLine = { x1: 200, y1: 0, x2: mainHip.cata.x2, y2: mainHip.cata.y2 };
    let cata = newLine.x2 - newLine.x1, catb = newLine.y2 - newLine.y1;
    let lineLength = Math.sqrt((cata * cata) + (catb * catb));
    let nSections = parseInt(lineLength / 10);
    console.log('nSections: ', nSections);
    //drawSections(200, newLine, nSections);
}

var getMiddlePoint = (pointA, pointB) => {
	var x = (pointA.x + pointB.x) / 2;
	var y = (pointA.y + pointB.y) / 2;
	return {x: x, y: y};
}

function drawSections(radius, line, nPoints) {
    let group = document.getElementById('translated-group');
    let sectionsGroup = document.getElementById('sections-group');
    sectionsGroup && sectionsGroup.remove();
    let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttributeNS(null, 'id', 'sections-group');
    group.appendChild(g);
    if(!line) line =  { x1: 141, y1: -141, x2: 200, y2: 0 };
    let cata = line.x1 - line.x2, //x1 is always 0
    catb = line.y1 - line.y2;
    let lineLength = Math.sqrt((cata * cata) + (catb * catb));
    g.setAttributeNS(null, 'linelength', lineLength);
    let gLineLengthIsSet = false;
    getPointsInLine(line, nPoints || 5).forEach((point, index) => {
        //How do I strech this line till it reach the cicle border?
        let catASqr = point.x * point.x, //x1 is always 0
        catbSqr = point.y * point.y;
        let lineLength = Math.sqrt(catASqr + catbSqr);
        //First, check if lineLength > 0
        if (!lineLength)
            return;
        let givenLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        givenLine.setAttributeNS(null, 'stroke', 'cyan');
        givenLine.setAttributeNS(null, 'stroke-width', .5);
        givenLine.setAttributeNS(null, 'stroke-dasharray', '1,3');
        givenLine.setAttributeNS(null, 'x1', line.x1);
        givenLine.setAttributeNS(null, 'y1', line.y1);
        givenLine.setAttributeNS(null, 'x2', line.x2);
        givenLine.setAttributeNS(null, 'y2', line.y2);
        g.appendChild(givenLine);
        let lineL = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lineL.setAttributeNS(null, 'stroke', 'red');
        lineL.setAttributeNS(null, 'stroke-width', .5);
        lineL.setAttributeNS(null, 'stroke-dasharray', '4,1,2');
        let factor = (radius - lineLength) / lineLength;
        let newX2 = point.x + (point.x * factor), newY2 = point.y + (point.y * factor);
        lineL.setAttributeNS(null, 'x1', 0);
        lineL.setAttributeNS(null, 'y1', 0);
        lineL.setAttributeNS(null, 'x2', newX2);
        lineL.setAttributeNS(null, 'y2', newY2);
        g.appendChild(lineL);
        let dotInCircunf = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dotInCircunf.setAttributeNS(null, 'r', 2);
        dotInCircunf.setAttributeNS(null, 'fill', 'transparent');
        dotInCircunf.setAttributeNS(null, 'stroke', 'red');
        dotInCircunf.setAttributeNS(null, 'stroke-width', .8);
        dotInCircunf.setAttributeNS(null, 'cx', newX2);
        dotInCircunf.setAttributeNS(null, 'cy', newY2);
        g.appendChild(dotInCircunf);
        let degText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        let degLength = 45 / nPoints;
        degText.innerHTML = (degLength * (index + 1)) + 'º';
        degText.setAttributeNS(null, 'fill', 'transparent');
        degText.classList.add('degLabel');
        degText.setAttributeNS(null, 'stroke', 'red');
        degText.setAttributeNS(null, 'stroke-width', .8);
        degText.setAttributeNS(null, 'x', newX2 + 5);
        degText.setAttributeNS(null, 'y', newY2 + 0);
        g.appendChild(degText);
    });
    //TODO: describe this function
    function getPointsInLine(lineObj, nPoints) {
        let points = [];
        let catA = lineObj.x2 - lineObj.x1, catB = lineObj.y2 - lineObj.y1;
        let lx2 = lineObj.x2, ly2 = lineObj.y2;
        let catAdist = catA / nPoints, catBDist = catB / nPoints;
        if (nPoints > 0)
            while (nPoints-- > 0) {
                let newPoint = { x: lx2 -= catAdist, y: ly2 -= catBDist };
                points.push(newPoint);
            }
        return points;
    }
    //getPointsInLine({x1:0,y1:0, x2:120,y2: 160}, 16);
}

/*

                    let x = circPadding + 60 + radius + radius * Math.cos(angle) - elWidth / 2;
                    let y = circPadding + radius + radius * Math.sin(angle) - elHeight / 2;
var radius = 6371;
var circunference = Math.PI * 2 * radius;
var oneKMDegree = circunference / 360;
var centerPoint = {x: 6371, y: 6371};

var degree = 10;
var newPoint = {x:0, y:0};
newPoint.x = (radius * Math.cos(degree)) + radius;
newPoint.y = (radius * Math.sin(degree)) + radius;
*/