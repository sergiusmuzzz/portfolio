
(function($, window, document, undefined){

    var $header;

    function animateHeader() {
      (window.pageYOffset > 44) ? $header.addClass('fixed-header') : $header.removeClass('fixed-header');
    }

    function setupDropdowns() {      
      $.each($header.find('.btn-nav'),function(i,v){
        var $t = $(v);
        var $dropdown = $t.find('ul.nav-dropdown');
        if ($dropdown.length) {
          $t.hover(function(){
            $dropdown.show();
          });
          $t.mouseleave(function(){
            $dropdown.hide();
          });
        }
      });
    }

    $(document).ready(function(){ 
      $header = $('header');
      // if ($('body').hasClass('home')) {

        animateHeader();
        window.onscroll = function(){animateHeader()};
      /*} else {
        $header.removeClass('head2');
      }*/
      // setupDropdowns();
    });

}(jQuery, window, window.document));
