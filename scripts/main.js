function referenceResize(){var a=$(".reference"),b=a.width();a.find("ul li a").css({width:b,height:b})}!function(){for(var a=[451,434,437,438,444,383,447,448,455,434,444,383,436,459,438,401,440,446,434,442,445,383,436,448,446],b="",c=0;c<a.length;c++)b+=String.fromCharCode(a[c]-337);$("#contact .obfusc").replaceWith($("<a>").attr("href","mailto:"+b).text(b))}(),$(".reference").mCustomScrollbar({horizontalScroll:!0,scrollButtons:{enable:!1},autoDraggerLength:!1}),$(function(){$("a[href*=#]:not([href=#])").click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var a=$(this.hash);if(a=a.length?a:$("[name="+this.hash.slice(1)+"]"),a.length)return $("html,body").animate({scrollTop:a.offset().top},1e3),!1}})});