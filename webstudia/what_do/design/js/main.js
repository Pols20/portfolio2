window.onload=function() {

    function goal(name) {
        if (window.ym) {
            try {
                ym(88106679,'reachGoal', name);
            } catch (e) {
                console.error('Goal error: ' + e.message);
            };
        }
    }

    if (document.location.href.split('?')[1]) {
        $.get('/rememberUTMs.php?' + document.location.href.split('?')[1]);
    }

    $(function () {


    let tickerSpeed = 0.4;

    let flickity = null;
    let isPaused = false;
    const slideshowEl = document.querySelector('.responsive__slider__wrap');


    const update = () => {
      if (isPaused) return;
      if (flickity.slides) {
        flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth;
        flickity.selectedIndex = flickity.dragEndRestingSelect();
        flickity.updateSelectedSlide();
        flickity.settle(flickity.x);
      }
      window.requestAnimationFrame(update);
    };

    const pause = () => {
      isPaused = true;
    };

    const play = () => {
      if (isPaused) {
        isPaused = false;
        window.requestAnimationFrame(update);
      }
    };


    flickity = new Flickity(slideshowEl, {
      autoPlay: false,
      prevNextButtons: false,
      pageDots: false,
      draggable: true,
      wrapAround: true,
      selectedAttraction: 0.015,
      friction: 0.25,

    });
    flickity.x = 0;


    slideshowEl.addEventListener('mouseenter', pause, false);
    // slideshowEl.addEventListener('mouseleave', play, false);

    flickity.on('dragStart', () => {
      isPaused = true;
    });


    $('.js__slider__team__arrows .responsive__slider__arrow:first-child').click(function(){
        pause();
        flickity.previous()
    })

    $('.js__slider__team__arrows .responsive__slider__arrow:last-child').click(function(){
        pause();
        flickity.next()
    })




    //
    //   Start Ticker
    //
    //////////////////////////////////////////////////////////////////////



    update();



        $('.js__form').submit(function() {
            if ($(this)[0].checkValidity()) {
                const form = $(this);
                const btn_1 = form.find('button');
                btn_1.prop("disabled", true);
                const formData = $(this).serialize();
                $.ajax({
                    type: "POST",
                    url:  "sendMail.php",
                    data: formData,
                    success: function() {
                        goal('lead');
                        btn_1.prop("disabled", false);
                        form[0].reset();
                        Fancybox.close();
                        window.location.href = "thanks.php";
                    }
                });
            }
        });


        Fancybox.bind('[data-fancybox]', {
            autoFocus: false,
            trapFocus: false,
            dragToClose:false,
            showClass: "fancybox-zoomIn",
            hideClass: "fancybox-zoomOut",
            // closeButton: 'outside',
        });


        $('.js__btn_close__modal').click(function (e) {
            Fancybox.close();
        });


        $('.js__ancor').click(function(e){
            e.preventDefault();
            $('html, body').animate({
                'scrollTop':   $($(this).attr('href')).offset().top - 50
            }, 1200);
        })

        $('.js_footer__menu__link').click(function(e){
            e.preventDefault();
            $('html, body').animate({
                'scrollTop':   $($(this).attr('href')).offset().top - 50
            }, 1200);
        })



        $('.js_modal__menu__list a').click(function(e){
            e.preventDefault();
            $('html, body').animate({
                'scrollTop':   $($(this).attr('href')).offset().top - 50
            }, 1200);

            $('.js_btn_menu').first().trigger('click')
        })


        $('.js__btn__form__two').click(function(e){
            $('.js_modal__two__title').val($(this).data('title'))
        })





        $('.team__item__call').click(function(){

           let team = $(this).closest('.js_team__item');

            $('.js__modal__thre__inner__image').attr('src',team.find('.team__item__image img').attr('src'))
            $('.js_modal__thre__inner__image__info .modal__thre__inner__image__title').html(team.find('.team__item__name').text())
            $('.js_modal__thre__inner__image__info .modal__thre__inner__image__subtitle').html(team.find('.team__item__who').text())

            $('.js_modal__three__title').val('пообщаться - '+team.find('.team__item__name').text())

        })




        $('.js_btn_menu,.js_modal__menu__btn_close,.js_modal__menu__overlay').click(function (e) {
            e.preventDefault();
            $('.js_btn_menu').toggleClass('active')
            $('.js__modal__menu').toggleClass('active')
            $('.js_modal__menu__overlay').toggleClass('active')
        });



        $('.js_responsive__slider__inner').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            n = nextSlide + 1;
            $('.js_responsive__slider__step--current').text('0' + n);
        });

        $('.js_responsive__slider__inner').slick({
            speed: 500,
            fade: true,
            cssEase: 'linear',
            prevArrow: $(".js_responsive__slider__arrows button:first-child"),
            nextArrow: $(".js_responsive__slider__arrows button:last-child"),
        })

        // $(".js_team__list").slick({
        //     infinite: true,
        //     arrows: false,
        //     infinite: true,
        //     speed: 300,
        //     slidesToShow: 1,
        //     variableWidth: true,
        //     swipeToSlide:true

        // })




        $('.js_portfolio__add__list').slick({
            infinite: true,
            slidesToShow: 4,
            prevArrow: $(".js_portfolio__add__btns button:first-child"),
            nextArrow: $(".js_portfolio__add__btns button:last-child"),
            dots: false,
            swipeToSlide: true,
            responsive: [{
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]

        })

        $('body').mousemove(function (e) {
            $('.js_move').each(function (index, element) {
                parallaxIt(e, $(this), $(this).data('speed'))
            });
        });


        function parallaxIt(e, target, movement = 100) {
            var $this = $('body');

            gsap.to(target, {
                x: (e.clientX - $this.width() / 1.5) / $this.width() * movement,
                y: (e.clientY - $this.width() / 1.5) / $this.width() * movement,
            })
        }





        gsap.registerPlugin(ScrollTrigger);




        $(".js__title__animate").each(function () {
            el = $(this).find('span')
            elParent =  $(this).parent()[0];

            gsap.from(el, 1.2, {
                scrollTrigger:{
                    trigger:elParent,
                    start: 'top 85%',
                },
                y: 100,
                ease: "power4.out",
                delay: 0.25,
                stagger: {
                    amount: 0.3
                }

            })
        })

        $(".js__animate__top").each(function () {
            el = $(this)[0];
            delayTime = $(this).data('delay') ?  $(this).data('delay'): 0;

            gsap.from(el, 1, {
                scrollTrigger:{
                    trigger:el,
                    start: 'top 85%',
                },
                y: 20,
                opacity: 0,
                delay: delayTime,
                ease: "power4.out",
                stagger: {
                    amount: 0.3
                }

            })
        })

        $(".js__animate__tech").each(function () {
            el = $(this)[0];
            delayTime = $(this).data('delay') ?  $(this).data('delay'): 0;

            gsap.from(el, 1, {
                scrollTrigger:{
                    trigger:'.decisions__list',
                    start: 'top 90%',
                },
                y: 20,
                opacity: 0,
                delay: delayTime,
                ease: "power4.out",
                stagger: {
                    amount: 0.3
                }

            })
        })

        $(".js__animate__what_do").each(function () {
            el = $(this)[0];
            delayTime = $(this).data('delay') ?  $(this).data('delay'): 0;

            gsap.from(el, 1, {
                scrollTrigger:{
                    trigger:'.what__do',
                    start: 'top 80%',
                },
                y: 20,
                opacity: 0,
                delay: delayTime,
                ease: "power4.out",
                stagger: {
                    amount: 0.3
                }

            })
        })

        $(".js__animate__triggers").each(function () {
            el = $(this)[0];
            delayTime = $(this).data('delay') ?  $(this).data('delay'): 0;

            gsap.from(el, 1, {
                scrollTrigger:{
                    trigger:'.what__do__triggers',
                    start: 'top 80%',
                },
                y: 20,
                opacity: 0,
                delay: delayTime,
                ease: "power4.out",
                stagger: {
                    amount: 0.3
                }

            })
        })

        $(".js__animate__triggers_2").each(function () {
            el = $(this)[0];
            delayTime = $(this).data('delay') ?  $(this).data('delay'): 0;

            gsap.from(el, 1, {
                scrollTrigger:{
                    trigger:'.what__do__triggers__2',
                    start: 'top 80%',
                },
                y: 20,
                opacity: 0,
                delay: delayTime,
                ease: "power4.out",
                stagger: {
                    amount: 0.3
                }

            })
        })






        $(".js__animate__opacity__promo").each(function () {
            el = $(this)[0];
            delayTime = $(this).data('delay') ?  $(this).data('delay'): 0;

            gsap.from(el, 1, {
                scrollTrigger:{
                    trigger:'.promo',
                    start: 'top 50%',
                },
                y: 20,
                opacity: 0,
                delay: delayTime,
                ease: "power4.out",
                stagger: {
                    amount: 0.3
                }

            })
        })

        gsap.from('.js__animate__move__right', 1.2, {
            scrollTrigger:{
                trigger:'.js__animate__move__right',
                start: 'top 25%',
            },
            x: '150%',
            ease: "power4.out",
            opacity: 0,
            delay: 0.25,
            stagger: {
                amount: 0.3
            }
        })

        gsap.from('.js_online__round--1', 2, {
            scrollTrigger:{
                trigger:'.js_online__round--1',
                start: 'top 50%',
            },
            y: -50,
            opacity: 0,
            ease: "power4.out",
            stagger: {
                amount: 0.3
            }
        })

        gsap.from('.js_online__round--2', 2, {
            scrollTrigger:{
                trigger:'.js_online__round--2',
                start: 'top 50%',
            },
            y: -50,
            delay: 0.5,
            ease: "power4.out",
            opacity: 0,
            stagger: {
                amount: 0.3
            }
        })


        gsap.from('.js_calculation__left', 1.2, {
            scrollTrigger:{
                trigger:'.js_calculation__left',
                start: 'top 35%',
            },
            x: '-150%',
            ease: "power4.out",
            delay: 0.25,
            opacity: 0,
            stagger: {
                amount: 0.3
            }
        })

        gsap.from('.js_calculation__right', 1.2, {
            scrollTrigger:{
                trigger:'.js_calculation__right',
                start: 'top 35%',
            },
            x: '150%',
            ease: "power4.out",
            delay: 0.25,
            opacity: 0,
            stagger: {
                amount: 0.3
            }
        })

        gsap.from('.js__question__image__1', 1.2, {
            scrollTrigger:{
                trigger:'.question',
                start: 'top 45%',
            },
            y: '-150%',
            ease: "power4.out",
            opacity: 0,
            stagger: {
                amount: 0.3
            }
        })

        gsap.from('.js__question__image__2', 1.2, {
            scrollTrigger:{
                trigger:'.question',
                start: 'top 5%',
            },
            y: '150%',
            ease: "power4.out",
            opacity: 0,
            stagger: {
                amount: 0.3
            }
        })



        gsap.from('.js__animate__trigger--1--1',1,{
            scrollTrigger:{
                trigger:'.what__do__triggers__item__image',
                start: 'top 50%',
            },
            opacity: 0,
            ease: "ease-in-out",
            delay:2

        })


        gsap.from('.js__animate__trigger--1--2',1,{
            scrollTrigger:{
                trigger:'.what__do__triggers__item__image',
                start: 'top 50%',
            },
            x: '-5',
            y: '-5',
            opacity: 0,
            ease: "ease-in-out",
            delay:0.5

        })


        gsap.from('.js__animate__trigger--1--3',1,{
            scrollTrigger:{
                trigger:'.what__do__triggers__item__image',
                start: 'top 50%',
            },
            x: '5',
            y: '5',
            opacity: 0,
            ease: "ease-in-out",
            delay:1.25

        })


        gsap.from('.js__animate__trigger--3--1',1.5,{
            scrollTrigger:{
                trigger:'.what__do__triggers__item__image',
                start: 'top 50%',
            },
            x: '-50%',
            opacity: 0,
            ease: "ease-in-out",
            delay:1

        })

        gsap.from('.js__animate__trigger--3--2',1.5,{
            scrollTrigger:{
                trigger:'.what__do__triggers__item__image',
                start: 'top 50%',
            },
            opacity: 0,
            ease: "ease-in-out",
            delay:2
        })


        gsap.from('.js__animate__trigger--3--3',1.5,{
            scrollTrigger:{
                trigger:'.what__do__triggers__item__image',
                start: 'top 50%',
            },
            opacity: 0,
            ease: "ease-in-out",
            delay:3
        })

        gsap.from('.js__animate__trigger--2--1',1,{
            scrollTrigger:{
                trigger:'.what__do__triggers__item__image',
                start: 'top 50%',
            },
            x: -10,
            opacity: 0,
            ease: "ease-in-out",
            delay:0.5
        })


        gsap.from('.js__animate__trigger--2--2',1,{
            scrollTrigger:{
                trigger:'.what__do__triggers__item__image',
                start: 'top 50%',
            },
            x: -10,
            opacity: 0,
            ease: "ease-in-out",
            delay:1
        })

        gsap.from('.js__animate__trigger--2--3',1,{
            scrollTrigger:{
                trigger:'.what__do__triggers__item__image',
                start: 'top 50%',
            },
            x: -10,
            opacity: 0,
            ease: "ease-in-out",
            delay:1.5
        })











        gsap.to('.footer_bg--sky', {
            scrollTrigger:{
                trigger:'.js__footer__main__animate',
                start: 'top bottom',
                end:'bottom bottom',
                scrub: true,
            },
            ease: "none",

            opacity: .5,
            y: '50%',

        })






        gsap.from('.footer__main__top .js_move__inner', {
            scrollTrigger:{
                trigger:'.footer__main__top',
                start: 'top 50%',
                end:'70% 50%',
                scrub: true,
            },
            ease: "none",
            y: '50%',
        })

        gsap.from('.js_move__universe', {
            scrollTrigger:{
                trigger:'.footer__main__top',
                start: 'top 50%',
                end:'50% 50%',
                scrub: true,
            },
            ease: "none",
            scale: 0.8,
            y: '20%',
        })








        $(".js__portfolio__item").each(function () {
            el = $(this)[0];
            gsap.from(el, 1.2, {
                scrollTrigger:{
                    trigger:el,
                    start: 'top 100%',
                },
                y: 100,
                opacity: 0.75,
                ease: "power4.out",
                stagger: {
                    amount: 0.3
                }

            })
        })








    })
}