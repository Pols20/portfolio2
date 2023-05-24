$('a[href^="#"').on('click', function() {

    let href = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(href).offset().top
    });
    return false;
});

$(document).ready(function() {
	$(".hmenu").click(function() {
		$(".header-menu").toggleClass("show");
		$(this).toggleClass("showw");
	});
});

$(window).on('load resize', function() {
	if ($(window).width() < 769) {
		$('#items:not(.slick-initialized)').slick({
			centerMode: true,
			dots: false,
			infinite: true,
			speed: 100,
			slidesToShow: 1
		});
	} else {
		$("#items.slick-initialized").slick("unslick");
	}
});

$(window).on('load resize', function() {
	if ($(window).width() < 769) {
		$('#items2:not(.slick-initialized)').slick({
			centerMode: true,
			dots: false,
			infinite: true,
			speed: 100,
			slidesToShow: 1
		});
	} else {
		$("#items2.slick-initialized").slick("unslick");
	}
});

$(window).on('load resize', function() {
	if ($(window).width() < 769) {
		$('#items3:not(.slick-initialized)').slick({
			centerMode: true,
			dots: false,
			infinite: true,
			speed: 100,
			slidesToShow: 1
		});
	} else {
		$("#items3.slick-initialized").slick("unslick");
	}
});

$(window).on('load resize', function() {
	if ($(window).width() < 769) {
		$('#items4:not(.slick-initialized)').slick({
			centerMode: true,
			dots: false,
			infinite: true,
			speed: 100,
			slidesToShow: 1
		});
	} else {
		$("#items4.slick-initialized").slick("unslick");
	}
});