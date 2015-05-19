modules.define('page', ['i-bem__dom'], function (provide, BEMDOM) {

    BEMDOM.decl('page', {
        setTitle: function (title) {
            title = title.toLowerCase();
            title = title.charAt(0).toUpperCase() + title.substr(1);
            $(document.documentElement)
                .find('title')
                .text(title);
        },

        setDescription: function (description) {
            description = description.toLowerCase();
            description = description.charAt(0).toUpperCase() + description.substr(1);
            $(document.documentElement)
                .find('head meta[name=description]')
                .attr('content', description);
        },

        genTitle: function (title) {
            title = 'купить ' + title;
            this.setTitle(title);
        },

        genDescription: function (title, category) {
            var description = 'Предлагаем не только купить ' + title.toLowerCase() + ', но и взглянуть на все ' + category + ', которые у нас есть. Отсортируйте по цене для поиска более выгодного предложения.';
            $(document.documentElement)
                .find('head meta[name=description]')
                .attr('content', description);
        }
    }, {});

    provide(BEMDOM);
})