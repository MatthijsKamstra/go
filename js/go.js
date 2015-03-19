$( document ).ready(function()
{

	// $(".video-close").addClass( "hidden" );

	$(".nav-button").click(function() {
		var href = $(this).attr('href');
		// alert(href);
		$('html, body').animate({
			scrollTop: $(href).offset().top - 50
		}, 2000);
		event.preventDefault();
	});



	$('.to-the-top a').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});

	// $(window).scroll(function(e) {
 //    	var s = $(window).scrollTop(),
	//     opacityVal = (s/3);
	//     $('#heading').css('background-position-y', opacityVal);
	// });

	$( window ).resize(function()
	{
		repositionEveryting();
	});

	repositionEveryting();

});





function repositionEveryting()
{

	var _w = $('body').innerWidth();
	var _h = $(document).innerHeight();

	var ww = $('#wrap').innerWidth();

	// console.log("_h: " + _h);

	$('#wrap').css('padding-left', (_w-ww)/2);
	// $('#openfl-content').width(_w);
	// $('#openfl-content').height(_h);
	// $('#openfl-content canvas').width(_w);
	// $('#openfl-content canvas').height(_h);
}
