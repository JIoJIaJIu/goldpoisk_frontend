modules.define('page', ['i-bem__dom'], function (provide, BEMDOM) {

    BEMDOM.decl('page', {
        setTitle: function (title) {
            $(document.documentElement)
                .find('title')
                .text(title);
        },

        setDescription: function (description) {
            $(document.documentElement)
                .find('head meta[name=description]')
                .attr('content', description);
        }
    }, {});

    provide(BEMDOM);
})