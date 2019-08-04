/**
 * Loadmore More
 */

(function($){


    function init() {
        var pageSize = 10,
            currentPage = 1,
            $loadMore = $(".load-more"),
            key = $loadMore.find("a");

        //Corrects styles for current page when in landscape view on mobile
        function setStylesForCurrentPage(curPage){
            var pagination = ".pagination";
            $(pagination).find('li').removeClass('active');
            $(pagination).find('a').each(function () {
                if($(this).text() == curPage){
                    $(this).parent('li').addClass('active');
                    return false;
                }
            });
        }

        $(key).on('click', function(e) {
            e.preventDefault();
            var $t = $(this);

            var url = $t.attr("href");
            var itemKey = $t.attr("data-item");
            var contentKey = $t.attr("data-cont");

            console.log('LOADMORE', url, itemKey, contentKey)


            if (!url || !itemKey || !contentKey) return false;

            setStylesForCurrentPage($t.data("currentpage") + 1);

            $.get(url, function(data) {
                var $data = $(data);
                if ($data.find(itemKey).length) {
                    $(contentKey).append($(data).find(itemKey));
                    var $viewmore = $data.find(key);
                    if ($viewmore.length) {
                        $t.attr("href", $viewmore.attr("href"));
                        $t.data("currentpage", $viewmore.data("currentpage"));
                        $t.data("lastpage", $viewmore.data("lastpage"));
                    } else {
                        $loadMore.hide();
                    }
                }
            });
        });
    }

    $(document).ready(function(){
        init();
    });

}(jQuery));
