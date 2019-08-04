/*
TODO:
- view events not always working at bottom of page (footer, cta bottom parts)
*/

 (function($, Event, window, document){

    var options = {
        debug: true,
        showEvents: false,
        clickEvents: {
            // Home (Powerpoint pg. 9)
            '.logo':                                    function(e) { sendEvent('send', 'event', 'GiantUpdate-Microsite', 'click', 'Top Nav > Mabinogi Logo') },
            '[href="#section-2"]':                      function(e) { sendEvent('send', 'event', 'GiantUpdate-Microsite', 'click', 'Top Nav > Final Strike') },
            '[href="#section-3"]':                      function(e) { sendEvent('send', 'event', 'GiantUpdate-Microsite', 'click', 'Top Nav > Stampede') },
            '[href="#section-4"]':                      function(e) { sendEvent('send', 'event', 'GiantUpdate-Microsite', 'click', 'Top Nav > New Weapons') },
            '[href="#section-5"]':                      function(e) { sendEvent('send', 'event', 'GiantUpdate-Microsite', 'click', 'Top Nav > Improve Combat Skills') },
            '[href="#section-6"]':                      function(e) { sendEvent('send', 'event', 'GiantUpdate-Microsite', 'click', 'Top Nav > Renewed Combat Skills') },
            // '.j-play-free':                          function(e) { sendEvent('send', 'event', 'GiantUpdate-Microsite', 'click', 'Top Nav > Go to Main Site') },
            'header .go-to-main-site':                  function(e) { sendEvent('send', 'event', 'GiantUpdate-Microsite', 'click', 'Top Nav > Play Free Now') },

            'footer .go-to-main-site':                  function(e) { sendEvent('send', 'event', 'GiantUpdate-Microsite', 'click', 'Footer  > Go to Main Site') }

        },
        hoverEvents: {
            '.skill-list li:nth-child(1)':              function(e) { sendEvent('send', 'event', 'GiantUpdate-Microsite', 'hover', 'Improved Combat Skills > Giant Full Swing') },
            '.skill-list li:nth-child(2)':              function(e) { sendEvent('send', 'event', 'GiantUpdate-Microsite', 'hover', 'Improved Combat Skills > Throwing Attack') },
            '.skill-list li:nth-child(3)':              function(e) { sendEvent('send', 'event', 'GiantUpdate-Microsite', 'hover', 'Improved Combat Skills > Wind Guard') },
            '.skill-list li:nth-child(4)':              function(e) { sendEvent('send', 'event', 'GiantUpdate-Microsite', 'hover', 'Improved Combat Skills > Stomp') }
        },
        nonInteractions: {
            '.section-2':                               function() { sendEvent('send', 'event', 'GiantUpdate-Microsite', 'view', 'Final Strike', true) },
            '.section-3':                               function() { sendEvent('send', 'event', 'GiantUpdate-Microsite', 'view', 'Stampede', true) },
            '.section-4':                               function() { sendEvent('send', 'event', 'GiantUpdate-Microsite', 'view', 'New Weapons', true) },
            '.section-5':                               function() { sendEvent('send', 'event', 'GiantUpdate-Microsite', 'view', 'Improved Combat Skills', true) },
            '.section-6':                               function() { sendEvent('send', 'event', 'GiantUpdate-Microsite', 'view', 'Renewed Costumes', true) }
        }
    };

    var inited = false;
    var $p = $('.main');

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
        $.each(options.clickEvents,function(i,v){
            if (options.showEvents) console.log('track',i)
            $(i).on('click',function(e){
                if (v instanceof Function) v(e,$(this));
            });
        });

        // track mouseover events
        $.each(options.hoverEvents,function(i,v){
            if (options.showEvents) console.log('track',i)
            $(i).on('mouseover',function(e){
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

     $(window).load(function(){
         init();
     })

}(jQuery, Event, window, window.document));

