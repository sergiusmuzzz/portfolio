$('.play-nexon-launcher').on('click', function(e) {
    // nexon.gnt.fspopupSignup();
    javascript:nexon.play('SVG035');
});


$('.is-lightbox').appLightBox();

var $currentPopupName;

$('.is-video-popup').on('click', function(e) {
    e.preventDefault();
    $currentPopupName = $(this).parents("section").data('ga') + "-video-popup";
    $('.video-popup').addClass($currentPopupName);
    // console.log($currentPopupName);
    $('html').addClass('video-popup-is-on');

    var href = $(this).attr('href');

    if(href.match("youtube.com")){
        $('.video-popup .content').append('<iframe width="560" height="315" src="' + href + '"/>');
        return false;
    }

});

$('.video-popup .close').on('click', function(e) {
    e.preventDefault();
    $('html').removeClass('video-popup-is-on');
    $('.video-popup .content iframe').remove();
});

$('.play-buttons').on('click', function (e) {
    e.preventDefault();
    $('body').addClass('play-buttons-popup-is-on');
});
$('.play-buttons-popup .close,.play.play-nexon-launcher').on('click', function (e) {
    e.preventDefault();
    $('body').removeClass('play-buttons-popup-is-on');
});

$('.mobile-nav').on('click', function (e) {
    e.preventDefault();
    $('html').addClass('mobile-menu-popup-is-on');
});
$('.mobile-menu-popup .close, .mobile-menu-popup a').on('click', function (e) {
    e.preventDefault();
    $('html').removeClass('mobile-menu-popup-is-on');
});

//Tabs
var $tabs = $('.tabs'),
    $tab = $('.tab'),
    $tab_img = $('.tab-img'),
    $current_tab_value;
    // $background_url = $('.recruits').data('bg');

$tabs.on('click', 'li', function(e){
    e.preventDefault();
    $current_tab_value = $(this).attr('data-tab');
    $tab.hide();
    $tab_img.hide();
    $tabs.find('li').removeClass('current');
    $(this).addClass('current');
    $('.' + $current_tab_value).show();
});

// Cache selectors
var lastId,
    topMenu = $(".side-navigation"),
    topMenuHeight = topMenu.outerHeight(true)+1,
    // All list items
    menuItems = topMenu.find("a"),
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
    // menuItems.removeClass("active");
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 850);
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
    // Get container scroll position
    var fromTop = $(this).scrollTop()+topMenuHeight-450;

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


$('.nav-left a, .mobile-menu-popup .content a').on('click', function (e) {
    e.preventDefault();
    $('.nav-left a, .mobile-menu-popup .content a').removeClass('is-active');
    $('.mobile-menu-popup .content a').removeClass('is-active');
    $(this).addClass('is-active');
    if($('html').hasClass('mobile-menu-popup-is-on')){
        $('html').removeClass('mobile-menu-popup-is-on');
    }
});

$('.logo').on('click', function () {
    $('.nav-left a, .mobile-menu-popup .content .m-item').removeClass('is-active');
});



// Cookie
var cookieName = 'renewal-audio';
var soundCookie = WebCookie.getCookie(cookieName) || 'true';

// set mute/unmute based on cookie
var $mainVideo = $(".main-video");


// Main video controllers

var $muteIcon = $('.renewal .mute'),
    $muteBtn = $('.mute-icon');

// mute/unmute
if (soundCookie === 'true') {
    $mainVideo.prop('muted',true);
    $muteBtn.addClass('is-active');
}else{
    $mainVideo.prop('muted',false);
    $muteBtn.removeClass('is-active');
}

$muteIcon.on('click', function () {
    $muteBtn.toggleClass('is-active');
    if (!$muteBtn.hasClass('is-active')) {
        $mainVideo.prop('muted', false);
        WebCookie.setCookie(cookieName,true,30);
    }else{
        $mainVideo.prop('muted', true);
        // $muteBtn.addClass('is-active');
        WebCookie.setCookie(cookieName,false,30);
    }
});

$('.play-icon a').on('click', function() {
    if(!$mainVideo.prop('muted')) {
        $mainVideo.prop('muted', true);
    }
});

$('body').on('click', '.main-video-video-popup .close', function () {
    if($mainVideo.prop('muted') &&  !$('.mute-icon').hasClass('is-active')) {
        $mainVideo.prop('muted', false);
    }
});


// Check browser's window size
var isMobile = window.matchMedia("only screen and (max-width: 640px)"),
    isTablet = window.matchMedia("only screen and (max-width: 1024px)"),
    $swapImg = $('img[data-src]'),
    imgSrc;

checkSize();
$(window).on('resize', function () {
    checkSize();
});

function checkSize() {
    $swapImg.each(function(){
        imgSrc = $(this).data('src');
        /*if(isMobile.matches){
          $(this).attr('src', imgSrc + '-touch.png')
        }else */if(isTablet.matches){
            $(this).attr('src', imgSrc + '-touch.png')
        }else{
            $(this).attr('src', imgSrc + '.png')
        }
    });
}

checkSize();

//Pause video on desktop when out of view
function pauseVideo() {
    var $halfContainer = $('.renewal').height()/2;
    if($('.renewal').offset().top + $halfContainer < $(window).scrollTop()){
        $mainVideo[0].pause();
    }else{
        $mainVideo[0].play();
    }
}

$(window).on('resize', checkSize);
$(window).on('scroll', pauseVideo);