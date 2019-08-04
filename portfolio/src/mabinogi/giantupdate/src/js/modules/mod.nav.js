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

$('.hamburger').on('click', function (e) {
    e.preventDefault();
    if($('html').hasClass('mobile-menu-popup-is-on')){
        $('html').removeClass('mobile-menu-popup-is-on');
    }else{
        $('html').addClass('mobile-menu-popup-is-on');
    }
});
$('.mobile-menu-popup .close, .nav-item').on('click', function (e) {
    e.preventDefault();

    $('html').removeClass('mobile-menu-popup-is-on');
});
var isMobile = window.matchMedia("only screen and (max-width: 640px)")
// Cache selectors
var lastId,
    topMenu = $(".top-navigation"),
    topMenuHeight = topMenu.outerHeight(true)+1,
    // All list items
    menuItems = $(".nav-anchor"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-100;
    if(isMobile.matches){
        offsetTop = offsetTop+25;
    }
        // menuItems.removeClass("active");
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 850);
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
    // Get container scroll position
    var fromTop = $(this).scrollTop()+topMenuHeight+100;

   /* if(isMobile.matches){
        fromTop -= 700;
    }*/
    // Get id of current scroll item
    var cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
            return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
            .removeClass("active")
            .filter("[href=#"+id+"]").addClass("active");
    }
});