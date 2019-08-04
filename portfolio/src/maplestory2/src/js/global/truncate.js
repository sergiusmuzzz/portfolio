// Does a document-wide sweep to truncate long text from promo boxes, news items, etc.

(function($, window, document, undefined) {


    $(document).ready(function() {

        var MAX_PROMO_CHARS = 45;
        var MAX_NEWS_ITEM_CHARS = 90;
           
        // Truncate hero carousel promo text 
        $('#hero-carousel .news-item-cont h3').each(function() {
            $(this).html( truncate($(this).html(), MAX_PROMO_CHARS) );    
        });

       	// Truncate News Grid item text 
       	$('.news-grid .news-item-cont h3').each(function() {
            $(this).html( truncate($(this).html(), MAX_NEWS_ITEM_CHARS) );    
        });

    });

    // Truncations a string, if it's longer than a certain length.
    // Truncated strings are cut off at spaces, with '...' appended if needed.
    function truncate(s, len) {
        // console.log('truncate: ' + s);
        if (s.length <= len)
            return s;

        if (!len)
            len = 30;

        var parts = s.split(' ');
        var new_s = '';

        while (new_s.length + parts[0].length + 1 < len) {
            new_s = new_s + parts.shift() + ' '
        }
        return new_s + '...';
    }


}(jQuery, window, window.document));
