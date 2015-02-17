modules.define('g-promotion', ['i-bem__dom', 'slider'], function (provide, BEMDOM) {

BEMDOM.decl('g-promotion', {
    onSetMod: {
        js: function () {
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

            var slider = new $JssorSlider$(this.domElem[0], {
                $AutoPlay: true,
                $ArrowKeyNavigation: true,
                $SlideshowOptions: {
                    $Class: $JssorSlideshowRunner$,
                    $Transitions: transitions,
                    $TransitionsOrder: 1,
                    $ShowLink: true
                }
            });
        }
    }
}, {
});

provide(BEMDOM);

});
