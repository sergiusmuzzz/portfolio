
//Pause video on desktop when out of view
function pauseVideo() {
    var $halfContainer, $video;

    $.each($('.video') ,function(){
        $halfContainer = $(this).height()/2;
        $video = $(this).find('video');
        if($(this).offset().top + $halfContainer < $(window).scrollTop() || $(this).offset().top - $halfContainer > $(window).scrollTop()) {
            $video[0].pause();
        }else{
            $video[0].play();
        }
    });
}

pauseVideo();

$(window).on('scroll', pauseVideo);
