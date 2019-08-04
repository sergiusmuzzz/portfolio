
(function($) {

  function init() {

    $('a.tw-share-button').on('click',function(e){
      e.preventDefault();
      var $t = $(this),
        link = $t.attr('data-link') || window.location.href,
        description = $t.attr('data-description') || "",
        via = $t.attr('data-via') || "PlayMaple2",
        hashtags = $t.attr('data-hashtags') || "";

      // open share popup
      window.open('http://twitter.com/intent/tweet?hashtags='+hashtags+'&via='+via+'&text='+description+'&url=' + link + '&', 'twitterwindow', 'height=550, width=420, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
    });

    $('a.fb-share-button').on('click',function(e){
      e.preventDefault();
      var $t = $(this),
        link = $t.attr('data-link') || window.location.href,
        description = $t.attr('data-description') || $('.header-text h1').text(),
        picture = $t.attr('data-picture');
      if (!picture) {
        picture = $('.header').css('background-image');
        picture = picture.split('"')[1] || "";
      }
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
  }

	$(document).ready(function(){
		init();
	});

}(jQuery));

