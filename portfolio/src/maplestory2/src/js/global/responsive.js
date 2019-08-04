/**
 * @namespace Responsive
 * @desc Sets a class on the html for view based on browser width. Sets Appropriate font size for view. Scales sprites to appropriate size for view.
 * @requires {@link http://wiki.github.com/heygrady/transform/}
 *
 */

(function($, Event, config, window, document, undefined) {
    var opts = {
        resizeFonts: true,
        scaleSprites: false,
        spriteKey: '.sprite-cont',
        debounce: 0,
        views: [
            {
                view: 'mobile',
                windowWidth: 479,
                fontSize: 12,
                minFontSize: 1
            },
            {
                view: 'tablet',
                windowWidth: 1024,
                fontSize: 16,
                minFontSize: 1
            },
            {
                view: 'desktop',
                windowWidth: 1440,
                fontSize: 18,
                minFontSize: 12,
                xmaxFontSize: 23
            }
        ]
    };

    if (config.views) {
        opts = $.extend(opts,config.views);
    }

    var $w = $(window),
        $html = $('html'),
        $sprites = $(opts.spriteKey),
        scrollPosition = 0;

    var init = function() {
        var currentView = null;        
        Event.on('view-changed',function(view){
            console.log('view-changed',view)
            setView(view);
        });
        Event.on('detected-view',function(view){
            if(currentView != view) {
                currentView = view;
                Event.trigger('view-changed',currentView);
            }
        });
        detectView();
        $w.resize(function(){
            detectView();
        });
        Event.on('refreshView',function(data){
            detectView();
        });
        Event.trigger('inited-detect-view',{});
    };

    var detectView = function() {

        var active = false;
        setTimeout(function(){
            if (active) return false;
            active = true;
            var views = opts.views.sort(function(a,b){
                return b.windowWidth-a.windowWidth;
            });
            var width = window.innerWidth;
            //var view = views[views.length-1];
            var view = views[0];
            $.each(views,function(i,v){
                if (width <= v.windowWidth) view = v;
            });
            Event.trigger('detected-view',view.view);
            //scrollPosition = window.pageYOffset;
            //console.log('SCROLL POSITION',scrollPosition)
            if (opts.resizeFonts) resizeFonts(view);
            if (opts.scaleSprites) scaleSprites(view);
            //var newScrollPosition = window.pageYOffset;
            //console.log('NEW SCROLL POSITION',scrollPosition, newScrollPosition)
            active = false;
        },opts.debounce);
    };

    var resetView = function() {
        var c = '';
        $.each(opts.views,function(i,v){
            c+= ' '+v.view;
        });
        $html.removeClass(c);
    };

    var setView = function(view) {
        resetView();
        $html.addClass(view);
        Event.trigger('set-view',{ view: view });
    };

    var resizeFonts = function(view) {
        var width = window.innerWidth;
        var size = (view.fontSize*width/view.windowWidth).toFixed(1);
        if (size < view.minFontSize) size = view.minFontSize;
        if (view.maxFontSize && size > view.maxFontSize) size = view.maxFontSize;
        $html.css('font-size',size+'px');
    };

    var scaleSprites = function(view,fixContainer) {
        var width = window.innerWidth,
            s = (width/view.spriteWidth).toFixed(1);
        //console.log('scaleSprites',s)

        if (view.maxSpriteSize && width > view.maxSpriteSize) {
            //return false;
            s = 1;
        }

        if (view.disableScaleSprites && opts.scaleSprites) {
            s = 1;
        }

        // get size of blank image and resize sprite based on how big the image is
        $.each($sprites,function(i,v){
            var $spriteCont = $(v);

            // check for scale modifier
            var scaleMod = +$spriteCont.attr('data-scale');
            //console.log('scaleMod',scaleMod);
            var scaleMe = s;
            if (scaleMod) {
                scaleMe = s * scaleMod;
            }

            var $sprite = $spriteCont.find('.sprite');
            var $img = $sprite.find('img');
            var dims = {
                w: $img.width(),
                h: $img.height()
            };
            //console.log(dims);
            if (dims.w && dims.h) {
                var newDims = {
                    w: Math.floor(dims.w*scaleMe),
                    h: Math.floor(dims.h*scaleMe)
                }

                $spriteCont.css('width',newDims.w+"px");
                $spriteCont.css('height',newDims.h+"px");

                // using jquery.transform to fix crossbrowser transform problems, fixes ie9
                $sprite.transform({
                    'scale': scaleMe,
                    'origin': ['0','0']
                });
            }
        });
    };

    $(document).ready(function(){
        setTimeout(function(){
            init();
        },0)
    });

}(jQuery, Event, config, window, window.document));
