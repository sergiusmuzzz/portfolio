$(function(){

  // Check browser's window size
  var isMobile = window.matchMedia("only screen and (max-width: 640px)"),
      isTablet = window.matchMedia("only screen and (max-width: 1024px)"),
      $swapImg = $('img[data-src]'),
      imgSrc;

  checkSize();
  $(window).on('resize', function () {
    checkSize();
  });

  function checkSize() {
    $swapImg.each(function(){
      imgSrc = $(this).data('src');
      /*if(isMobile.matches){
        $(this).attr('src', imgSrc + '-touch.png')
      }else */if(isTablet.matches){
        $(this).attr('src', imgSrc + '-touch.png')
      }else{
        $(this).attr('src', imgSrc + '.png')
      }
    });
  }


  // Run LightBox Plugin
  $('.lightbox').appLightBox();

    // ----------- owlCarousel Plugin
  $('.gallery-mobile').owlCarousel({

      // setting to show 1 item on table.
      itemsTablet : [768, 1]

  });

  // binds 
  ( function( $ ) {

    var $signUpPopup = $('.m-home-popup-registration');

    // Open Popup of call to action
    $( '.j-call-to-action' ).on( 'click', function() {
      
      if ( !$signUpPopup.is(":visible") ){ 
        $signUpPopup.fadeIn();
      }

    });

    // Close Popup of call to action
    $( '.j-call-to-action_close' ).on( 'click', function() {
    
      if ( $signUpPopup.is(":visible") ){ 
        $signUpPopup.fadeOut();
      }

    });

    // gnt popup
    $('.j-play-free').on('click', function(e){
      e.preventDefault();
      if (nexon.util.browserDetect.isMobile()){
        nexon.gnt.fspopupSignup();
      }else{
        nexon.play("SVG012");
      }
    })

  })( jQuery );

});