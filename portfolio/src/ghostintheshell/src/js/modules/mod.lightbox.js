
var app = app || {}; 

(function($,app, window, document, undefined) {
 
  var lightBox = function lightBox( elem, options ){

    /**
     * Default options & initial vars
     */

    var 
      ui = { },
      defaults = {
        initialIndexOnArray : 0,
        afterOpen: null,
        afterClose: null
      },
      plugin = this,
      $elements, // get all elements first
      $lightBox,
      elements = [], // and then filter out with data attribute and push info to var elements | slides array [ { href:'...', title:'...' }, ...],
      selector = elem.selector,
      isMobile = app.utility.isMobile(),
      isTouch = app.utility.isTouch(),
      isPluginOpen = false,
      currentItemSrc = null,
      currentItemIndex = null,
      currentX = 0,
      html = '<div class="m-lightbox">\
                <div class="m-lightbox__slider"></div>\
                  <div class="m-lightbox__ui-bottom-wrapper">\
                    <div class="ui-carousel-arrow ui-carousel-arrow-left m-lightbox__ui-bottom_left-arrow"><div class="ui-carousel-arrow__inner-wrapper"><i class="f-icon f-icon-arrow-left"></i></div>\
                    </div>\
                    <div class="m-lightbox__ui-info"></div>\
                    <div class="ui-carousel-arrow ui-carousel-arrow-right m-lightbox__ui-bottom_right-arrow"><div class="ui-carousel-arrow__inner-wrapper"><i class="f-icon f-icon-arrow-right"></i></div>\
                    </div>\
                  </div>\
                <div class="ui-carousel-arrow ui-carousel-arrow-left m-lightbox__ui-side_left-arrow"><div class="ui-carousel-arrow__inner-wrapper"><i class="f-icon f-icon-arrow-left"></i></div>\
                </div>\
                <div class="ui-carousel-arrow ui-carousel-arrow-right m-lightbox__ui-side_right-arrow"><div class="ui-carousel-arrow__inner-wrapper"><i class="f-icon f-icon-arrow-right"></i></div>\
                </div>\
                <div class="m-lightbox__ui-close"><i class="f-icon f-icon-close"></i></div>\
              </div>';

    plugin.settings = {};


    /**
     * Public Method: Close lightBox
     */

    // var close = function close() {
    //   ui.closeLightBox();
    // };



    /**
     * Plugin Initial func
     */

    plugin.init = function(){

      // Overide setting if options are passed.
      plugin.settings = $.extend( {}, defaults, options );

      $( document ).on( 'click', selector, function( event ) {
        
        elements = [];
        $elements = $( selector );
        var clickedIndex, relType, relVal;


        // --- Allow for HTML5 compliant attribute before legacy use of rel
        if ( ! relVal ) {
          relType = 'data-rel';
          relVal = $( this ).attr( relType );
        }

        if ( ! relVal ) {
          relType = 'rel';
          relVal = $( this ).attr( relType );
        }

        // if relVal is there, filter it.
        if ( relVal && relVal !== '' ) {
          $elements = $( selector ).filter( '[' + relType + '="' + relVal + '"]' );
        } else {
          $elements = $( selector );
        }

        // --- Push each src to var elements

        $elements.each( function() {

          var href;

          if ( $( this ).attr( 'href' ) ) {
            href = $( this ).attr( 'href' );
          }

          elements.push( {
            'href': href
          } );
        } );

        clickedIndex = $elements.index( $( this ) );

        // not sure where to use this.
        ui.target = $( event.target );

        event.preventDefault();
        event.stopPropagation();
        ui.init( clickedIndex);


 
      });

    };

    /**
     * Initiate lightBox
     */

    ui = {

      // ********************
      // -------------------- Initiate UI

      init : function( clickedIndex ) { 
        if ( !isPluginOpen ) {
          isPluginOpen = true;
          this.build();
          this.actions.startPlugin( clickedIndex );
          this.actions.gesture(); // not developed yet
          if ( plugin.settings.afterOpen ) {
            plugin.settings.afterOpen( clickedIndex );
          }

        }
        
      },

      // ********************
      // -------------------- Build HTML Containers
      build : function( index ) {
  
        var $this = this;

        $( 'body' ).append( html );
        $lightBox = $( '.m-lightbox' );

        $("head").append("<style type='text/css' id='lightbox'></style>");
        // ui._components.media.calculateMedia();
        // ui._components.carousel.putTopOffset();

        // console.log(elements);

        $.each( elements,  function() {
          $( '.m-lightbox__slider' ).append( '<div class="m-lightbox__slide-item"><div class="m-lightbox__inner-wrapper"><div class="m-lightbox__media"></div><div class="m-lightbox__ui-bottom-place-holder"></div></div></div>' );
        } );
   
        $this.bindEvents();

      },

      // ********************
      // -------------------- Bind events to the UI keys in html elements

      bindEvents : function ( ){
        var $this = this,
            userAction = 'touchend click',
            browserAction = 'resize orientationchange';

        $( '.m-lightbox .ui-carousel-arrow-left' ).on( userAction, function( event ) {
          event.preventDefault();
          // event.stopPropagation();   // Removing this so that other event handlers can be attached (for tracking)
          $this.actions.goPrev();
        } );

        $( '.m-lightbox .ui-carousel-arrow-right' ).on( userAction, function( event ) {
          event.preventDefault();
          // event.stopPropagation();   // Removing this so that other event handlers can be attached (for tracking)
          $this.actions.goNext();
        } );

        $( '.m-lightbox__ui-close' ).on( userAction, function() {
          $this.actions.closePlugin();
        } );

        // $(window).on('resize', function(){
        //   ui._components.media.calculateMedia(); // Watch media aspect +  Ui bottom height
        //   ui._components.carousel.putTopOffset(); // Put UI offset from top based on media height and its offset from top.
        // });


        $(window).on( browserAction, ui._components.media.calculateMedia );
        $(window).on( browserAction, ui._components.carousel.putTopOffset );


        // Bind Keyboard 

        $( window ).on( 'keyup', function( event ) {
          event.preventDefault();
          event.stopPropagation();

          if ( event.keyCode === 37 ) {

            $this.actions.goPrev();

          } else if ( event.keyCode === 39 ) {

            $this.actions.goNext();

          } else if ( event.keyCode === 27 ) {

            $this.actions.closePlugin();
          }
        } );
      },

      // ********************
      // -------------------- Overall *actions*

      actions : {

        // ---------- Run following required componenets when this plugin first runs.

        startPlugin: function( clickedIndex ) {

          // Open slide and calculate left value based on clicked item from array.
          ui._components.slide.open( clickedIndex );
          $('.m-lightbox__ui-close').attr('data-ga', 'Image ' + (clickedIndex + 1)); // for tracking events ga
          // Inject src into clicked item + next & previous items.
          ui._components.media.preLoad( clickedIndex, 'autoplay' );


          // remove ui arrows and place holder height if item array length is only 1
          if( elements.length === 1 ){
            $('.m-lightbox__ui-bottom-wrapper').remove();

            $('.m-lightbox__ui-side_left-arrow, .m-lightbox__ui-side_right-arrow').remove();

            $('.m-lightbox__ui-bottom-place-holder').remove();
            
            return false;
          }

          ui._components.media.preLoadDelay( clickedIndex + 1 );
          ui._components.media.preLoadDelay( clickedIndex - 1 ); 

          // update carousel info and add offset to center media part (including carousel UI)
          ui._components.carousel.updateInfo( clickedIndex );
          ui._components.carousel.putTopOffset();
          
        },

        // ---------- Get Next Slide
        goNext: function ( ) {

          var $this = this,
            src,
            index = $( '.m-lightbox__slider .m-lightbox__slide-item' ).index( $( '.m-lightbox__slider .m-lightbox__slide-item.current' ) );

  
          // if there is next slide item, then get next item
          if ( index + 1 < elements.length ) {

            
            
            // If there is iframe, stop video playing before changing index.
            src = $( '.m-lightbox__slider .m-lightbox__slide-item' ).eq( index ).find('.m-lightbox__media-video-iframe');
            if( src.length ){
              src[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
            }
   
            index++;

            ui._components.slide.set( index );
            
            // if next slide's media is not already loaded, put media. Otherwise, dont load media again.
            if ( $( '.m-lightbox__slider .m-lightbox__slide-item' ).eq( index+1 ).find('.m-lightbox__media').children().length === 0 ) {
              ui._components.media.preLoadDelay( index+1 );
            }

            // if next slide has video iframe, autoplay video 
            // if ( $( '.m-lightbox__slide-item.current .m-lightbox__media-video-iframe').length && !app.utility.isMobile() ){
            //  $( '.m-lightbox__slide-item.current .m-lightbox__media-video-iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
            // }

            ui._components.carousel.updateInfo( index );

            // if next slide has video iframe, reattch its video 
            if ( $( '.m-lightbox__slide-item.current .m-lightbox__media-video-iframe').length ){
              
              var $newCurrentVideo = $( '.m-lightbox__slide-item.current' ).contents().find( 'iframe' );

              // reattach src to retrieve high resolution of thumbnail video.  ( hot fix ) 
              // Somehow youtube video change to low resolution once it slides out of viewport. so reattach its src.
              src = $newCurrentVideo.attr( 'src' );
              src = src.replace('autoplay=1&','');
              $newCurrentVideo.hide();
              $newCurrentVideo.attr( 'src', src );


              setTimeout( function() {
                $newCurrentVideo.fadeIn();
              }, 300);

            }
            
        
          } else { 
            $( '.m-lightbox__slider' ).addClass( 'rightSpring' );
            setTimeout( function() {
              $( '.m-lightbox__slider' ).removeClass( 'rightSpring' );
            }, 100 );
            
          }
          $('.m-lightbox__ui-close').attr('data-ga', 'Image ' + (index + 1)); // For tracking events ga
        }, // --- *goPrev* ends


        // ---------- Set current Slide

        goPrev: function ( ) { 
          var $this = this,
            src,
            index = $( '.m-lightbox__slider .m-lightbox__slide-item' ).index( $( '.m-lightbox__slider .m-lightbox__slide-item.current' ) );

          // if there is prev slide item, then get prev item
          if ( index > 0 ) {

            /* reattach src to stop video on slide change */
            // src = $( '.m-lightbox__slider .m-lightbox__slide-item' ).eq( index ).contents().find( 'iframe' ).attr( 'src' );
            // setTimeout( function() {
            //   $( '.m-lightbox__slider .m-lightbox__slide-item' ).eq( index+1 ).contents().find( 'iframe' ).attr( 'src', src );
            // }, 800);
            
            // If there is iframe, stop video playing before changing index.
            src = $( '.m-lightbox__slider .m-lightbox__slide-item' ).eq( index ).find('.m-lightbox__media-video-iframe');
            if( src.length ){
              src[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
            }
   
            index--;
            ui._components.slide.set( index );

            // if next slide's media is not already loaded, put media. Otherwise, dont load media again.
            if ( $( '.m-lightbox__slider .m-lightbox__slide-item' ).eq( index-1 ).find('.m-lightbox__media').children().length === 0 ) {
              ui._components.media.preLoadDelay( index-1 );
            }

            // // if next slide has video iframe, autoplay video 
            // if ( $( '.m-lightbox__slide-item.current .m-lightbox__media-video-iframe').length && !app.utility.isMobile() ){
            //   $( '.m-lightbox__slide-item.current .m-lightbox__media-video-iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
            // }
            ui._components.carousel.updateInfo( index );

            // if next slide has video iframe, reattch its video 
            if ( $( '.m-lightbox__slide-item.current .m-lightbox__media-video-iframe').length ){
              
              var $newCurrentVideo = $( '.m-lightbox__slide-item.current' ).contents().find( 'iframe' );

              // reattach src to retrieve high resolution of thumbnail video.  ( hot fix ) 
              // Somehow youtube video change to low resolution once it slides out of viewport. so reattach its src.
              src = $newCurrentVideo.attr( 'src' );
              src = src.replace('autoplay=1&','');
              $newCurrentVideo.hide();
              $newCurrentVideo.attr( 'src', src );

              setTimeout( function() {
                $newCurrentVideo.fadeIn();
              }, 200);

            }
        
          } else { 
              $( '.m-lightbox__slider' ).addClass( 'leftSpring' );
              setTimeout( function() {
                $( '.m-lightbox__slider' ).removeClass( 'leftSpring' );
              }, 100 );
            
          }

            $('.m-lightbox__ui-close').attr('data-ga', 'Image ' + (index + 1)); // For tracking events ga
        }, // --- *goPrev* ends

        // ---------- Set current Slide

        closePlugin: function ( ) { 
          $( 'html' ).removeClass( 'm-lightbox-active' );
          // $( 'html' ).removeClass( 'm-lightbox-touch' );
     
          ui._components.slide.close();

        },


        /**
         * Touch navigation
         */
        gesture : function () {
          // Not Yet

        }// --- *gesture* ends
        
      },

      // ********************
      // -------------------- *components*

      _components: {

        // ---------- *slide* : Determine which Slide to show.

        slide: { 
          

          // --- Open Slide if its first time.
          open: function ( clickedIndex ) { 
            var $this = this;
            $lightBox.addClass('active fadein');

            setTimeout( function() { // Removed fadeIn. There is a bug with chrome full screen view if there is css animation in class ( especially opacity )
              $lightBox.removeClass('fadein');
            }, 400 );

            $( 'html' ).addClass('m-lightbox-active'); // added active class on html as well
            $this.set( clickedIndex );

            setTimeout( function() { // ui bottom visibility
              $( window ).trigger( 'resize' );
            }, 100 );
            
          },


          // --- Set current Slide

          set: function ( index ) { 

            var slider = $( '.m-lightbox__slider' );

            currentX = -index*100;

            slider.css( {
              '-webkit-transform' : 'translate(' + currentX +'%, 0)',
              'transform' : 'translate(' + currentX +'%, 0)'
            } );


            $( '.m-lightbox__slider .m-lightbox__slide-item' ).removeClass( 'current' );
            $( '.m-lightbox__slider .m-lightbox__slide-item' ).eq( index ).addClass( 'current' );
 


          },

          // --- Close Slide | Destroy everything
          close: function() {


            /* -- unbind everyhing and remove html. */

            $( window ).off( 'keyup' );
            // $( 'body' ).unbind( 'touchstart' );
            // $( 'body' ).unbind( 'touchmove' );
            // $( 'body' ).unbind( 'touchend' );

            /* unbind window resize events */

            $( window ).off( 'resize orientationchange', ui._components.media.calculateMedia );
            $( window ).off( 'resize orientationchange', ui._components.carousel.putTopOffset );

            /* unbind all child eventhandlers from plugin.*/
            $('.m-lightbox *').off();
            
            /*  fadeOut plugin and remove html completely*/
            $lightBox.addClass('disappear').removeClass('active');
            isPluginOpen = false;
            setTimeout(function(){
              $lightBox.removeClass('disappear');
              $lightBox.remove();
              $('#lightbox').remove();
            }, 480);

            if ( plugin.settings.afterClose ) {
              plugin.settings.afterClose();
            }

          }
        },

        // ---------- *media* : Takes care of preloading images, check if media is video, then get video source.

        media:  { 

          // --- preload delay. Load clicked item first.
          preLoadDelay: function ( index, autoplay ) { 
            var $this = this,
              src,
              slide;

            if ( elements[ index ] !== undefined ) {
              src = elements[ index ].href;
            }

            // setTimeout( function() {
            //   $this.preLoad( index, autoplay );
            // }, 800);

            if ( $this.isVideo( src ) ) {
              setTimeout( function() {
                $this.preLoad( index, autoplay );
              }, 500);
            } else {
              $this.preLoad( index, autoplay );
            }
          },

          // --- preload imgs.
          preLoad: function ( index, autoplay ) { 
            var $this = this,
              src,
              slide;

            if ( elements[ index ] !== undefined ) {
              src = elements[ index ].href;
            }

            // if this index is not within elements array lenth, return false.

            if ( index < 0 || index >= elements.length ) {
              return false;
            }

            // get this slide element out of all
            slide = $( '.m-lightbox__slider .m-lightbox__slide-item' ).eq( index ).find('.m-lightbox__media');


            if ( ! this.isVideo( src ) ) {
              slide.addClass( 'item-loading' );
              $this.loadImg( src, function() {
                slide.removeClass( 'item-loading' );
                slide.html( this );
 
              } );
            } else {
              slide.html( $this.getVideo( src, autoplay ) );
            }


          },

          // --- load img
          loadImg: function( src, callback ) {
             
            if ( ! this.isVideo( src ) ) {
              var img = $( '<img>' ).on( 'load', function() {
                callback.call( img );
              } );

              img.attr( 'src', src );
            }
          },

          // --- caclulate media and UI bottom height.
          // media wrapper ratio will be based on image ratio + Ui bottom height.
          // if window width reaches wrapper ratio's width, wrapper ratio will be shrink to fit based on window width
          // if window height reaches wrapper ratio's height, wrapper ratio will be shrink to fit based on window height.


          calculateMedia: function(){ 
            var wWidth, wHeight, imageRatio, wRatio, imageWidth, imageHeight, newImgHeight, newImgWidth, sliderCss = {};

            wWidth = app.utility.winWidth();
            wHeight = app.utility.winHeight();

            function onWindowResize() {
             
              wRatio = wWidth / wHeight;

              var uiHeight = $('.m-lightbox__ui-bottom-wrapper').outerHeight();

              // Initial image width and height. The image ration ( w/h ) will be based on this value.
              // imageWidth = 1440;
              // imageHeight = 800;

              imageWidth = 1100;
              imageHeight = 618;


              imageRatio = imageWidth / imageHeight;
              var wrapperRatio = imageWidth / (imageHeight + uiHeight);

              // If imageWidth is larger than window width & window height is larger than image height + ui height 

              if( wWidth < imageWidth && wHeight > ( imageHeight + uiHeight ) ) { 
   
                resizeBasedOnWidth();

                console.log ('route 1');
              }

              // if imageHeight + uiHeight is larger than window height.

              else if( wHeight < ( imageHeight + uiHeight ) ) {

                // if Viewport Ratio is larger than imageRatio 
                // easy word > if Viewport width that determined by window ratio is larger than image width that determined by original image ratio
                // This prevent newImage size being to based on large width when height is very small. making the image size very big.
                if ( wRatio < wrapperRatio ) { 
                 
                  resizeBasedOnWidth();
                  console.log ('route 2');

                } else  {
                  resizeBasedOnHeight();

                  console.log ('route 3');
                }
                
              } 

              // if window width is longer than image width and window height is higher than image height + ui height

              else if ( wWidth > imageWidth && wHeight > ( imageHeight + uiHeight )  ) {
                resizeToOriginal();
              }


              // bug fix: anythin else resizeBasedOnWidth
              else  
                resizeBasedOnWidth();


              function resizeToOriginal() {
                newImgWidth = imageWidth;
                newImgHeight = imageHeight;
     
              }

              function resizeBasedOnWidth() {

                newImgWidth = wWidth;
                newImgHeight = wWidth / imageRatio;
   
              }

              function resizeBasedOnHeight() {

                if ( newImgHeight === wHeight - uiHeight ){
                  return false;
                }
      
                newImgHeight = wHeight - uiHeight;
                newImgWidth = newImgHeight * imageRatio;

              }

              sliderCss = '.m-lightbox__media { width:' + newImgWidth
                + 'px; height:' + newImgHeight
              + 'px;} .m-lightbox__ui-bottom-place-holder { height:' + uiHeight + 'px; }'
              
              // update to inline css in header to affect every slider item elements.
              $('#lightbox').text(sliderCss);
            };

            return onWindowResize();


          },

          // --- check video
          isVideo : function ( src ) {

            if ( src ) {
              if ( src.match( /(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || src.match( /vimeo\.com\/([0-9]*)/ ) || src.match( /youtu\.be\/([a-zA-Z0-9\-_]+)/ ) ) {
                return true;
              }
            }

          },

          getVideo : function( url, autoplay ) {

           
            var iframe = '',
              youtubeUrl = url.match( /watch\?v=([a-zA-Z0-9\-_]+)/ ),
              youtubeShortUrl = url.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/),
              // vimeoUrl = url.match( /vimeo\.com\/([0-9]*)/ ),
              autoPlaySetting = autoPlaySetting = autoplay ? 1 : 0;
            
            if ( youtubeUrl || youtubeShortUrl) {
              if ( youtubeShortUrl ) {
                youtubeUrl = youtubeShortUrl;
              }
              iframe = '<iframe class="m-lightbox__media-video-iframe" width="560" height="315" src="//www.youtube.com/embed/' + youtubeUrl[1] 
              + '?autoplay='+ autoPlaySetting + '&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer&wmode=opaque" frameborder="0" allowscriptaccess="always" allowfullscreen="true"></iframe>';

            } 

            return '<div class="m-lightbox__media-video">' + iframe + '</div>';
        
          }

        }, // --- *media* ends


        // ---------- *carousel* : takes care of rending carousel

        carousel: {

          updateInfo: function( index ){
            $( '.m-lightbox__ui-info' ).html( index+1 + ' / ' + elements.length );
            // OUTPUTS CAPTION BELOW THE IMAGE FROM DATA-CAPTION ATTRIBUTE
            $('.m-lightbox__ui-bottom-place-holder').html($($elements[index]).data('caption'));
          },

          // put absolute top position to ui bottom ( distance top margin of media + media's height )
          putTopOffset: function(){
            var topOffset = $(".m-lightbox__inner-wrapper").position().top + $(".m-lightbox__media").height();
        
            $('.m-lightbox__ui-bottom-wrapper').css({ top: topOffset });
          }

        } // --- *carousel* ends


      }   // --- *components* ends


    } // --- UI ends

    plugin.init();

  }


  // ---------------Return Public Methods to app

  app.lightBox = lightBox;
  // app.lightBox.close = lightBox.close;



  $.fn.appLightBox = function( options ) {
     
    app.lightBox( this, options );

  };

}(jQuery, app, window, window.document));