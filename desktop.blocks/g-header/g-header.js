modules.define('g-header', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {
    BEMDOM.decl('g-header', {
        onSetMod: {
            'js': {
                'inited': function() {
                    t = this;
                    $(window).scroll(function(e) {
                        if ( $(this).scrollTop() > 1/*parseInt( $(t.domElem).css('height') )*/ ) {
                            t.setMod('state', 'flow');
                        } else {
                            console.log('1');
                            t.delMod('state');
                        }
                        //console.log(t.domElem.scrollTop);
                        
                    });
                    /*
                    this.bindTo('scroll', function(e) {
                        alert('done');
                        this.setMod('state', 'flow');
                    });
                    */
                }
            }
        }
    }, {});
    provide(BEMDOM);
});