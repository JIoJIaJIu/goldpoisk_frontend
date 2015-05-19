modules.define('page', ['i-bem__dom'], function (provide, BEMDOM) {

    BEMDOM.decl('page', {
        setTitle: function (title) {
            $(document.documentElement)
                .find('title')
                .text(this._capitalize(title));
        },

        setDescription: function (description, capitalize) {
            if (capitalize)
                description = this._capitalize(description)
            $(document.documentElement)
                .find('head meta[name=description]')
                .attr('content', description);
        },

        genTitle: function (title) {
            return "Купить %title%".replace("%title%", title);
        },

        genDescription: function (title, category) {
            return "Предлагаем не только купить %title%, но и взглянуть на все %category% , которые у нас есть. Отсортируйте по цене для поиска более выгодного предложения."
                .replace("%title%", title.toLowerCase())
                .replace("%category%", category);
        },

        _capitalize: function (word) {
            word = word || "";
            word = word.toLowerCase();
            word = word.charAt(0).toUpperCase() + word.substr(1);
            return word;
        }
    }, {});

    provide(BEMDOM);
})