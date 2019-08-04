var $header;

/*$('a[href*=#]:not([href=#])').click(function () {

    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: (target.offset().top - $('header').height())
            }, 480);
            return false;
        }

    }
});*/
/*
$(window).scroll(function() {

    if ($(window).scrollTop() > target) {

        $('nav').addClass('sticky');

    } else {

        $('nav').removeClass('sticky');
    }

});*/

/*$(window).scroll(function() {

    if ($(window).scrollTop()) {

        $('body').addClass('sticky');

    } else {

        $('body').removeClass('sticky');
    }

});*/


var isMobile = window.matchMedia("only screen and (max-width: 1025px)")
// Cache selectors
/*var hasBeenTrigged = false;

if(isMobile.matches){
    hasBeenTrigged = true;
}

// Bind to scroll

$(window).scroll(function(){
    if ($(this).scrollTop() >= 100 && !hasBeenTrigged){
        $('html,body').animate({
            scrollTop: $(".slider").offset().top - 140
        });
        hasBeenTrigged = true;
    }
});*/
