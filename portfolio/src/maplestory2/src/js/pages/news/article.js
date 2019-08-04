
(function($, Event, config, window, document, undefined){

    $(document).ready(function(){

        // Smooth scroll on anchor click
        $(function() {
          $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
              if (target.length) {
                $('html,body').animate({
                  scrollTop: target.offset().top
                }, 500);
                return false;
              }
            }
          });
        });

        function backToTopToggle() {
            if($('.article-page .content').height() >= window.innerHeight){
                $('.back-to-top').show();
                console.log('Show');
            }else{
                $('.back-to-top').hide();
                console.log('Hide');
            }
        }
        backToTopToggle();
        $(window).on('resize', function () {
            backToTopToggle();
        });


        // resize youtube videos
       /* Event.on('inited-locales',function() {
        	resizeIframes();
        });

        Event.on('detected-view',function() {
            setTimeout(function(){
                resizeIframes();
            },250);
        });*/

    });

    /*function resizeIframes() {
        var $iframes = $('#article .content-body').find('iframe');
        if (!$iframes.length) return false;
        $.each($iframes,function(i,v){
            var $t = $(v);
            var width = parseInt($t.css('width'),10);
            var height = parseInt($t.css('height'),10);
            var parentWidth = $('#article .content-body').innerWidth();
            if ($('body').hasClass('desktop')){
                parentWidth = parentWidth;
            }
            var newHeight = (parentWidth * height) / width;
            $t.css('height',newHeight+"px");
            $t.css('width',parentWidth+"px");
        });
    };*/

}(jQuery, Event, config, window, window.document));
