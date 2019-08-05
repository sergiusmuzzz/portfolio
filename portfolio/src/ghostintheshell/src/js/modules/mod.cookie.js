var WebCookie = (function($, window, document, undefined) {

    var setCookie = function(name, value, days) {
        // Check if the days is set otherwise use the default value
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = '; expires=' + date.toGMTString();

            // Set the cookie to the name, value, and expiration
            document.cookie = name + '=' + value + expires + '; path=/';
        }
    };

    var getCookie = function(name) {
        var cookieValue = document.cookie,
            cookieStart = cookieValue.indexOf(' ' + name + '=');

        if (cookieStart === -1) {
            cookieStart = cookieValue.indexOf(name + '=');
        }

        if (cookieStart === -1) {
            cookieValue = null;
        } else {
            cookieStart = cookieValue.indexOf('=', cookieStart) + 1;
            var cookieEnd = cookieValue.indexOf(';', cookieStart);

            if (cookieEnd === -1) {
                cookieEnd = cookieValue.length;
            }
            cookieValue = unescape(cookieValue.substring(cookieStart, cookieEnd));
        }

        return cookieValue;
    };

    var deleteCookie = function(name) {
        setCookie(name, '', -1);
    };

    return {
        setCookie: setCookie,
        getCookie: getCookie,
        deleteCookie: deleteCookie
    }

}(jQuery, window, window.document));