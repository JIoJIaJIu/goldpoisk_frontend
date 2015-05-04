modules.define('g-desires', ['i-bem__dom', 'cookie', 'config'], function(provide, BEMDOM, cookie, CONFIG) {

    BEMDOM.decl('g-desires', {
        onSetMod: {
            js: {
                'inited': function () {
                    var self = this;
                    var desires = cookie.get('desires') || '';
                    desires = _.words(desires);
                    this._list = _.map(desires, function(desire) {
                        return parseInt(desire, 10);
                    });

                    var modal = this._getModal();
                    var link = this.findBlockInside('g-link');
                    link.bindTo('click', function (e) {
                        e.preventDefault();
                        var ids = self._list.join('.');
                        if (!ids.length)
                            return;

                        modal.show(true);
                        $.getJSON(CONFIG.REST.products, {ids: ids}, function success(data) {
                            self._updateModal(data);
                        }).fail(function () {
                            //TODO: notification
                        });
                    });

                    this._redraw();
                },
                '': function () {
                    this.findBlockInside('g-link').unbindFrom('click');
                }
            }
        },

        like: function (id) {
            if (~this._list.indexOf(id))
                return;

            this._list.push(id);
            this._redraw();

            var ids = this._list.join('.');
            cookie.set('desires', ids, {expires: 1});
            this.emit('change', ids);
        },

        dislike: function (id) {
            if (!~this._list.indexOf(id))
                return;

            _.remove(this._list, function(i) {
                return id == i;
            });

            this._redraw();

            var ids = this._list.join('.');
            cookie.set('desires', ids, {expires: 1});
            this.emit('change', ids);
        },

        isLiked: function (id) {
            return !!~this._list.indexOf(id);
        },

        _redraw: function () {
            var count = this.elem('count');
            var text = this.elem('text');
            var length = this._list.length;

            if (length) {
                this.delMod('empty');
                count.text(length);
                text.text(declension(length, 'товар'));
                return;
            }

            this.setMod('empty', true);
            text.text('Нет товаров');
        },

        _updateModal: function (data) {
            var modal = this._getModal();

            var content = [{
                block: 'g-heading',
                mods: { dark: true, size: 'l' },
                count: data.count,
                content: 'Список желаний'
            }, {
                block: 'g-description',
                tag: 'p',
                content: 'Понравившиеся вам товары хранятся здесь, и ждут когда вы их купите. Мы пришлем вам весточку, если на выбранные товары появятся скидки.'
            }, {
                block: 'g-goods',
                content: blocks['g-goods.items'](data.list, {js: true})
            }]

            modal.update(BEMHTML.apply(content));
        },

        _getModal: function () {
            if (this.__modal)
                return this.__modal

            var page = this.findBlockOutside('page');
            var bemjson = { block: 'g-modal', content: [] };
            BEMDOM.append(page.domElem, BEMHTML.apply(bemjson));
            this.__modal = page.findBlockInside('g-modal');
            return this.__modal;
        },

        _list: null,
        __modal: null
    }, {
    });

    provide(BEMDOM);
})
