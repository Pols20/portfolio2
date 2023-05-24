//ссылки

$('a[href^="#"').on('click', function() {

    let href = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(href).offset().top
    });
    return false;
});


//списки

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Закрыть раскрывающийся список, если пользователь щелкнет за его пределами.
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
  var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
}

function myFunction1() {
  document.getElementById("myDropdown1").classList.toggle("show");
}

// Закрыть раскрывающийся список, если пользователь щелкнет за его пределами.
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn1')) {
  var myDropdown1 = document.getElementById("myDropdown1");
    if (myDropdown1.classList.contains('show')) {
      myDropdown1.classList.remove('show');
    }
  }
}

function myFunction2() {
  document.getElementById("myDropdown2").classList.toggle("show");
}

// Закрыть раскрывающийся список, если пользователь щелкнет за его пределами.
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn2')) {
  var myDropdown2 = document.getElementById("myDropdown2");
    if (myDropdown2.classList.contains('show')) {
      myDropdown2.classList.remove('show');
    }
  }
}


function myFunction3() {
  document.getElementById("myDropdown3").classList.toggle("show");
}

// Закрыть раскрывающийся список, если пользователь щелкнет за его пределами.
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn3')) {
  var myDropdown3 = document.getElementById("myDropdown3");
    if (myDropdown3.classList.contains('show')) {
      myDropdown3.classList.remove('show');
    }
  }
}


//слайдеры

$(window).on('load resize', function() {
	$('#items:not(.slick-initialized)').slick({
		centerMode: true,
		dots: false,
		infinite: true,
		speed: 100,
		slidesToShow: 1
	});
});

$(window).on('load resize', function() {
  $('#items1:not(.slick-initialized)').slick({
    centerMode: true,
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 3
  });
});



