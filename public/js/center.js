
(function($) {
    $.fn.extend({
        "center": function() {
            var top = ($(window).height() - $(this).height()) / 2;
            var bottom = ($(window).height() - $(this).height()) / 2;
            var left = ($(window).width() - $(this).width()) / 2;
            $(this).css({
                "top": top,
                "bottom": bottom,
                "left": left
            });
            return $(this);
        }
    })
})(jQuery);
