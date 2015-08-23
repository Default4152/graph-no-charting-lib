var testData = [{
    name: 'JavaScript',
    rating: 100
}, {
    name: 'Go',
    rating: 90
}, {
    name: 'PHP',
    rating: 12
}, {
    name: 'Ruby',
    rating: 45
}, {
    name: 'Python',
    rating: 80
}, {
    name: 'Haskell',
    rating: 100
}];

var config = {
	width: 350,
	height: 350
};

// Base Graph
function Graph(config, arr) {
    this.modeSetData(arr);
    this.beginCanvas(config);
}

// Set data for later use by Children
Graph.prototype.modeSetData = function(arr) {
    this.dataChoice = arr;
}

// Initialize Canvas
Graph.prototype.beginCanvas = function(config) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.updateSize(config);
}

// Update canvas size
Graph.prototype.updateSize = function(config) {
    this.canvas.width = config.width;
    this.canvas.height = config.height;
}

// Grab 'this' objects specific canvas
Graph.prototype.getCurrentCanvas = function() {
    return this.canvas;
}

Graph.prototype.clearCanvas = function() {
	this.ctx.clearRect(0, 0, this.width, this.height);
}

Graph.prototype.renderGraph = function () {
  this.clearCanvas();
  this.plot();
};

// More specific Graphs
function LineGraph() {
    Graph.apply(this, arguments); // Inherit
}
// Configure prototypes
LineGraph.prototype = Object.create(Graph.prototype);

LineGraph.prototype.determineXColumns = function() {
    this.xColumns = this.dataChoice.length;
    return this.xColumns;
}

LineGraph.prototype.determineYColumns = function() {
    var maxFound = 0;
    for (var i = 0; i < this.dataChoice.length; i++) {

        if (this.dataChoice[i].rating > maxFound) {
            maxFound = this.dataChoice[i].rating;
        }
    }
    return maxFound;
}

LineGraph.prototype.plot = function() {
	this.ctx.save();
	this.ctx.fillStyle = this.ctx.strokeStyle = "#ED3050";
	this.ctx.lineWidth = 2;
	for (var i = 0; i < this.dataChoice.length; i++) {
		var previousPos = currentPos;
		console.log(previousPos);
		var currentPos = this.getPos(i, this.dataChoice[i].rating);
		console.log(currentPos);
		this.ctx.beginPath();
		this.ctx.arc(currentPos.x, currentPos.y, 2, 0, (Math.PI*2), false);
		this.ctx.fill();

		if (previousPos) {
			this.ctx.moveTo(previousPos.x, previousPos.y);
			this.ctx.lineTo(currentPos.x, currentPos.y);
			this.ctx.stroke();
		}
	}

	this.ctx.restore();
}

LineGraph.prototype.getPos = function (a, b) {
  	return {
    	x: ~~(this.canvas.width / this.determineXColumns() * a),
    	y: ~~(this.canvas.height - this.canvas.height / this.determineYColumns() * b)
  	};
};

var testDataGraph = new LineGraph(config,testData);
var canvas = testDataGraph.getCurrentCanvas();
document.getElementById('graph').appendChild(canvas);
testDataGraph.renderGraph();
