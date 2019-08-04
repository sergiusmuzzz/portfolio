
var app = app || {};

(function($,app, window, document, undefined) {

    var lightBox = function lightBox( elem, options ){

        // --- Default options
        var
            ui = { },
            defaults = {
                initialIndexOnArray : 0
            },
            plugin = this,
            elements = [], // slides array [ { href:'...', title:'...' }, ...],
            $elem,
            selector = elem.selector,
            $selector = $( selector ),
            isMobile = navigator.userAgent.match( /(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i ),
            isTouch = isMobile !== null || document.createTouch !== undefined || ( 'ontouchstart' in window ) || ( 'onmsgesturechange' in window ) || navigator.msMaxTouchPoints,
            isPluginOpen = false,
            currentItemSrc = null,
            currentItemIndex = null,
            html = '<div class="lightbox">\
                <div class="ui_close-icon f-icon f-icon-close"></div>\
                <div class="container-wrapper">\
                  <div class="container"></div>\
                  <div class="ui_left-arrow">&lt;</div>\
                  <div class="ui_right-arrow">&gt;</div>\
                </div>\
              </div>';

        plugin.settings = {};


        // --- Public Method: Close lightBox
        var close = function close() {
            ui.closeLightBox();
        };

        // --- Plugin init
        plugin.init = function(){

            // Overide setting if options are passed.
            plugin.settings = $.extend( {}, defaults, options );

            $( document ).on( 'click', selector, function( event ) {

                elements = [];
                $elem = $( selector );
                var clickedIndex;

                $elem.each( function() {

                    var href = null;

                    if ( $( this ).attr( 'href' ) ) {
                        href = $( this ).attr( 'href' );
                    }

                    elements.push( {
                        href: href
                    } );
                } );

                clickedIndex = $elem.index( $( this ) );
                ui.target = $( event.target );
                event.preventDefault();
                event.stopPropagation();
                ui.build( clickedIndex );

            });

        };


        // --- UI

        ui = {

            /**
             * Initiate Swipebox
             */
            build : function( index ) {
                if ( !isPluginOpen ) {
                    var $this = this;
                    isPluginOpen = true;
                    $( 'body' ).append( html );
                    $( 'body' ).addClass('light-box-active');
                    $this.setCurrentItem( index );
                    $this.bindEvents();
                    $this.openLightBox();
                }

            },

            /**
             * Determin which item to show in modal box.
             */
            setCurrentItem : function ( index ) {
                var $this = this
                currentItemIndex = index;
                currentItemSrc;
                var src = elements[currentItemIndex].href;

                if ( !$this.isVideo( src ) ) {
                    currentItemSrc = '<img src="' + src + '"" class="light-box-item">';
                }
                else {
                    currentItemSrc = '<div class="video light-box-item"><iframe width="560" height="315" src="' + src +'" frameborder="0" allowfullscreen></iframe></div>';
                }

            },

            /**
             * Open Light Box Modal
             */
            openLightBox : function ( index ) {
                var $this = this;
                $('.lightbox .container').append( currentItemSrc );
                if( isPluginOpen ) {
                    $('.lightbox').addClass('active');
                }
            },


            bindEvents : function () {
                var $this = this;

                $( '.lightbox .container' ).bind( 'click', function( event ) {
                    event.preventDefault();
                    event.stopPropagation();
                    $this.goNext();
                } );

                $( '.lightbox .ui_left-arrow' ).bind( 'click', function( event ) {
                    event.preventDefault();
                    event.stopPropagation();
                    $this.goPrev();
                } );

                $( '.lightbox .ui_right-arrow' ).bind( 'click', function( event ) {
                    event.preventDefault();
                    event.stopPropagation();
                    $this.goNext();
                } );

                $( '.lightbox .ui_close-icon' ).bind( 'click', function() {
                    $this.closeLightBox();
                } );
            },

            /**
             * Get next slide
             */
            goNext : function () {
                $this = this;
                var newItem;

                $('.light-box-item').fadeOut('fast', function(){
                    $('.light-box-item').remove();

                    if( currentItemIndex === elements.length-1) {
                        newItem = 0;
                    } else {
                        newItem = currentItemIndex + 1;
                    }

                    $this.setCurrentItem( newItem );

                    $('.m-lightbox .container').append( currentItemSrc );
                });
            },

            /**
             * Get previous slide
             */
            goPrev : function () {
                $this = this;
                var newItem;

                $('.light-box-item').fadeOut('fast', function(){
                    $('.light-box-item').remove();

                    if( currentItemIndex === 0) {
                        newItem = elements.length - 1;
                    } else {
                        newItem = currentItemIndex - 1;
                    }

                    $this.setCurrentItem( newItem );

                    $('.lightbox .container').append( currentItemSrc );
                });
            },


            isVideo : function ( src ) {

                if ( src.match( /(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || src.match( /vimeo\.com\/([0-9]*)/ ) || src.match( /youtu\.be\/([a-zA-Z0-9\-_]+)/ ) ) {
                    return true;
                }

            },

            closeLightBox : function ( src ) {

                var $this = this;

                if( isPluginOpen ) {

                    isPluginOpen = false;

                    $('.lightbox').addClass('disappear').removeClass('active');
                    $( 'body' ).removeClass('light-box-active');
                    setTimeout(function(){
                        $('.lightbox').removeClass('disappear');
                        $this.destroy();
                    }, 480)
                }
            },

            /**
             * Destroy the whole thing
             */

            destroy : function () {
                $( '.ui_left-arrow' ).unbind();
                $( '.ui_right-arrow' ).unbind();
                $( '.ui_close-icon' ).unbind();
                $( '.m-lightbox .container').unbind();
                $( '.m-lightbox' ).remove();

            }

        } // --- UI ends

        plugin.init();

    }


    // ---------------Return Public Methods to app

    app.lightBox = lightBox;
    app.lightBox.close = lightBox.close;



    $.fn.appLightBox = function( options ) {

        app.lightBox( this, options );

    };

}(jQuery, app, window, window.document));
