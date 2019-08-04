
(function($, config, Event, window, document, undefined){

	var init = function() {	

        var $thumbsCarousel = $('#coverflow-carousel');
        if (!$thumbsCarousel.length) return false;

        $thumbsCarousel.find('a').on('click',function(e){
            e.preventDefault();
        });

        /*if ($.fn.reflect) {
            $thumbsCarousel.reflect();
        }*/

        $thumbsCarousel.coverflow({
            index: config.coverflowIndex,
            density: 2,
            innerOffset: 50,
            innerScale: .7,
            enableWheel: false,
            innerAngle: -25,
            select: function(event, cover, index) {
                Event.trigger('coverflow:change',{index:index});
            },
            animateStep:    function(event, cover, offset, isVisible, isMiddle, sin, cos) {
                if (isVisible) {
                    if (isMiddle) {
                        $(cover).css({
                            'filter':           'none',
                            '-webkit-filter':   'none'
                        });
                    } else {
                        var brightness  = 1 + Math.abs(sin),
                            contrast    = 1 - Math.abs(sin),
                            filter      = 'contrast('+contrast+') brightness('+brightness+')';
                        $(cover).css({
                            'filter':           filter,
                            '-webkit-filter':   filter
                        });
                    }
                }
            }
        });
	};

	$(document).ready(function(){
		Event.ready('view-changed',function(view){
            setTimeout(function(){
                init();
            },0);
        });
	});

}(jQuery, config, Event, window, window.document));

