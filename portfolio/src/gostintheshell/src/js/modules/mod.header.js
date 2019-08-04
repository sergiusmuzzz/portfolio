
(function($, window, document, undefined) {

    // ------------------ Scroll Actions ---------------------

    ( function() {
      $(window).on('scroll', header );

      function header(){
        // put class once scroll down.

        var $header = $('header').height();

        if( $(this).scrollTop() > $('header').height() ){
          $('header').addClass('header--scroll-down');
        } else {
          $('header').removeClass('header--scroll-down');
        }

        // put active class depends on section

        var y = $(this).scrollTop();
        var $headerLinks = $('.header__menu a');

        
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
          $headerLinks.removeClass('active');
          $headerLinks.eq( $headerLinks.length - 1 ).addClass('active');
        }

        else {  
          $headerLinks.each(function (event) {
            if ( y >= $($(this).attr('href')).offset().top - $('header').outerHeight() ) {
                $headerLinks.not(this).removeClass('active');
                $(this).addClass('active');
            } else $(this).removeClass('active');
          });
        }

      }

      header();

      // smooth scroll

      $('a[href*=#]:not([href=#])').click(function () { 

          if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) { 
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
              if (target.length) {
                  $('html,body').animate({
                      scrollTop: (target.offset().top - $('header').height())
                  }, 480);
                  return false;
              }
               
          }
      });
    })();



    // ------------------ Hover status fix on touch device for language select in header of large desktop ------------------

    ( function() {

      var $headerLanguage = $('.header__select-lan');

      $headerLanguage.on('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).addClass('hover-effect');
      });

      // added this because hover effect doesnt disappear unless users click elements.
      $(document).on('touchend', function(e) {
        if ( $headerLanguage.hasClass('hover-effect') ){
          $headerLanguage.removeClass('hover-effect');
        }
      });

    })();



    // ------------------ Play on Nexon Launcher ------------------

    ( function() {

      $('.m-modal.play .play-nexon-launcher').on('click', function(e) {
        
        var $modalPlay =  $(".m-modal.play");
        
        setTimeout( function(){
          if( $modalPlay.is(":visible") ){
            // launcher-triggered class is added to prevent event tracking for closing .m-modal.play
            $modalPlay.find('.m-modal__close-icon').addClass('launcher-triggered').trigger('click'); 
            // app.closeModal();
          } 
        }, 0);

        nexon.gnt.fspopupSignup();

        // This triggers Nexon Launcher Box. We are not using this for now.
        // setTimeout( function(){
        //   javascript:nexon.play('SVG035');
        // }, 300);

        setTimeout( function(){
          $modalPlay.find('.m-modal__close-icon').removeClass('launcher-triggered');
        }, 1000);
        
      });
     
    })();
   

}(jQuery, window, window.document));

 
 


  

  
 