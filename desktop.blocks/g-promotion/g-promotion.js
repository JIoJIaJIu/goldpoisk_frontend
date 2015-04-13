modules.define('g-promotion', ['i-bem__dom'], function (provide, BEMDOM) {

BEMDOM.decl('g-promotion', {
    onSetMod: {
        js: {
            inited: function () {
                var transitions = [{
                    $Duration: 1800,
                    x: 1,
                    $Delay: 30,
                    $Cols: 10,
                    $Rows: 5,
                    $Clip: 15,
                    $During: {
                        $Left: [0.3,0.7]
                    },
                    $Formation: $JssorSlideshowFormations$.$FormationStraightStairs,
                    $Assembly: 260,
                    $Easing: {
                        $Left: $JssorEasing$.$EaseInOutExpo,
                        $Clip: $JssorEasing$.$EaseInOutQuad
                    },
                    $Round: {
                        $Top: 0.8
                    }
                }];

                var slider = this.slider = new $JssorSlider$(this.elem('inner')[0], {
                    $AutoPlay: true,
                    $ArrowKeyNavigation: true,
                    $SlideshowOptions: {
                        $Class: $JssorSlideshowRunner$,
                        $Transitions: transitions,
                        $TransitionsOrder: 1,
                        $ShowLink: true
                    }
                });

                var markers = this.findBlocksInside('g-promotion-marker');
                slider.$On($JssorSlider$.$EVT_PARK, function (to, from) {
                    if (~from)
                        markers[from].delMod('state');
                    markers[to].setMod('state', 'selected');
                });
            }
        },
        '': function () {
            this.slider = null;
        }
    },

    deselectMarkers: function () {
        var markers = this.findBlocksInside('g-promotion-marker');
        _.forEach(markers, function (marker) {
            marker.delMod('state');
        });
    }
}, {});

provide(BEMDOM);

});
