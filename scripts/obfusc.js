(function() {
var d = [451, 434, 437, 438, 444, 383, 447, 448, 455, 434, 444, 383, 436, 459, 438, 401, 440, 446, 434, 442, 445, 383, 436, 448, 446],
	emi = '';

for (var i = 0; i< d.length; i++) 
	emi += String.fromCharCode(d[i]-337);

$('#contact .obfusc')
	.replaceWith($('<a>').attr('href', 'mailto:'+emi).text(emi));

})();