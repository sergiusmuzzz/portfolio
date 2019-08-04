$('.mobile-nav').on('click', function (e) {
    e.preventDefault();
    $('html').addClass('mobile-menu-popup-is-on');
});

$('.mobile-menu-popup .close').on('click', function (e) {
    e.preventDefault();
    $('html').removeClass('mobile-menu-popup-is-on');
});

$('.mobile-menu-popup .is-toggle .icon-up-arrow').on('click', function (e) {
    e.preventDefault();
    $(this).parent().toggleClass('is-active');
    $(this).siblings().slideToggle();
});
