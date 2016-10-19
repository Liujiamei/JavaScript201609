/*--计算CONTENT区域的高度--*/
~function () {
    var $header = $('#header'),
        $content = $('#content'),
        $menu = $('#menu');

    computedHeight();
    function computedHeight() {
        var winH = document.documentElement.clientHeight || document.body.clientHeight;
        var tarH = winH - $header.outerHeight() - 40;
        $content.css('height', tarH);
        $menu.css('height', tarH - 2);
    }

    //->window.onresize:当浏览器的窗口大小发生改变时触发这个事件
    $(window).on('resize', computedHeight);
}();