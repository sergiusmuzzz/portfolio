$(document).ready(function(){
    $('.classes-page .slick').slick({
        prevArrow: "<button type=\"button\" class=\"slick-prev icon-left-arrow\"></button>",
        nextArrow: "<button type=\"button\" class=\"slick-next icon-right-arrow\"></button>",
        slidesToShow: 7.5,
        infinite: false,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2.75
                }
            }
        ]
    });
});
