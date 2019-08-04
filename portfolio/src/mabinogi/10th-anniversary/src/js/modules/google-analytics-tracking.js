/*
TODO:
- view events not always working at bottom of page (footer, cta bottom parts)
*/

 (function($, Event, window, document){

    var options = {
        debug: true,
        showEvents: false,
        events: {

            // Home (Powerpoint pg. 9)
            '.j-play-free':             function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Top Nav > Play Free Button') },
            '.go-to-main-site':         function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Top Nav > Go To Main Site') },
            '.trailer':                 function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Watch Trailer') },
            '.section-1-1':             function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Side Nav > Introduction') },
            '.section-2':               function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Side Nav > Weekend Hot Days') },
            '.section-3':               function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Side Nav > 10 Days of Giveaways') },
            '.section-4':               function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Side Nav > Troublemakers') },
            '.section-5':               function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Side Nav > Cave of Trials') },
            '.section-6':               function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Side Nav > Popularity Contest') },
            '.section-7':               function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Side Nav > The Fattening') },
            '.section-8':               function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Side Nav > Thank-you Notes') },
            '.section-9':               function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Side Nav > Festia Instant Prize') },
            '.section-10':              function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Side Nav > Mabi Coin Exchange') },
            '.section-11':              function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Side Nav > Special Gift Box') },

            '.learn-more':              function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Footer > Learn More About The Event') },
            '.share-facebook':          function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Footer > Share on Facebook') },
            '.share-twitter':           function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Footer > Tweet on Twitter') },
            '.pin':                     function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Footer > Pin on Pinterest') },
            '.social .icon-facebook':   function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Footer > Facebook') },
            '.social .icon-twitter':    function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Footer > Twitter') },
            '.social .icon-youtube':    function(e) { sendEvent('send', 'event', 'Microsite-10thAnniversary', 'click', 'Footer > YouTube') }
        },
        sources: {
        }
    };

    var inited = false;
    var $p = $('.main');

    var init = function() {
        if (inited) return false;
        initialize();
        inited = true;
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

    };

    /* get Info for Tracking Events */

     $(window).load(function(){
         init();
     })

}(jQuery, Event, window, window.document));

