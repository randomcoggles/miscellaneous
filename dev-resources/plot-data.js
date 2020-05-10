// Run this code in your console and you'll see a bubblechart in yout screen

// -------------- This function tells you where to place you axes
function getDivisions(yMax) {
    var nearRound = yMax * .04;
    var exactRound
    for(var i = .0001; i < nearRound;) {
        i = i * 10;
        exactRound = i;
    }
    var factor = nearRound / exactRound;

    var dec = .15;
    [.2, .25, .5, .75, 1].forEach(x => {
        if(dec > factor)  return -1;
        dec = x;
    });

//     console.log('exactRound: ', exactRound, '\tfactor ', factor);
    console.log('dec: ', dec);
//     console.log('dec * exactRound: ', dec * exactRound);
    const divisor = dec * exactRound;
    var amount = 0;
    var values= [0];
    while(amount <= yMax) {
        amount += divisor;
        values.push(amount);
    }
//     console.log(yMax, ', divisor: ', divisor, ',\tdec: ', dec, '\t factor: ', exactRound/divisor);
    return values;
}
// --------------------------- Create random data for you bubble chart. ------------

function createRandomData(valueRange, scoreRange, groupSizeRange, numberOfItems) {
    valueRange = valueRange || [0, 10000];
    scoreRange = scoreRange || [0, 1000];
    groupSizeRange = groupSizeRange || [1, 150];
    numberOfItems = (numberOfItems || numberOfItems === 0) ? numberOfItems : 27;
    var itemsArray = new Array(numberOfItems).fill({score: 0, value: 0, debts: 0});
    return itemsArray = itemsArray.map(item => {
        var value = Math.round( Math.random() * (valueRange[1] + valueRange[0]));
        var score = Math.round( Math.random() * (scoreRange [1] + scoreRange [0]));
        var debts = Math.round( Math.random() * (groupSizeRange  [1] + groupSizeRange[0]));
        return {value, score, debts}
    });
}


function sprinklerWand(pointX, radiusX, pointY, radiusY, density) {

        var dens = Math.abs(density) || 1;
        var points = [];
        while(dens--) {
            var x = (pointX + (radiusX /2)) - ( Math.random() * (2 * radiusX) / 2);
            var y = (pointY + (radiusY /2)) - ( Math.random() * (2 * radiusY) / 2);
            points.push({x, y});
        }
        return points;
}

sprinklerWand(765, 35, 320, 18, 35);


// -----------------------------------------

document.body.innerHTML = '';
var yRange = [parseInt(Math.random() * 100), parseInt(Math.random() * 10000)];
var xRange = [parseInt(Math.random() * 10), parseInt(Math.random() * 1000)];
var numberOfItems = parseInt(Math.random() * 300)
var data = createRandomData(yRange, xRange, null , numberOfItems);
var chartWrap = document.createElement('div');;
chartWrap.classList.add('chart-wrap');

var svg = chartWrap.querySelectorAll('svg')[0];
// debugger;
var canvasHeight = 320; // parseInt(svg.style.height);
var canvasWidth = 760; // parseInt(svg.style.width);
var paddintTop = 30,
    paddingLeft = 60;
var gYAxis = chartWrap.querySelectorAll('.yaxis');
    gYAxis = gYAxis && gYAxis[0];
var gXAxis = chartWrap.querySelectorAll('.yaxis');
    gXAxis = gXAxis && gXAxis[0];

var maxY = 0;
data.forEach(item => {
    maxY = Math.max(maxY, item.value);
});

var maxX = 0;
data.forEach(item => {
    maxX = Math.max(maxX, item.score);
});

var maxR = 0;
data.forEach(item => {
    maxR = Math.max(maxR, item.debts);
});


// -------- Y SCALES ------
var yAxisPositions = getDivisions(maxY);
var divisionsMax  = yAxisPositions[0];
yAxisPositions.forEach(n => (divisionsMax = Math.max(divisionsMax, n)));
var yFactor = canvasHeight / divisionsMax;
var yPathsElementsStr = '';
yAxisPositions.forEach(pos => {
    var y = pos * yFactor;
    var path = `
    <path style="fill:none;fill-rule:evenodd;stroke:#b0f5f5;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 0,${y} L ${canvasWidth}, ${y}"/>
    `
    yPathsElementsStr += path;
});

// debugger;

// -------- x SCALES ------
var xAxisPositions = getDivisions(maxX);
divisionsMax  = xAxisPositions[0];
xAxisPositions.forEach(n => (divisionsMax = Math.max(divisionsMax, n)));
var xFactor = canvasWidth / divisionsMax;
var xPathsElementsStr = '';
xAxisPositions.forEach(pos => {
    var x = pos * xFactor;
    var path = `
    <path style="fill:none;fill-rule:evenodd;stroke:#b0f5f5;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M ${x},0 L ${x},${canvasHeight}"/>
    `
    xPathsElementsStr += path;
});



