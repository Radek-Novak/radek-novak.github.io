var $canvas = $('canvas');
var ctx = $canvas[0].getContext('2d');
ctx.lineCap = 'round';

var Draw = {
    DPI_MULTIPLIER: 2,
    last: {x: undefined, y: undefined},
    polar: new Polar($canvas.width(), $canvas.height()),
    caleidoPieces: 33,
    clear: function () {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
    stop: function () {
        Draw.last.x = undefined;
        Draw.last.y = undefined;
    },
    drawLine: function (x1, y1, x2, y2) {
        ctx.beginPath();

		//ctx.fillStyle = "rgba(123,234,012, 0.4)";
        ctx.moveTo(x1*Draw.DPI_MULTIPLIER, y1*Draw.DPI_MULTIPLIER);
        ctx.lineTo(x2*Draw.DPI_MULTIPLIER, y2*Draw.DPI_MULTIPLIER);
        ctx.stroke();

    },
    line: function (x, y) {
		if (x !== undefined && y !== undefined) {
            Draw.drawLine(Draw.last.x, Draw.last.y, x, y);
            
            for (var i = 1; i < Draw.caleidoPieces; i++) {
                var next = Draw.polar.addAngle({x: x, y: y}, (2*Math.PI/Draw.caleidoPieces)*i);
                var next2 = Draw.polar.addAngle({x: Draw.last.x, y: Draw.last.y}, (2*Math.PI/Draw.caleidoPieces)*i);
                Draw.drawLine(next.x, next.y, next2.x, next2.y);
            }
		}

        Draw.last.x = x;
        Draw.last.y = y;
    },
    set: function (option, value) {
        // lineCap, strokeStyle
        ctx[option] = value;
    },
    pieces: function (n) {
        Draw.caleidoPieces = n;
    }
};

var canvasHandling = new CanvasDraw({
    canvas: document.querySelector('canvas'), 
    drawFn: Draw.line,
    drawStopFn: Draw.stop
});