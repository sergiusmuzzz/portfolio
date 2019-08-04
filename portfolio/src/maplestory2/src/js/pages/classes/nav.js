var carousel = document.querySelector('.classes-carousel'),
    header = document.querySelector('.sticky-header'),
    gntBarHeight = 44,
    headerHeight = header.offsetHeight,
    stickyCarouselTop = carousel.offsetTop,
    stickPoint;
if(isTablet.matches){
    gntBarHeight = 0;
}

stickyCarousel();

$(window).scroll(stickyCarousel);

$(window).resize(function() {
    gntBarHeight = 0;
    headerHeight = header.offsetHeight;
    stickyCarouselTop = carousel.offsetTop;
});

function stickyCarousel() {
    stickPoint = window.pageYOffset + headerHeight - gntBarHeight;
    if (stickPoint > stickyCarouselTop) {
        carousel.classList.add('sticky');
    }else {
        carousel.classList.remove('sticky');
    }
}

$(document).ready(function () {
    // Cache selectors
    var lastId,
        topMenu = $(".classes-carousel"),
        topMenuHeight = topMenu.outerHeight(true)+1,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

// Bind click handler to menu items
// so we can get a fancy scroll animation
    menuItems.click(function(e){
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top;
        menuItems.removeClass("active");
        $(this).addClass("active");
        $('html, body').stop().animate({
            scrollTop: offsetTop+'rem'
        }, 850);
        e.preventDefault();
    });
});


// Bind to scroll
/*$(window).scroll(function(){
    // Get container scroll position
    var fromTop = $(this).scrollTop()+topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
            return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
            .removeClass("active")
            .filter("[href=#"+id+"]").addClass("active");
    }
});*/
