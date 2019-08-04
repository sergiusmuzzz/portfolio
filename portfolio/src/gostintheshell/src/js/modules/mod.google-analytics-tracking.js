/*
 TODO:
 - view events not always working at bottom of page (footer, cta bottom parts)
 */

(function($, Event, window, document){
    /* var imageIndex;

    $('.slick-slide').on('click', function () {
        imageIndex = $(this).data('slick-index') + 1;
    });
    var mobileGa;
    $('.mobile-menu-popup [data-ga]').on('click', function () {
        mobileGa = $(this).data('ga');
    });*/

    var recruits;
    $('.recruits [data-ga]').on('click', function () {
        recruits = $(this).data('ga');
    });

    var options = {
        debug: true,
        showEvents: false,
        events: {

            // Global Nav (Powerpoint pg. 7)
            'header .play-buttons':                                 function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Top Nav > Play Free') },
            '.gear .button ':                                       function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Buy Gear CTA') },
            '.recruits [data-ga]':                                  function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', recruits) },
            '[data-ga="Play Main Video"]':                          function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Play Main Video') }
            // Global Footer (Powerpoint pg. 8)
            /*'footer a[href*="privacy-policy"]':                     function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Footer > Privacy Policy') },
             'footer a[href*="terms-of-use"]':                       function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Footer > Terms of Service') },
             'footer a[href*="hc/en-us"]':                           function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Footer > Get Support') },
             'footer .fb-icon':                                      function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Footer > Facebook') },
             'footer .twitter-icon':                                 function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Footer > Twitter') },
             'footer .youtube-icon':                                 function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Footer > YouTube') },
            'footer [data-lang="en"]':                              function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Footer > English (US)') },
            'footer [data-lang="es"]':                              function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Footer > Espanol (LA)') },
            'footer [data-lang="de"]':                              function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Footer > Deutsch') },
            'footer [data-lang="fr"]':                              function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Footer > Francais') },*/

            // Global Footer (Powerpoint pg. 15)
           /*
            '[data-ga="cyber-case"] .play':                         function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Part 1 > Cyber Case > Watch Demo CTA') },
            '[data-ga="Buy Now CTA"]':                              function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Part 1 > Cyber Case > Buy Now CTA') },
            '[data-ga="paint-system"] .play':                       function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Part 1 > Paint System > Watch Demo CTA') },
            '[data-ga="district-ruins"] .play':                     function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Part 1 > District Ruins > Map Preview CTA') },
            '.carousel .slick-next':                                function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Part 1 > District Ruins > Right arrow') },
            '.carousel .slick-prev':                                function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Part 1 > District Ruins > Left arrow') },
            '.carousel .slick-slide':                               function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Part 1 > District Ruins > Image ' +  imageIndex) },
            '.updates [data-ga="Read More CTA"]':                   function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Part 1 > Updates > Read More CTA' ) },

            '.mobile-nav':                                          function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'view', 'Top Nav Mobile', true) },
            '.mobile-menu-popup [data-ga]':                         function(e) { sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Top Nav Mobile > ' + mobileGa) }*/

        },


        // Renewal Main (Powerpoint pg. 8)
        nonInteractions: {
            '[data-ga="Panel 2"]':                                  function() { sendEvent('send', 'event', 'Microsite-Renewal', 'view', 'Panel 2', true) },
            '[data-ga="Panel 3"]':                                  function() { sendEvent('send', 'event', 'Microsite-Renewal', 'view', 'Panel 3', true) },
            '[data-ga="Panel 4"]':                                  function() { sendEvent('send', 'event', 'Microsite-Renewal', 'view', 'Panel 4', true) },
            '[data-ga="Panel 5"]':                                  function() { sendEvent('send', 'event', 'Microsite-Renewal', 'view', 'Panel 5', true) },
            '[data-ga="Panel 6"]':                                  function() { sendEvent('send', 'event', 'Microsite-Renewal', 'view', 'Panel 6', true) }
        },
        sources: {
        }
    };

    var inited = false;
    var $b = $('body');

    var init = function() {
        if (inited) return false;
        initialize();
        inited = true;
        // waiting for page to load a little before tracking view events
        setTimeout(function(){
            render();
            $(window).scroll(render);
        },500);
    };

    var sendEvent = function(send,event,category,action,label,opt_noninteraction) {
        if (opt_noninteraction != undefined && opt_noninteraction != false) opt_noninteraction = true;
        if (typeof(ga) != "undefined" && ga instanceof Function) {
            if (opt_noninteraction) {
                ga(send,event,category,action,label,{'noninteraction': true});
                if (options.debug) console.log('ga',send,event,category,action,label,opt_noninteraction)
            } else {
                ga(send,event,category,action,label);
                if (options.debug) console.log('ga',send,event,category,action,label)
            }
        }
    };

    var initialize = function() {

        // track click events
        $.each(options.events,function(i,v){
            if (options.showEvents) console.log('track',i)
            $(i).on('click',function(e){
                if (v instanceof Function) v(e,$(this));
            });
        });

        // track nonInteraction events 1 time only
        var viewCache = {};
        Event.on('tracking:view',function(data){
            if (!data) return false;
            if (!data.key || !data.action) return false;
            if (!viewCache[data.key]) {
                data.action();
                viewCache[data.key] = true;
            }
        });

        var $body = $('body');

        /*$body.on('click','.main-video-video-popup .close' ,function(e){
            e.preventDefault();
            sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Part 1 > Play Main Video > Close Window');
            $('.video-popup').removeClass($currentPopupName);
        });*/

        $body.on('click','.cyber-case-video-popup .close',function(e){
            e.preventDefault();
            sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Part 1 > Cyber Case > Watch Demo CTA > Close Window');
            $('.video-popup').removeClass($currentPopupName);
        });

        $body.on('click','.paint-system-video-popup .close',function(e){
            e.preventDefault();
            sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Part 1 > Pain System > Watch Demo CTA > Close Window');
            $('.video-popup').removeClass($currentPopupName);
        });

        $body.on('click','.district-ruins-video-popup .close',function(e){
            e.preventDefault();
            sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Part 1 > District Ruins > Map Preview CTA > Close Window');
            $('.video-popup').removeClass($currentPopupName);
        });

        $body.on('click','.m-lightbox__ui-close',function(e){
            e.preventDefault();
            sendEvent('send', 'event', 'Microsite-Renewal', 'click', 'Part 1 > District Ruins > ' + $(this).data('ga') + ' > Close Window');
        });
    };

    /* detect if element is in view */

    var render = function() {
        for(var key in options.nonInteractions) {
            var $item = $(key);
            if ($item.length) {
                if (isScrolledIntoView($item)) {
                    Event.trigger('tracking:view',{ key: key, action: options.nonInteractions[key] })
                }
            }
        }
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            // you're at the bottom of the page
            Event.trigger('tracking:view',{ key: key, action: options.nonInteractions['footer'] });
        }
    }

    var isScrolledIntoView = function($el) {
        var elemTop = parseInt($el.offset().top,10);
        var elemBottom = parseInt(elemTop + $el.height(),10);
        var pageY = window.pageYOffset + (window.innerHeight/2);
        var isVisible = (pageY >= elemTop) && (pageY <= elemBottom);
        //console.log($el,elemTop, pageY, elemBottom)
        return isVisible;
    }

    /* get Info for Tracking Events */

    /*var getSource = function() {
     var source = "";

     // set source based on body class
     if ($b.hasClass('part-1')) source = "Part 1";

     // check if source element is in view
     /!*for(var key in options.sources) {
     var $item = $(key);
     if ($item.length) {
     if (isScrolledIntoView($item)) {
     source = options.sources[key]();
     }
     }
     }

     if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
     // you're at the bottom of the page
     source = "Footer";
     }*!/


     return source;
     };*/

    $(window).load(function(){
        init();
    })

}(jQuery, Event, window, window.document));