// -------- BUBBLES ------
var measure = Math.min(canvasHeight, canvasWidth);
var yAxisPositions = getDivisions(maxY);
var divisionsMax  = yAxisPositions[0];
yAxisPositions.forEach(n => (divisionsMax = Math.max(divisionsMax, n)));
var rFactor = (measure/15) / maxR;
var bubblesStr = '';
data.forEach(item => {
    var cy =  (divisionsMax - item.value) * yFactor;
    var cx = item.score * xFactor;
    var r = item.debts * rFactor;
    r = r < 2 ? 2 : r;
    r = r > 25 ? 25 : r;
    var bubble = `
    <circle data-debts="${item.debts}" data-value="${item.value}" data-score="${item.score}" style="fill:#aa0000;fill-opacity:.6; cursor:pointer" cx="${cx}" cy="${cy}" r="${r}"/>
    `;
    bubblesStr += bubble;

});


// -------- X TICKS ------
var xAxisPositions = getDivisions(maxX);
divisionsMax  = xAxisPositions[0];
xAxisPositions.forEach(n => (divisionsMax = Math.max(divisionsMax, n)));
var xFactor = canvasWidth / divisionsMax;
var xThicksElementsStr = '';
var xScaleTicks = 'M0,0 L0,8';
xAxisPositions.forEach(pos => {
    var x = parseInt(pos * xFactor);
    xScaleTicks += ` L${x},0 l${0},8 l${0}, -8`;
    var path = `
    <g transform="translate(${x}, 0)">
        <text style="width: 5px; margin-left: -20px">${pos}</text>
        <!-- <path style="fill:none;fill-rule:evenodd;stroke:#c2c3c4;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M ${x},${canvasHeight} L ${x},${canvasHeight}"/>
        -->
    </g>
    `
    xThicksElementsStr += path;
});
xScaleTicks = `
    <path transform="translate(0, -22)" style="fill:none;fill-rule:evenodd;stroke:#c0c0c0;stroke-width:.5px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="${xScaleTicks}"/>
`
xThicksElementsStr = xScaleTicks + xThicksElementsStr;


// -------- Y TICKS ------

var pathsElementsStr = '';

var yAxisPositions = getDivisions(maxY);
var divisionsMax  = yAxisPositions[0];
yAxisPositions.forEach(n => (divisionsMax = Math.max(divisionsMax, n)));
var yFactor = canvasHeight / divisionsMax;
var yThicksElementsStr = '';
var yScaleTicks = 'M0,0 L8,0';
yAxisPositions.forEach(pos => {
    var y = parseInt(( divisionsMax - pos) * yFactor);
    yScaleTicks += `L8,${y} l-8,0 l8,0`;
    var path = `
    <g transform="translate(0, ${y})" >
        <text>${pos}</text>
    </g>
    `
    yThicksElementsStr += path;
});
    
yScaleTicks = `
    <path transform="translate(${30}, -3)" style="fill:none;fill-rule:evenodd;stroke:#000;stroke-width:.5px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="${yScaleTicks}"/>
`
yThicksElementsStr += yScaleTicks;


chartWrap.innerHTML = `<svg style="height: ${canvasHeight + (paddintTop * 2) + 5}px; width: ${canvasWidth + paddingLeft + 20}px">


    <g class="chart-area" transform="translate(${paddingLeft}, ${paddintTop})" >
        <g class="yaxis">${yPathsElementsStr}</g>
        <g class="xaxis">${xPathsElementsStr}</g>
        <g  class="plot-area">
           ${bubblesStr}
        </g>
    </g>

    <g transform="translate(10, ${paddintTop + 3})" class="y-ticks">${yThicksElementsStr}</g>
    <g transform="translate(${paddingLeft}, ${canvasHeight + paddintTop + paddintTop + 5})" class="x-ticks">${xThicksElementsStr}</g>
</svg>
<style>
    circle:hover {
        opacity: 1;
        fill: brown!important;
        fill-opacity: .51!important;
    }
    g.x-ticks text, g.y-ticks text {
        font-size: 12px;
        transform: translate(-10px, 0)
        border: dashed red 1px;
    }
</style>
`;


document.body.appendChild(chartWrap);
document.querySelectorAll('circle').forEach(circle => {
    circle.addEventListener('mouseenter', (evt) => {
        console.log(evt.target.dataset);
    })
})







// [600, 700, 810, 900, 1100, 2000, 3001, 4000, 5360, 6140, 7001, 8830, 9001, 9975, 10000, 123004].forEach(val => {
//     console.log(val, getDivisions(val));
// })
