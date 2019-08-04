var $currentPopupName;

$('.is-video-popup').on('click', function(e) {
    e.preventDefault();
    $currentPopupName = $(this).parents("section").data('ga') + "-video-popup";
    $('.video-popup').addClass($currentPopupName);
    // console.log($currentPopupName);
    $('html').addClass('video-popup-is-on');

    var href = $(this).attr('href');

    if(href.match("youtube.com")){
        $('.video-popup .content').append('<iframe width="560" height="315"  allowfullscreen src="' + href + '"/>');
        return false;
    }
});

$('.video-popup .close').on('click', function(e) {
    e.preventDefault();
    $('html').removeClass('video-popup-is-on');
    $('.video-popup .content iframe').remove();
});
