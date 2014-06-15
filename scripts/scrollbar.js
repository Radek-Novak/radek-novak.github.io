$('.reference').mCustomScrollbar({
    horizontalScroll: true,
    scrollButtons: {
        enable: false
    },
    autoDraggerLength: false
});

function referenceResize () {
	var ref = $('.reference'),
		refW = ref.width();

	ref.find('ul li a').css({'width': refW, 'height': refW});
}
