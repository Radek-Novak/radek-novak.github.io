function CanvasDraw (options) {
    var mouseDown = false;
    var currentOffset = {};

    $(window).resize(function () {
        currentOffset = $canvas.offset();
    }).resize();

    options.$canvas.on('mousemove', function(e) {
        if (mouseDown) {
            options.drawFn(e.clientX - currentOffset.left, e.clientY - currentOffset.top);
        }
    });
    options.$canvas.on('mousedown', function(e) {
        mouseDown = true;
        options.drawFn(e.clientX - currentOffset.left, e.clientY - currentOffset.top);
    });
    options.$canvas.on('mouseup', function(e) {
        mouseDown = false;
        options.drawStopFn();
    });

    options.$canvas.on("touchstart", function (e) {
        var touches = e.originalEvent.targetTouches;
        
        for (var i = 0, ii = touches.length; i < ii; i++) {
            options.drawFn(touches[i].clientX - currentOffset.left, touches[i].clientY - currentOffset.top);
        }
    });
    options.$canvas.on("touchend", function (e) {
        options.drawStopFn();
    });
    options.$canvas.on("touchmove", function (e) {
        var touches = e.originalEvent.targetTouches;

        for (var i = 0, ii = touches.length; i < ii; i++) {
            options.drawFn(touches[i].clientX - currentOffset.left, touches[i].clientY - currentOffset.top);
        }
    });
}