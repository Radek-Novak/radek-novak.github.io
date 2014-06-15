(function() {
var d = [451, 434, 437, 438, 444, 383, 447, 448, 455, 434, 444, 383, 436, 459, 438, 401, 440, 446, 434, 442, 445, 383, 436, 448, 446],
	emi = '';

for (var i = 0; i< d.length; i++) 
	emi += String.fromCharCode(d[i]-337);

$('#contact .obfusc')
	.replaceWith($('<a>').attr('href', 'mailto:'+emi).text(emi));

})();
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

// smooth scrolling from: http://css-tricks.com/snippets/jquery/smooth-scrolling/
$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});
