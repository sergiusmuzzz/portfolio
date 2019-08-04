$(function () {

    // Check browser's window size
    var isMobile = window.matchMedia("only screen and (max-width: 640px)"),
        isTablet = window.matchMedia("only screen and (max-width: 1024px)"),
        $swapImg = $('img[data-src]'),
        imgSrc;

    checkSize();
    $(window).on('resize', function () {
        checkSize();
        owlCarouselReInit();
    });

    var playOnLoad = document.querySelectorAll('.play-on-load');

    for (var i = 0; i < playOnLoad.length; i++) {
        playOnLoad[i].play();
    }

    function checkSize() {
        $swapImg.each(function () {
            imgSrc = $(this).data('src');
            /*if(isMobile.matches){
              $(this).attr('src', imgSrc + '-touch.png')
            }else */
            if (isTablet.matches) {
                $(this).attr('src', imgSrc + '-touch.png')
            } else {
                $(this).attr('src', imgSrc + '.png')
            }
        });
    }

    function owlCarouselReInit() {
        if (isTablet.matches) {

            $('.cards').owlCarousel({

                // setting to show 1 item on table.
                items: 1,
                nav: true,
                mouseDrag: false

            });
        } else {
            $('.cards').owlCarousel('destroy');
        }
    }

    owlCarouselReInit();

    // Run LightBox Plugin
    $('.lightbox').appLightBox({});

    $('.carousel').owlCarousel({

        // setting to show 1 item on table.
        items: 1,
        nav: true

    });


// $(".cards").owlCarousel();

    $(".video-popup").on("click", function (e) {
        e.preventDefault();
        $('html').addClass('video-popup-is-on');
    });


    $(".cards .lightbox").on("click", function (e) {
        e.preventDefault();
        $('html').addClass('gallery-popup-is-on');
    });

    $('html').on('click', ".m-lightbox .ui_close-icon", function (e) {
        e.preventDefault();
        $('html').removeClass('video-popup-is-on gallery-popup-is-on');
    });

    // ----------- owlCarousel Plugin
    // ----------- owlCarousel Plugin
    /*$('.carousel').owlCarousel({

        // setting to show 1 item on table.
        items : 1,
        nav: true

    });*/

    // binds
    (function ($) {

        var $signUpPopup = $('.m-home-popup-registration');

        // Open Popup of call to action
        $('.j-call-to-action').on('click', function () {

            if (!$signUpPopup.is(":visible")) {
                $signUpPopup.fadeIn();
            }

        });

        // Close Popup of call to action
        $('.j-call-to-action_close').on('click', function () {

            if ($signUpPopup.is(":visible")) {
                $signUpPopup.fadeOut();
            }

        });

        // gnt popup
        $('.j-play-free').on('click', function (e) {
            e.preventDefault();
            if (nexon.util.browserDetect.isMobile()) {
                nexon.gnt.fspopupSignup();
            } else {
                nexon.play("SVG012");
            }
        })


        var tabs = $('.tabs');

        tabs.each(function (i) {

            //Get all tabs
            var tab = $(this).find('li');
            tab.click(function (e) {

                //Get Location of tab's content
                var contentLocation = $(this).attr('data-tab');

                //Let go if not a hashed one

                e.preventDefault();

                //Make Tab Active
                tab.removeClass('is-active');
                $(this).addClass('is-active');

                //Show Tab Content & add active class
                $("." + contentLocation).show().addClass('active').siblings().hide().removeClass('active');
            });
        });

        /*// Get the element with id="defaultOpen" and click on it
              document.getElementById("defaultOpen").click();

              showTab('.tabs button');*/


    })(jQuery);

});