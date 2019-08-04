var animations = (function ($, window) {

    "use strict";

    $(document).ready(function () {
        SmoothScroll({
            // Scrolling Core
            animationTime    : 400, // 400 [ms]
            stepSize         : 100, // 100 [px]
        });

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) === false) {
            andrzejdus.parallaxer.Parallaxer.start();
        }

        window.sr = ScrollReveal();
        if (sr.isSupported()) {
            document.documentElement.classList.add('sr');
        }
        sr.reveal('.sr-reveal', { delay: 100, mobile: false });
        sr.reveal('.sr-top', { delay: 100, origin: 'top', mobile: false });
        sr.reveal('.sr-left', { delay: 100, origin: 'left', mobile: false });
        sr.reveal('.sr-right', { delay: 100, origin: 'right', mobile: false });
    });
})(jQuery, window);