var app = app || {};

// ************* Translations and Localization Engine *************
// look for cookie and init i18 with returned cookie value.

var Translate = (function($, i18n, utility, config ) {

    var LANGUAGE_PATH = config.cdn + 'data/language/';
    // var LANGUAGE_PATH = 'http://nxcache.nexon.net/firstassault/engagement/data/language/';
    // var LANGUAGE_PATH = '/data/language/';

    var inited = false;

    var options = {
        debug: true,
        fallbackLng: 'en',
        cookieDomain: ".nexon.net",
        detectLngQS: 'lang',    // query string parameter name
        useDataAttrOptions: true,
        customLoad: function(lngValue, nsValue, options, loadComplete) {
            loadLanguages(lngValue, nsValue, options, loadComplete);
        }
    };

    var init = function() {
        if (inited)
            return false;

        var lng = utility.getCookie('i18next');
        var supportedLang = ['en','de','fr','es'];
        if ( $.inArray(lng, supportedLang) == -1)
            lng = "en";
        if (lng == "")
            lng = "en";

        options.lng = lng;


        i18n.init(options, function() {
            $("html").i18n();

            // Add language class to HTML for utility
            $("html").addClass("lang-" + lng);

            // Tracking request
            $("html").attr('lang', lng);

            // Apply currentYear string replace to footer text
            init();
        });



        inited = true;
    };


    // Fix jsonp crossdomain error callback
    function loadLanguages(lngValue, nsValue, options, loadComplete) {
        $.jsonp({
            url: LANGUAGE_PATH + lngValue + ".json",
            callback: "callback_" + lngValue.replace("-", ""),
            success: function(data) {
                // console.log("success loading " + lngValue, data);
                loadComplete(null, data);
            },
            error: function(d, msg) {
                // console.log("error loading " + lngValue + " load default language: en", d, msg);
                // error loading lngValue load default language: en
                loadComplete(null, null);
            }
        });
    };


    return {
        init: init
    };

}(Translate || jQuery, i18n, app.utility, app.config ));




// ************* init translate script, UI set cookie *************

( function( $, utility ) {

    // Run translate script
    Translate.init();

    var COOKIE_EXPIRE_DAYS = 7;

    // To change site language, set the i18next cookie to the correct language code, then refresh the page
    function setCookieAndReload( lang ) {
        utility.setCookie('i18next', lang, COOKIE_EXPIRE_DAYS*24*60*60*1000);
        // window.location.href= window.location.href;
        window.location.reload();
    }


    // bind events

    $('.j-change-language').on('click touchend', function(e){
        var selectedLan = $(e.currentTarget).attr('data-lang');
        setCookieAndReload(selectedLan);
    });

    $('.j-change-language_select').on('change', function(){
        var selectedLan = $('option:selected', this).attr('data-lang');
        setCookieAndReload(selectedLan);
    });

    // Show current language depends on cookie set.

    function updateCurrentLanguage( shortKey, Fullkey){
        // language in big header
        $('.j-current-language').html(Fullkey);

        // language option in mobile menu.
        // $('.j-change-language_select').prepend( $('.j-change-language_select [data-lang="'+ shortKey +'"]') );
        $('.j-change-language_select [data-lang="'+ shortKey +'"]').attr('selected', true);
    }

    switch( utility.getCookie('i18next') ) {
        case 'en':
            updateCurrentLanguage('en', 'English');
            break;
        case 'de':
            updateCurrentLanguage('de', 'Deutsch');
            break;
        case 'fr':
            updateCurrentLanguage('fr', 'Français');
            break;
        case 'es':
            updateCurrentLanguage('es', 'Español (LA)')
            break;

        default:
            updateCurrentLanguage('en', 'English');
    }

    // // add current language class to body
    // $("body").addClass("lang-"+ $.i18n.lng());

})( jQuery, app.utility );
