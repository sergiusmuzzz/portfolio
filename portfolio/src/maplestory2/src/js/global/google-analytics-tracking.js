/*
TODO:
- view events not always working at bottom of page (footer, cta bottom parts)
*/

(function($, Event, window, document){

    var options = {
        debug: true,
        showEvents: false,
        events: {

            // Hero Carousel
            '.home-page .featured-news .news-item': function(e) { sendEvent('send', 'event', 'Main', 'click', 'Carousel > '+ $(e.currentTarget).find('h2').text() ) },

            '.info-page header .joddysquad':        function(e) { sendEvent('send', 'event', 'Community', 'click', 'Top Nav > Joddy Squad') },
            '.info-page #_mcenew5':                function(e) { sendEvent('send', 'event', 'Community', 'click', 'Joddy Squad > Apply Now CTA Button') },

            // Info Page Header
            '.info-page header .logo':              function(e) { sendEvent('send', 'event', 'Community', 'click', 'Top Nav > MS2 Logo') },
            '.info-page .nav-status':               function(e) { sendEvent('send', 'event', 'Community', 'click', 'Top Nav > Check Your Beta Status') },
            '.info-page .nav-tournament':           function(e) { sendEvent('send', 'event', 'Community', 'click', 'Top Nav > Tria\'s Tournament') },
            '.info-page .nav-news':                 function(e) { sendEvent('send', 'event', 'Community', 'click', 'Top Nav > News') },
            '.info-page .nav-forums':               function(e) { sendEvent('send', 'event', 'Community', 'click', 'Top Nav > Forums') },
            '.info-page .nav-wiki':                 function(e) { sendEvent('send', 'event', 'Community', 'click', 'Top Nav > Wiki') },
            '.info-page .nav-support':              function(e) { sendEvent('send', 'event', 'Community', 'click', 'Top Nav > Support') },
            '.info-page nav a[href="/founders"]':   function(e) { sendEvent('send', 'event', 'Community', 'click', 'Top Nav > Founders Pack') },
            '.info-page .nav-cta':                  function(e) { sendEvent('send', 'event', 'Community', 'click', 'Top Nav > Main CTA Button') },
            '.info-page .nav-merch':                function(e) { sendEvent('send', 'event', 'Community', 'click', 'Top Nav > Buy Merch') },

            // Home Page Header
            '.home-page header .logo':              function(e) { sendEvent('send', 'event', 'Main', 'click', 'Top Nav > MS2 Logo') },
            '.home-page .nav-status':               function(e) { sendEvent('send', 'event', 'Main', 'click', 'Top Nav > Check Your Beta Status') },
            '.home-page .nav-tournament':           function(e) { sendEvent('send', 'event', 'Main', 'click', 'Top Nav > Tria\'s Tournament') },
            '.home-page .nav-news':                 function(e) { sendEvent('send', 'event', 'Main', 'click', 'Top Nav > News') },
            //'.home-page .nav-community':          function(e) { sendEvent('send', 'event', 'Main', 'click', 'Top Nav > Community') },
            '.home-page .nav-forums':               function(e) { sendEvent('send', 'event', 'Main', 'click', 'Top Nav > Forums') },
            '.home-page .nav-wiki':                 function(e) { sendEvent('send', 'event', 'Main', 'click', 'Top Nav > Wiki') },
            '.home-page .joddysquad':               function(e) { sendEvent('send', 'event', 'Main', 'click', 'Top Nav > Joddy Squad') },
            '.home-page .nav-support':              function(e) { sendEvent('send', 'event', 'Main', 'click', 'Top Nav > Support') },
            '.home-page nav a[href="/founders"]':   function(e) { sendEvent('send', 'event', 'Main', 'click', 'Top Nav > Founders Pack') },
            '.home-page .nav-cta':                  function(e) { sendEvent('send', 'event', 'Main', 'click', 'Top Nav > Main CTA Button') },
            '.home-page .nav-merch':                function(e) { sendEvent('send', 'event', 'Main', 'click', 'Top Nav > Buy Merch') },

            // News Page Header
            '.news-list-page header .logo':         function(e) { sendEvent('send', 'event', 'News', 'click', 'Top Nav > MS2 Logo') },
            '.news-list-page .nav-status':          function(e) { sendEvent('send', 'event', 'News', 'click', 'Top Nav > Check Your Beta Status') },
            '.news-list-page .nav-tournament':      function(e) { sendEvent('send', 'event', 'News', 'click', 'Top Nav > Tria\'s Tournament') },
            '.news-list-page .nav-news':            function(e) { sendEvent('send', 'event', 'News', 'click', 'Top Nav > News') },
            //'.news-list-page .nav-community':       function(e) { sendEvent('send', 'event', 'News', 'click', 'Top Nav > Community') },
            '.news-list-page .nav-forums':          function(e) { sendEvent('send', 'event', 'News', 'click', 'Top Nav > Forums') },
            '.news-list-page .nav-wiki':            function(e) { sendEvent('send', 'event', 'News', 'click', 'Top Nav > Wiki') },
            '.news-list-page .joddysquad':          function(e) { sendEvent('send', 'event', 'News', 'click', 'Top Nav > Joddy Squad') },
            '.news-list-page .nav-support':         function(e) { sendEvent('send', 'event', 'News', 'click', 'Top Nav > Support') },
            '.news-list-page .nav-cta':             function(e) { sendEvent('send', 'event', 'News', 'click', 'Top Nav > Buy Now CTA Button') },
            '.news-list-page .nav-merch':           function(e) { sendEvent('send', 'event', 'News', 'click', 'Top Nav > Buy Merch') },

            // Article Page Header
            '.article-page header .logo':           function(e) { sendEvent('send', 'event', 'News Article', 'click', 'Top Nav > MS2 Logo') },
            '.article-page .nav-status':            function(e) { sendEvent('send', 'event', 'News Article', 'click', 'Top Nav > Check Your Beta Status') },
            '.article-page .nav-tournament':        function(e) { sendEvent('send', 'event', 'News Article', 'click', 'Top Nav > Tria\'s Tournament') },
            '.article-page .nav-news':              function(e) { sendEvent('send', 'event', 'News Article', 'click', 'Top Nav > News') },
            //'.article-page .nav-community':         function(e) { sendEvent('send', 'event', 'News Article', 'click', 'Top Nav > Community') },
            '.article-page .nav-forums':            function(e) { sendEvent('send', 'event', 'News Article', 'click', 'Top Nav > Forums') },
            '.article-page .nav-wiki':              function(e) { sendEvent('send', 'event', 'News Article', 'click', 'Top Nav > Wiki') },
            '.article-page .joddysquad':            function(e) { sendEvent('send', 'event', 'News Article', 'click', 'Top Nav > Joddy Squad') },
            '.article-page .nav-support':           function(e) { sendEvent('send', 'event', 'News Article', 'click', 'Top Nav > Support') },
            '.article-page .nav-cta':               function(e) { sendEvent('send', 'event', 'News Article', 'click', 'Top Nav > Buy Now CTA Button') },
            '.article-page .nav-merch':             function(e) { sendEvent('send', 'event', 'News Article', 'click', 'Top Nav > Buy Merch') },

            //'.main-video-section .button-cta':      function(e) { sendEvent('send', 'event', 'Main', 'click', 'Center > Sign Up for Beta CTA Button') },
            //'.main-video-section .check-status':    function(e) { sendEvent('send', 'event', 'Main', 'click', 'Center > Check Your Status') },
            //'.main-video-section .play':            function(e) { sendEvent('send', 'event', 'Main', 'click', 'Center > Watch Full Trailer') },

            '.news-block .show-more-btn':           function(e) { sendEvent('send', 'event', 'Main', 'click', 'Bottom > Read More News') },

            // Home Page Footer
            '.home-page .tw-link':                  function(e) { sendEvent('send', 'event', 'Main', 'click', 'Footer  > Twitter') },
            '.home-page .instagram-link':           function(e) { sendEvent('send', 'event', 'Main', 'click', 'Footer  > Instagram') },
            '.home-page .fb-link':                  function(e) { sendEvent('send', 'event', 'Main', 'click', 'Footer  > Facebook') },
            '.home-page .yt-link':                  function(e) { sendEvent('send', 'event', 'Main', 'click', 'Footer  > YouTube') },

            // News Page Footer
            '.news-list-page .tw-link':             function(e) { sendEvent('send', 'event', 'News', 'click', 'Footer  > Twitter') },
            '.news-list-page .instagram-link':      function(e) { sendEvent('send', 'event', 'News', 'click', 'Footer  > Instagram') },
            '.news-list-page .fb-link':             function(e) { sendEvent('send', 'event', 'News', 'click', 'Footer  > Facebook') },
            '.news-list-page .yt-link':             function(e) { sendEvent('send', 'event', 'News', 'click', 'Footer  > YouTube') },

            // Article Page Footer
            '.article-page .tw-link':               function(e) { sendEvent('send', 'event', 'News Article', 'click', 'Footer  > Twitter') },
            '.article-page .instagram-link':        function(e) { sendEvent('send', 'event', 'News Article', 'click', 'Footer  > Instagram') },
            '.article-page .fb-link':               function(e) { sendEvent('send', 'event', 'News Article', 'click', 'Footer  > Facebook') },
            '.article-page .yt-link':               function(e) { sendEvent('send', 'event', 'News Article', 'click', 'Footer  > YouTube') },

            // Info Page Footer
            '.info-page .tw-link':               function(e) { sendEvent('send', 'event', 'Community', 'click', 'Footer  > Twitter') },
            '.info-page .instagram-link':        function(e) { sendEvent('send', 'event', 'Community', 'click', 'Footer  > Instagram') },
            '.info-page .fb-link':               function(e) { sendEvent('send', 'event', 'Community', 'click', 'Footer  > Facebook') },
            '.info-page .yt-link':               function(e) { sendEvent('send', 'event', 'Community', 'click', 'Footer  > YouTube') }
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

        // Events for elements generated by javascript after page load

        $('.featured-news').on('click','.slick-prev',function(e) {
            e.preventDefault();
            sendEvent('send', 'event', 'Main', 'click', 'Carousel > Left Arrow')
        });

        $('.featured-news').on('click','.slick-next',function(e) {
            e.preventDefault();
            sendEvent('send', 'event', 'Main', 'click', 'Carousel > Right Arrow')
        });

        $('body').on('click', '#aLaunchLauncher', function(e){
            sendEvent('send', 'event', 'Global', 'click', 'Play Free Button > Play with Launcher > Launch Launcher');
        })

    };

    /* get Info for Tracking Events */

    $(document).ready(function(){
        init();
    })

}(jQuery, Event, window, window.document));
