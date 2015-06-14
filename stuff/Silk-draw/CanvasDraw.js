/* 
    options:
        canvas
        drawFn
        drawStopFn
*/
function CanvasDraw (options) {
    var mouseDown = false;
    var currentOffset = {};

    var oldOnMouseMove = options.canvas.onmousemove;
    var oldOnMouseDown = options.canvas.onmousedown;
    var oldOnMouseUp = options.canvas.onmouseup;
    var oldTouchStart = options.canvas.touchstart;
    var oldTouchEnd = options.canvas.touchend;
    var oldTouchMove = options.canvas.touchmove;
    var oldResize = window.resize;

    window.resize = function () {
        var rect = options.canvas.getBoundingClientRect()

        currentOffset = {
          top: rect.top + document.body.scrollTop,
          left: rect.left + document.body.scrollLeft
        }

        if (oldResize)
            oldResize()
    }
    
    window.resize()

    options.canvas.onmousemove = function (e) {
        // uncomment to prevent chrome changing cursor to 'text' when dragging
        // e.preventDefault(); 

        if (mouseDown) {
            options.drawFn(e.clientX - currentOffset.left, e.clientY - currentOffset.top);
        }
        if (oldOnMouseMove)
            oldOnMouseMove(e)
    }
    options.canvas.onmousedown = function (e) {
        mouseDown = true;
        options.drawFn(e.clientX - currentOffset.left, e.clientY - currentOffset.top);
        if (oldOnMouseDown)
            oldOnMouseDown(e);
    };
    options.canvas.onmouseup = function (e) {
        mouseDown = false;
        options.drawStopFn();
        if (oldOnMouseUp)
            oldOnMouseUp(e);
    };

    options.canvas.touchstart = function (e) {
        var touches = e.targetTouches;
        
        for (var i = 0, ii = touches.length; i < ii; i++) {
            options.drawFn(touches[i].clientX - currentOffset.left, touches[i].clientY - currentOffset.top);
        }
        if (touchstart)
            touchstart(e)
    };
    options.canvas.touchend = function (e) {
        options.drawStopFn();

        if (touchend)
            touchend(e)
    };
    options.canvas.touchmove = function (e) {
        var touches = e.targetTouches;

        for (var i = 0, ii = touches.length; i < ii; i++) {
            options.drawFn(touches[i].clientX - currentOffset.left, touches[i].clientY - currentOffset.top);
        }
        if (touchmove)
            touchmove(e)
    };
}

