modules.define('g-social-like-item', ['i-bem__dom'], function(provide, BEMDOM) {
    var y = BEMDOM.decl('g-social-like-item', {}, {})

    BEMDOM.decl({block: 'g-social-like-item', modName: 'type', modVal: 'twitter'}, {
        onSetMod: {
            'js': function () {
                window.twttr=(function(d,s,id) {
                        var js, fjs = d.getElementsByTagName(s)[0], t=window.twttr || {};
                        if ( d.getElementById(id) )
                            return;
                        js = d.createElement(s);
                        js.id = id;
                        js.src = "https://platform.twitter.com/widgets.js";
                        fjs.parentNode.insertBefore(js,fjs);
                        t._e = [];
                        t.ready = function(f) {
                            t._e.push(f);
                        };
                        return t;
                    }(document,"script","twitter-wjs"));
            }
        }
    }, {});

    BEMDOM.decl({block: 'g-social-like-item', modName: 'type', modVal: 'fb'}, {
        onSetMod: {
            'js': function () {
                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.0";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            }
        }
    }, {});

    BEMDOM.decl({block: 'g-social-like-item', modName: 'type', modVal: 'vk'}, {
        onSetMod: {
            'js': function () {
                VK.init({
                    apiId: '4760123',
                    onlyWidgets: true
                });
                VK.Widgets.Like("vk_like", { type: 'button' });
            }
        }
    }, {});

    BEMDOM.decl({block: 'g-social-like-item', modName: 'type', modVal: 'ok'}, {
        onSetMod: {
            'js': function () {
                !function (d, id, did, st) {
                    var js = d.createElement("script");
                    js.src = "http://connect.ok.ru/connect.js";
                    js.onload = js.onreadystatechange = function () {
                        if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
                            if (!this.executed) {
                                this.executed = true;
                                setTimeout(function () {
                                    OK.CONNECT.insertShareWidget(id,did,st);
                                }, 0);
                            }
                        }
                    };
                d.documentElement.appendChild(js);
                }(document,"ok_shareWidget","http://goldpoisk.ru","{width:145,height:30,st:'straight',sz:20,ck:1}");
            }
        }
    })

    provide(BEMDOM)

});

