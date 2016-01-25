'use strict';

function ImageGenerator(el, width, height) {
	var size = el.getAttribute('data-size');
	if(size) {
		size = size.split(' ');
		width = size[0];
		height = (size.length < 2) ? size[0] : size[1];
	}

	this.el = el;
	this.imgWidth = width || 50;
	this.imgHeight = height || 50;
	this.svgSetup();
}

ImageGenerator.prototype = {
	el: undefined,
	imgWidth: undefined,
	imgHeight: undefined,
	svg: undefined,
	svgNS: undefined,
	svgSetup: function() {
		var imgClassName = this.el;
		this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.svgNS = this.svg.namespaceURI;
		this.svg.setAttribute('width', '' + this.imgWidth + 'px');
		this.svg.setAttribute('height', '' + this.imgHeight + 'px');
		this.svg.setAttribute('viewBox', '0 0 ' + this.imgWidth + ' ' + this.imgHeight);
		this.svg.setAttribute('xml:space', 'preserve');
		this.svg.setAttribute('class', imgClassName.getAttribute('class'));
		this.init();
	},
	circle: function() {
		var circle = document.createElementNS(this.svgNS, 'circle');
		circle.setAttribute('cx', this.randomSize());
		circle.setAttribute('cy', this.randomSize());
		circle.setAttribute('r', this.randomSize());
		circle.setAttribute('fill', this.randomColor());
		this.svg.appendChild(circle);
	},
	line: function() {
		var line = document.createElementNS(this.svgNS, 'line');
		line.setAttribute('x1', this.randomSize());
		line.setAttribute('x2', this.randomSize());
		line.setAttribute('y1', this.randomSize());
		line.setAttribute('y2', this.randomSize());
		line.setAttribute('stroke-width', this.randomSize());
		line.setAttribute('stroke', this.randomColor());
		this.svg.appendChild(line);
	},
	rect: function() {
		var rect = document.createElementNS(this.svgNS, 'rect');
		rect.setAttribute('x', this.randomSize());
		rect.setAttribute('y', this.randomSize());
		rect.setAttribute('width', this.randomSizeW());
		rect.setAttribute('height', this.randomSizeH());
		rect.setAttribute('fill', this.randomColor());
		//rect.setAttribute('stroke-width', 5);
		//rect.setAttribute('stroke', this.randomColor());
		this.svg.appendChild(rect);
	},
	background: function() {
		var rect = document.createElementNS(this.svgNS, 'rect');
		rect.setAttribute('x', 0);
		rect.setAttribute('y', 0);
		rect.setAttribute('width', this.imgWidth);
		rect.setAttribute('height', this.imgHeight);
		rect.setAttribute('fill', this.randomColor());
		this.svg.appendChild(rect);
	},
	randomSizeH: function() {
		return this.getRandom(0, this.imgHeight);
	},
	randomSizeW: function() {
		return this.getRandom(0, this.imgWidth);
	},
	randomSize: function() {
		return this.getRandom(0, this.imgHeight);
	},
	getRandom: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	randomColor: function() {
		var r = this.getRandom(0, 255);
		var g = this.getRandom(0, 255);
		var b = this.getRandom(0, 255);
		return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	},
	init: function() {
		var loops = this.getRandom(1, 10);
		this.background();
		for (var i = 0; i < loops; i++) {
			if(i % 3 === 0) {
				this.line();
			} else if (i % 2 === 0) {
				this.circle();
			}
		}
		var parentDiv = this.el.parentNode;
		parentDiv.insertBefore(this.svg, this.el.nextSibling);
		parentDiv.removeChild(this.el);
	}
};
