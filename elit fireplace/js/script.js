var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;


slider.oninput = function() {
  output.innerHTML = this.value;
}


$('a[href^="#"').on('click', function() {

    let href = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(href).offset().top
    });
    return false;
});

