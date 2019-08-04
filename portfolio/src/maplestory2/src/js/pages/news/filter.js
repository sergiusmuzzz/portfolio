/**
 * News Filter
 */

(function($){

    function init() {
        var isOpen = false;
        var $nav = $('.news-filter');
        var $navMobile = $('.news-filter-mobile');
        var $navSelect = $navMobile.find('select');
        var $navOptions = $navSelect.find('option');

        var $menu = $nav.find('ul.dropdown-news');
        var $toggle = $nav.find('a.dropdown');
        $toggle.bind('click',function(e){
            e.preventDefault();
            if ($menu.css('display') == 'none') {
                $menu.show();
                $nav.addClass('open');
                isOpen = true;
                //resetNativeNav();
                //$navMobile.find('select').focus();
                $toggle.hide();
            } else {
                $menu.hide();
                $nav.removeClass('open');
                isOpen = false;
                $toggle.show();
            }
        });

        $(document).click(function(e){
            if (!$('body').hasClass('mobile') && !$(e.target).closest('a.dropdown').length) {
                $menu.hide();
                $nav.removeClass('open');
                isOpen = false;
                $toggle.show();
            }
        });

        $nav.find('.btn-news-filter-menu').bind('click',function(e){
            e.preventDefault();
            $menu.hide();
            $nav.removeClass('open');
            isOpen = false;
            $toggle.show();
        });

        /*var $mobileCloseButton = $('<a class="btn mobile-close-news-filter"><i class="icon icon-hamburger-close"></i></a>');

        $('.news-filter').prepend($mobileCloseButton);

        $mobileCloseButton.bind('click',function(e){
            e.preventDefault();
            $menu.hide();
            $nav.removeClass('open');
            isOpen = false;
            $toggle.show();
            $('main').css({
                "max-height": "",
                "overflow": ""
            });
            $('footer').show();
        });*/

        $navMobile.find('a.btn-mobile').bind('click',function(e){
            e.preventDefault();
            /*if ($navMobile.find('.select-container').css('display') == 'none') {
                $navMobile.find('.select-container').show();
                $navMobile.find('select').focus();
            } else {
                $navMobile.find('.select-container').hide();
            }*/

          if ($menu.css('display') == 'none') {
                $menu.show();
                $nav.addClass('open');
                isOpen = true;
                //resetNativeNav();
                //$navMobile.find('select').focus();
                $toggle.hide();
                $('main').css({
                    "max-height": "100vh",
                    "overflow": "hidden"
                });
                $('footer').hide();
            } else {
                $menu.hide();
                $nav.removeClass('open');
                isOpen = false;
                $toggle.show();
                $('main').css({
                    "max-height": "",
                    "overflow": ""
                });
                $('footer').show();
            }
        });

        //setupNativeNav();

        // Added for Bug Fix: XTW-385 - Going to another page then back on the iPad when the language is not set to English will occasionally leave a check next to another language.
        function resetNativeNav() {
        // remove "selected" from any options that might already be selected
            $.each($navMobile.find('option'),function(i,v) {
                $(this).removeAttr('selected');
            });
        }

        function setupNativeNav() {
            $navSelect.bind('change',function(){
                var filter = $(this).val();
                console.log('111',filter)
                window.location = filter;
            });
        }
    }

    function isTouchDevice(){
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch(e) {
            return false;
        }
    }

    $(document).ready(function(){
        init();
    });

}(jQuery));
