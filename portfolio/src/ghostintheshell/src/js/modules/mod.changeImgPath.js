/**
 *  Change background path on a div defends on breanpoint.
 */



var app = app || {}; 

(function( $, appUtility, window, document, undefined ) {
 
  var bgMediaQuery = function bgMediaQuery( thisElem, options ){

    /**
     * Default initial vars 
     */

    var
      defaults = {
      
      },
      plugin = this,
      $thisElem = $(thisElem),
      imgSmallURL = $thisElem.attr('data-img-sm'),
      imgMediumURL = $thisElem.attr('data-img-md') ? $thisElem.attr('data-img-md') : $thisElem.attr('data-img-lg'),
      imgLargeURL = $thisElem.attr('data-img-lg'),
      backgroundSrc,
      ui;
      
    plugin.settings = {};

    /**
     * Plugin Initial func
     */

    plugin.init = function(){

      // Overide setting if options are passed.
      plugin.settings = $.extend( {}, defaults, options );

      ui.init();

    };

    /**
     * Initiate UI
     */

    ui = {

      init : function() {
        
        this.addEvtHandler();
        this.actions.changeBGpath();
        // this.actions.test();
        
      },

      addEvtHandler: function addEvtHandler(){

        var $this = this,
        browserAction = 'resize orientationchange';

        $( window ).on( browserAction, $this.actions.changeBGpath );
 

      },


      actions: {

        changeBGpath: function changeBGpath(){

          if( appUtility.winWidth() < 640 ){ 
            backgroundSrc = imgSmallURL;

          } else if( appUtility.winWidth() < 1024 ){ 
            backgroundSrc = imgMediumURL;

          } else { 
            backgroundSrc = imgLargeURL;
            
          }
          $thisElem.css({
            'background-image': 'url('+ backgroundSrc + ')'
          });

        },

        //  testing
        test: function test(){
          alert('test');

        }

      }


    }; 

    plugin.init();
 


  };


  app.bgMediaQuery = bgMediaQuery;

  $.fn.bgMediaQuery = function( options ) {
    var _ = this,
        _length = _.length,
        i;

    for ( i = 0; i < _length; i++ ){
      new app.bgMediaQuery( _[i], options );
    }

  };

}( jQuery, app.utility, window, window.document ));