// Facebook share
$('a.share-facebook').bind('click',function(e){
    e.preventDefault();
    var $t = $(this);
    var link = $t.attr('data-link') || window.location.href;
    var description = $t.attr('data-description') || "";
    var picture = $t.attr('data-picture') || "";
    var source = $t.attr('data-source') || "";
    var opts = {
        method: 'feed'
    };
    if (link) opts.link = link; // required
    if (picture) opts.picture = picture; // required
    if (description) opts.caption = description; // optional
    if (source) opts.source = source; // optional, for sharing videos
    // share on facebook
    FB.ui(opts, function(response){
        if (response && !response.error_message) {
            //alert('Posting completed.');
        } else {
            //alert('Error while posting.');
        }
    });
});

// Twitter
$('a.share-twitter').bind('click',function(e){
    e.preventDefault();
    var $t = $(this);
    var link = $t.attr('data-link') || window.location.href;
    var description = $t.attr('data-description') || "";
    var via = $t.attr('data-via') || "maplestory";
    var hashtags = $t.attr('data-hashtags') || "";
    // open share popup
    window.open('http://twitter.com/intent/tweet?hashtags='+hashtags+'&via='+via+'&text='+description+'&url=' + link + '&', 'twitterwindow', 'height=550, width=420, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
});