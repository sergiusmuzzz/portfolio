// Check browser's window size
var isMobile = window.matchMedia("only screen and (max-width: 640px)"),
    isTablet = window.matchMedia("only screen and (max-width: 1024px)"),
    $swapImg = $('img[data-src]'),
    imgSrc;


function checkSize() {
    $swapImg.each(function(){
        imgSrc = $(this).data('src');
        /*if(isMobile.matches){
          $(this).attr('src', imgSrc + '-touch.png')
        }else */if(isTablet.matches){
            $(this).attr('src', imgSrc + '-touch.png')
        }else{
            $(this).attr('src', imgSrc + '.png')
        }
    });
}

checkSize();

$(window).on('resize', checkSize);
