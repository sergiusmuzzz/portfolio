
window.app = window.app || {};

module.exports = (function(){
  (function($, utility, window, document, undefined) {
    
    if( utility.isMobile() ) {
      $('body').addClass('mobile');
    }

    if( utility.isTouch() ) {
      $('body').addClass('touch');
    }

    // add landscape and portrait class in body on mobile.
    
    $(window).on("orientationchange",function(){
       // if portrait
      if( window.orientation == 0 ){
        $('body').removeClass('landscape');
        $('body').addClass('portrait');
      } else if ( window.orientation == -90 || window.orientation == 90 ){ // if landscape
        $('body').removeClass('portrait');
        $('body').addClass('landscape');
      }
       
    });
    $(window).trigger('orientationchange');

  }(jQuery, window.app.utility, window, window.document));
})();












