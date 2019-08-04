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
            '.logo':                                    function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'Top Nav > Logo') },
            '[href="#section-2"]':                      function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'Top Nav > Story') },
            '[href="#section-3"]':                      function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'Top Nav > New Techniques') },
            '[href="#section-4"]':                      function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'Top Nav > New Missions') },
            '[href="#section-5"]':                      function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'Top Nav > Seven Nightmares') },
            '.j-play-free':                             function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'Top Nav > Play Free Button') },
            '.main-video':                              function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'Top Nav > Play Trailer') },

            '.set-1 li:nth-child(1)':                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'New Technique > Iron Will') },
            '.set-1 li:nth-child(2)':                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'New Technique > Blunting Field') },
            '.set-1 li:nth-child(3)':                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'New Technique > Vital Surge') },
            '.set-1 li:nth-child(4)':                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'New Technique > Dampen Shock') },
            '.set-1 li:nth-child(5)':                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'New Technique > Defiance') },

            '.set-2 li:nth-child(1)':                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'New Technique > Time Shift') },
            '.set-2 li:nth-child(2)':                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'New Technique > Elemental Attunement') },
            '.set-2 li:nth-child(3)':                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'New Technique > Redoubled Offensive') },
            '.set-2 li:nth-child(4)':                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'New Technique > Exploit Weakness') },
            '.set-2 li:nth-child(5)':                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'New Technique > Relentless Assault') },

            '.carousel-1 .owl-prev':                    function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'New Missions  > Mission Types > Left Arrow') },
            '.carousel-1 .owl-next':                    function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'New Missions  > Mission Types > Right Arrow') },
            '.carousel-2 .owl-prev':                    function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'New Missions  > Feith Fiada > Left Arrow') },
            '.carousel-2 .owl-next':                    function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'New Missions  > Feith Fiada > Right Arrow') },
            '.carousel-3 .owl-prev':                    function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'Seven Nightmares > Mission Guide > Left Arrow') },
            '.carousel-3 .owl-next':                    function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'Seven Nightmares > Mission Guide > Right Arrow') },

            '.go-to-main-site':                         function(e) { sendEvent('send', 'event', 'G22-Microsite', 'click', 'Footer  > Go to Main Site') }

        },
        hoverEvents: {
            '.tip-1':                                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'hover', 'New Technique > Set') },
            '.tip-2':                                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'hover', 'New Technique > Set Name') },
            '.tip-3':                                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'hover', 'New Technique > Activate Set') },
            '.tip-4':                                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'hover', 'New Technique > All Skills') },
            '.tip-5':                                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'hover', 'New Technique > Skills Icon') },
            '.tip-6':                                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'hover', 'New Technique > Technique Set Effect') },
            '.tip-7':                                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'hover', 'New Technique > Save Set Settings') },
            '.tip-8':                                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'hover', 'New Technique > Display Info') },
            '.tip-9':                                   function(e) { sendEvent('send', 'event', 'G22-Microsite', 'hover', 'New Technique > Skill Level') },
            '.tip-10':                                  function(e) { sendEvent('send', 'event', 'G22-Microsite', 'hover', 'New Technique > Skill Level Icon') },
            '.tip-11':                                  function(e) { sendEvent('send', 'event', 'G22-Microsite', 'hover', 'New Technique > AP') }
        },
        nonInteractions: {
            '.section-2':                               function() { sendEvent('send', 'event', 'G22-Microsite', 'view', 'Story', true) },
            '.section-3':                               function() { sendEvent('send', 'event', 'G22-Microsite', 'view', 'New Technique', true) },
            '.section-4':                               function() { sendEvent('send', 'event', 'G22-Microsite', 'view', 'New Missions', true) },
            '.section-5':                               function() { sendEvent('send', 'event', 'G22-Microsite', 'view', 'Seven Nightmares', true) }
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

