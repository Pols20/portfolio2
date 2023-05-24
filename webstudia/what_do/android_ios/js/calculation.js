$(function () {

    const answers = [];

    const $maxStep = $('.js_calculation__steps__view .calculation__step__max');
    const $currentStep = $('.js_calculation__steps__view .calculation__step__current');

    const MAX_STEP = $('.js__calculation__content .calculation__item').length;

    $maxStep.text('0'+MAX_STEP);

    let currentStep = 1;



    const $btnPrev = $('.js__calculation__prev');
    const $btnNext = $('.js__calculation__next');

    const $contentQuize = $('.js__calculation__content')




    $btnPrev.click(function(){
        calculationPrev();
        currentStep--;
        calculationBtsShowHide()
        calculationViewStep()

    })

    $btnNext.click(function(){
        calculationNext();
        currentStep++;
        calculationBtsShowHide()
        calculationViewStep()
    })

    function calculationViewStep(){
        $currentStep.text('0'+currentStep)
    }

    function calculationBtsShowHide(){


        if (currentStep != 1)
            $btnPrev.show(0)
        else
            $btnPrev.hide(0)

        if (currentStep == MAX_STEP)
            $btnNext.hide(0)
        else
            $btnNext.show(0)

        console.log(currentStep)
        console.log(answers)

    }



    function calculationPrev(){
        let $currentElement = $contentQuize.find('.calculation__item:visible');

        $currentElement.prev().fadeIn(0);
        $currentElement.fadeOut(0);
    }


    function calculationNext(){
        let $currentElement = $contentQuize.find('.calculation__item:visible');

        answers[currentStep-1] = [
            $currentElement.find('.calculation__item__title').text(),
            getAnsers($currentElement)
        ]

        $currentElement.fadeOut(0);
        $currentElement.next().fadeIn(0);

    }

    function getAnsers(el){
        let answers = '';
        if (el.find('.calculation__item__choose').length){
            el.find('.calculation__item__choose input:checked').each(function (index, element) {
               answers += $(this).val()+',';
            });
            if (answers) answers = answers.slice(0, -1);
        }
        else{
            answers = el.find('.calculation__item__field input').val()
        }
        return answers;

    }

    $('.js__form__quize').submit(function() {

        answersText = '<hr>';
        answers.forEach(el => {
            answersText += "<p><b>"+el[0]+"</b><br>"+el[1]+"</p>";
        });
        $('.js__question__field').val(answersText)

        if ($(this)[0].checkValidity()) {
            const form = $(this);
            const formData = $(this).serialize();
            $.ajax({
                type: "POST",
                url:  "sendMail.php",
                data: formData,
                success: function() {
                    form[0].reset();
                    Fancybox.close();
                    window.location.href = "thanks.php";
                }
            });
        }
    });



})