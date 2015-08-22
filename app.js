var testData = [
  {
    name: 'JavaScript',
    rating: 100
  },
  {
    name: 'Go',
    rating: 90
  },
  {
    name: 'PHP',
    rating: 12
  },
  {
    name: 'Ruby',
    rating: 45
  },
  {
    name: 'Python',
    rating: 80
  },
  {
    name: 'Haskell',
    rating: 100
  }
];

// Base Graph
function Graph(width, height, arr) {
	this.modeSetData(arr);
	this.beginCanvas(width, height);
}

// Set data for later use by Children
Graph.prototype.modeSetData = function(arr) {
	this.dataChoice = arr;
}

// Initialize Canvas
Graph.prototype.beginCanvas = function(width, height) {
	this.canvas = document.createElement('canvas');
	this.ctx = this.canvas.getContext('2d');
	this.updateSize(width, height);
}

// Update canvas size
Graph.prototype.updateSize = function(width, height) {
	this.canvas.width = width;
	this.canvas.height = height;
}

// Grab 'this' objects specific canvas
Graph.prototype.getCurrentCanvas = function() {
  return this.canvas;
}

// More specific Graphs
function LineGraph() {
	Graph.apply(this, arguments); // Inherit
}
// Configure prototypes
LineGraph.prototype = Object.create(Graph.prototype);

LineGraph.prototype.getLargestX = function() {
	console.log(this.dataChoice.length);
}
LineGraph.prototype.getLargestY = function() {}


var graph = new Graph(350, 350);
var canvas = graph.getCurrentCanvas();
document.getElementById('graph').appendChild(canvas);

var testDataGraph = new LineGraph(350, 350, testData);
testDataGraph.getLargestX();