modules.define('g-range', ['i-bem__dom'], function(provide, BEMDOM) {

    BEMDOM.decl('g-range', {
        onSetMod: {
            js: {
                'inited': function () {
                    var self = this;
                    var rightThumb = this.elem('thumb', 'right', true);
                    var leftThumb = this.elem('thumb', 'left', true);
                    var handlebar = this.elem('handlebar');
                    var handlebarStart = handlebar.offset().left;
                    var handlebarWidth = handlebar.outerWidth() - 1;
                    var fill = this.elem('fill');
                    var fillStart = fill.offset().left - handlebarStart;
                    var fillWidth = fill.width();
                    var fillEnd = fillStart + fillWidth;
                    this.bindTo(rightThumb, 'mousedown', function (e) {
                        e.stopPropagation();
                        //@TODO избавиться от скачка при mouseup
                        $(document).bind('mousemove', function (e) {
                            var percent = (e.pageX - handlebar.offset().left) * 100 / handlebar.outerWidth() - 1;
                            if ((e.pageX - handlebar.offset().left) < (fill.offset().left - handlebar.offset().left)) {

                            } else {
                                fill.css('margin-right', 100 - percent + '%');
                            }
                        });
                        $(document).bind('mouseup', function (e) {
                            console.log('key up');
                            $(document).unbind('mousemove');
                            $(document).unbind('mouseup');
                        });
                    });
                    this.bindTo(handlebar, 'click', function (e) {
                        handlebarStart = handlebar.offset().left;
                        handlebarWidth = handlebar.outerWidth() - 1;
                        clickPoint = e.pageX - handlebarStart;
                        fillStart = fill.offset().left - handlebarStart;
                        fillWidth = fill.width();
                        fillEnd = fillStart + fillWidth;
                        if (clickPoint >= 0 && clickPoint <= handlebarWidth) {
                            var percent = clickPoint * 100 / handlebarWidth;
                            if ((Math.abs(clickPoint - fillStart)) < (Math.abs(clickPoint - fillEnd))) {
                                fill.css('margin-left', percent + '%');
                            } else {
                                fill.css('margin-right', 100 - percent + '%');
                            }
                        }
                    });
                },
                '': function () {
                    this.unbindFrom(this.elem('thumb', 'right', true), 'click');
                    this.unbindFrom(this.elem('handlebar'), 'click');
                }
            }
        },
        _moveAt: function (e) {
            var marginRight = e.PageX;
        }
    }, {});

    provide(BEMDOM);
})