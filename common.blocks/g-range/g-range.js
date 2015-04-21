modules.define('g-range', ['i-bem__dom'], function(provide, BEMDOM) {

    BEMDOM.decl('g-range', {
        onSetMod: {
            js: {
                'inited': function () {
                    var self = this;
                    var rightThumb = this.elem('thumb', 'right', true);
                    var leftThumb = this.elem('thumb', 'left', true);
                    var handlebar = this.elem('handlebar');
                    var fill = this.elem('fill');
                    this.bindTo(rightThumb, 'click', function (e) {
                        e.stopPropagation();
                    });
                    this.bindTo(handlebar, 'click', function (e) {
                        var handlebarStart = handlebar.offset().left;
                        var handlebarWidth = handlebar.outerWidth() - 1;
                        var clickPoint = e.pageX - handlebarStart;
                        var fillStart = fill.offset().left - handlebarStart;
                        var fillWidth = fill.width();
                        var fillEnd = fillStart + fillWidth;
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