
(function($, Event, window, document, undefined) {

	$.fn.coverVid = function ($el, width, height) {

		var $elParent = $el.parent();

		var $video = $el.find('video');
		if (!$video.length) return false;

		$el.find('video').css({
			width: '100%',
			height: 'auto'
		});		

		// Set necessary styles to position video "center center"
		$el.css({
			'position': 'absolute',
			'top': '50%',
			'left': '50%',
			'-webkit-transform': 'translate(-50%, -50%)',
			'-ms-transform': 'translate(-50%, -50%)',
			'transform': 'translate(-50%, -50%)'
		});

		// Set overflow hidden on parent element
		$el.parent().css('overflow','hidden');		

		$video.on('load',function(){
			console.log('VIDEO LOADED');
			sizeVideo();
		});	

		// Define the attached selector
		function sizeVideo() {

			//console.log('SIZE VIDEO',$el,$elParent)
			
			if (!$elParent.length) { return; }
			
			// Get parent element height and width
			var parentHeight = $elParent.height(); 
			var parentWidth = $elParent.width(); // this sometimes gives wrong width

			// Get native video width and height
			var nativeWidth = width;
			var nativeHeight = height;

			// Get the scale factors
			var heightScaleFactor = parentHeight / nativeHeight;
			var widthScaleFactor = parentWidth / nativeWidth;

			//console.log('COVERVID', parentWidth, parentHeight, $elParent)

			// Based on highest scale factor set width and height
			if (widthScaleFactor > heightScaleFactor) {
				$el.css({
					'height': 'auto',
					'width': parentWidth+'px'
				});
			} else {
				$el.css({
					'height': parentHeight+'px',
					'width': 'auto'
				});
			}
		}

		// call sizeVideo on resize
		// this doesn't work
		/*window.onresize = function () {
			setTimeout(function(){
				sizeVideo()
			},250)
		};*/
	}

}(jQuery, Event, window, window.document));


