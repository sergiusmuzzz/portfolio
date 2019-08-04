
(function($, window, document, undefined) {

  var 
    fontSizeSmall = 10,
    fontSizeMedium = 10,
    fontSizeLarge = 10,
    fontMax_WindowWidth = 1920,   // max window width for determining font size
    fontMin_WindowWidth = 0;   // min window width for determining font size

  
  $(window).on('resize', onWindowResize);

  // Actions taken when window resizes
  function onWindowResize() {
      var window_w = $(window).width();

      // Calculate base font-size based on window width
      var font_size = 12;
      if (window_w > fontMax_WindowWidth)
          window_w = fontMax_WindowWidth;

      if (window_w < fontMin_WindowWidth)
          window_w = fontMin_WindowWidth;
      
      if (window_w <= 0) {
          font_size = fontSizeSmall * window_w / 640;
      /*} else if (window_w < 1024) { //corrected from 1024 to 1000
          font_size = fontSizeMedium * window_w / 1024;*/
      } else {
          font_size = fontSizeLarge * window_w / 1400;
      }

      $('body').css('font-size', font_size + 'px');
  }
  onWindowResize();

}(jQuery, window, window.document));
  
 