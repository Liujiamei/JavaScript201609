/*--基于String.prototype扩展字符串处理的常用方法--*/
~function (pro) {
    function queryURLParameter() {
        var reg = /([^?=&#]+)=([^?=&#]+)/g,
            obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });

        reg = /#([^?=&#]+)/;
        if (reg.test(this)) {
            obj['HASH'] = reg.exec(this)[1];
        }
        return obj;
    }

    pro.queryURLParameter = queryURLParameter;
}(String.prototype);

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

    $(window).on('resize', computedHeight);
}();

/*--MENU RENDER--*/
var menuRender = (function () {
    var $menu = $('#menu'),
        $menuList = $menu.find('a'),
        menuIScroll = null;

    //->scrollFn:实现MENU区域的局部滚动
    function scrollFn() {
        menuIScroll = new IScroll('#menu', {
            bounce: false,
            scrollbars: true,
            mouseWheel: true,
            fadeScrollbars: true
        });
    }

    //->hashFn:让HASH值对应的A选中
    function hashFn() {
        var urlObj = window.location.href.queryURLParameter(),
            hash = urlObj['HASH'] || 'nba',
            $curMenu = $menuList.filter("[href='#" + hash + "']");
        $curMenu.length === 0 ? $curMenu = $menuList.eq(0) : null;
        $curMenu.addClass('bg');
        menuIScroll.scrollToElement($curMenu[0], 0);
    }

    //->bindEvent:给MENU区域的每一个A绑定点击事件
    function bindEvent() {
        $menuList.on('click', function () {
            var _this = this;
            $menuList.each(function (index, item) {
                if (this === _this) {
                    $(this).addClass('bg');
                    return;
                }
                $(this).removeClass('bg');
            });

            //->控制右侧的内容跟着点击而改变
        });
    }

    return {
        init: function () {
            scrollFn();
            hashFn();
            bindEvent();
        }
    }
})();
menuRender.init();



