(function (document, window, undefined) {
    'use strict';

    // Find each tooltip
    var $tooltip = $('.tooltip'),
        $tip = $('.tip');

    $tip.each(function() {
        // Create tooltip element
        var $this = $(this);


        // Add tooltip to body on mouse over
        $this.on('mouseover', function() {
            $tooltip.find('.bubble-content').html('<p>' + $this.data('description') + '</p>');
            $tooltip.show();
            $tooltip.appendTo('body');
        });

        // Remove tooltip on mouseout
        $this.on('mouseout', function() {
            $tooltip.remove();
        });

        // Attach the tooltip to the mouse cursor
        $this.on('mousemove', function(e) {
            $tooltip.css('left', (e.pageX + 20) + 'px');
            $tooltip.css('top', (e.pageY + 20) + 'px');
        });

    });

})(document, window);