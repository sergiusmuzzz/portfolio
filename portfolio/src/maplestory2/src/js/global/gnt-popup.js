( function( $ ) {

   /* var $signUpPopup = $('.m-home-popup-registration');

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

    });*/

    // gnt popup
    $('.j-play-free').on('click', function(e){
        e.preventDefault();
        if (nexon.util.browserDetect.isMobile()){
            nexon.gnt.fspopupSignup();
        }else{
            nexon.play("SVG040");
        }
    })

})( jQuery );
