(function(g) {
  var __bem_xjst = function(exports) {
     var $$mode = "", $$block = "", $$elem = "", $$elemMods = null, $$mods = null;

var __$ref = {};

function apply(ctx) {
    ctx = ctx || this;
    $$mods = ctx["mods"];
    $$elemMods = ctx["elemMods"];
    $$elem = ctx["elem"];
    $$block = ctx["block"];
    $$mode = ctx["_mode"];
    try {
        return applyc(ctx, __$ref);
    } catch (e) {
        e.xjstContext = ctx;
        throw e;
    }
}

exports.apply = apply;

function applyc(__$ctx, __$ref) {
    var cache;
    var __$r = __$g2(__$ctx, __$ref);
    if (__$r !== __$ref) return __$r;
}

[ function(exports, context) {
    var undef, BEM_ = {}, toString = Object.prototype.toString, slice = Array.prototype.slice, isArray = Array.isArray || function(obj) {
        return toString.call(obj) === "[object Array]";
    }, SHORT_TAGS = {
        area: 1,
        base: 1,
        br: 1,
        col: 1,
        command: 1,
        embed: 1,
        hr: 1,
        img: 1,
        input: 1,
        keygen: 1,
        link: 1,
        meta: 1,
        param: 1,
        source: 1,
        wbr: 1
    };
    (function(BEM, undefined) {
        var MOD_DELIM = "_", ELEM_DELIM = "__", NAME_PATTERN = "[a-zA-Z0-9-]+";
        function buildModPostfix(modName, modVal) {
            var res = MOD_DELIM + modName;
            if (modVal !== true) res += MOD_DELIM + modVal;
            return res;
        }
        function buildBlockClass(name, modName, modVal) {
            var res = name;
            if (modVal) res += buildModPostfix(modName, modVal);
            return res;
        }
        function buildElemClass(block, name, modName, modVal) {
            var res = buildBlockClass(block) + ELEM_DELIM + name;
            if (modVal) res += buildModPostfix(modName, modVal);
            return res;
        }
        BEM.INTERNAL = {
            NAME_PATTERN: NAME_PATTERN,
            MOD_DELIM: MOD_DELIM,
            ELEM_DELIM: ELEM_DELIM,
            buildModPostfix: buildModPostfix,
            buildClass: function(block, elem, modName, modVal) {
                var typeOfModName = typeof modName;
                if (typeOfModName === "string" || typeOfModName === "boolean") {
                    var typeOfModVal = typeof modVal;
                    if (typeOfModVal !== "string" && typeOfModVal !== "boolean") {
                        modVal = modName;
                        modName = elem;
                        elem = undef;
                    }
                } else if (typeOfModName !== "undefined") {
                    modName = undef;
                } else if (elem && typeof elem !== "string") {
                    elem = undef;
                }
                if (!(elem || modName)) {
                    return block;
                }
                return elem ? buildElemClass(block, elem, modName, modVal) : buildBlockClass(block, modName, modVal);
            },
            buildModsClasses: function(block, elem, mods) {
                var res = "";
                if (mods) {
                    var modName;
                    for (modName in mods) {
                        if (!mods.hasOwnProperty(modName)) continue;
                        var modVal = mods[modName];
                        if (!modVal && modVal !== 0) continue;
                        typeof modVal !== "boolean" && (modVal += "");
                        res += " " + (elem ? buildElemClass(block, elem, modName, modVal) : buildBlockClass(block, modName, modVal));
                    }
                }
                return res;
            },
            buildClasses: function(block, elem, mods) {
                var res = "";
                res += elem ? buildElemClass(block, elem) : buildBlockClass(block);
                res += this.buildModsClasses(block, elem, mods);
                return res;
            }
        };
    })(BEM_);
    var ts = {
        '"': "&quot;",
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;"
    }, f = function(t) {
        return ts[t] || t;
    };
    var buildEscape = function(r) {
        r = new RegExp(r, "g");
        return function(s) {
            return ("" + s).replace(r, f);
        };
    };
    context.BEMContext = BEMContext;
    function BEMContext(context, apply_) {
        this.ctx = typeof context === "undefined" ? "" : context;
        this.apply = apply_;
        this._str = "";
        var _this = this;
        this._buf = {
            push: function() {
                var chunks = slice.call(arguments).join("");
                _this._str += chunks;
            },
            join: function() {
                return this._str;
            }
        };
        this._ = this;
        this._start = true;
        this._mode = "";
        this._listLength = 0;
        this._notNewList = false;
        this.position = 0;
        this.block = undef;
        this.elem = undef;
        this.mods = undef;
        this.elemMods = undef;
    }
    BEMContext.prototype.isArray = isArray;
    BEMContext.prototype.isSimple = function isSimple(obj) {
        if (!obj || obj === true) return true;
        var t = typeof obj;
        return t === "string" || t === "number";
    };
    BEMContext.prototype.isShortTag = function isShortTag(t) {
        return SHORT_TAGS.hasOwnProperty(t);
    };
    BEMContext.prototype.extend = function extend(o1, o2) {
        if (!o1 || !o2) return o1 || o2;
        var res = {}, n;
        for (n in o1) o1.hasOwnProperty(n) && (res[n] = o1[n]);
        for (n in o2) o2.hasOwnProperty(n) && (res[n] = o2[n]);
        return res;
    };
    var cnt = 0, id = +new Date(), expando = "__" + id, get = function() {
        return "uniq" + id + ++cnt;
    };
    BEMContext.prototype.identify = function(obj, onlyGet) {
        if (!obj) return get();
        if (onlyGet || obj[expando]) {
            return obj[expando];
        } else {
            return obj[expando] = get();
        }
    };
    BEMContext.prototype.xmlEscape = buildEscape("[&<>]");
    BEMContext.prototype.attrEscape = buildEscape('["&<>]');
    BEMContext.prototype.BEM = BEM_;
    BEMContext.prototype.isFirst = function isFirst() {
        return this.position === 1;
    };
    BEMContext.prototype.isLast = function isLast() {
        return this.position === this._listLength;
    };
    BEMContext.prototype.generateId = function generateId() {
        return this.identify(this.ctx);
    };
    var oldApply = exports.apply;
    exports.apply = BEMContext.apply = function BEMContext_apply(context) {
        var ctx = new BEMContext(context || this, oldApply);
        ctx.apply();
        return ctx._str;
    };
    BEMContext.prototype.reapply = BEMContext.apply;
} ].forEach(function(fn) {
    fn(exports, this);
}, {
    recordExtensions: function(ctx) {
        ctx["__$a0"] = 0;
        ctx["__$anflg2"] = false;
        ctx["__$anflg1"] = false;
        ctx["_mode"] = undefined;
        ctx["ctx"] = undefined;
        ctx["_ieCommented"] = undefined;
        ctx["_str"] = undefined;
        ctx["block"] = undefined;
        ctx["elem"] = undefined;
        ctx["_notNewList"] = undefined;
        ctx["position"] = undefined;
        ctx["_listLength"] = undefined;
        ctx["_currBlock"] = undefined;
        ctx["mods"] = undefined;
        ctx["elemMods"] = undefined;
    },
    resetApplyNext: function(ctx) {
        ctx["__$a0"] = 0;
    }
});

function __$b36(__$ctx, __$ref) {
    var ctx__$12 = __$ctx.ctx;
    return {
        block: "image",
        tag: "img",
        attrs: {
            src: ctx__$12.src,
            alt: "GoldPoisk"
        }
    };
}

function __$b39(__$ctx, __$ref) {
    if (__$ctx.ctx.amount == 0) return [ {
        tag: "div",
        cls: "empty"
    }, {
        tag: "span",
        content: "Корзина пуста. Ищите товары в каталоге"
    } ]; else return [ {
        tag: "div",
        cls: "full"
    }, {
        tag: "span",
        content: "В корзине " + amount + " товаров"
    } ];
    return;
}

function __$b61(__$ctx, __$ref) {
    var url__$16 = __$ctx.ctx.url;
    var __$r__$18;
    var __$l0__$19 = $$mode;
    $$mode = "";
    var __$l1__$20 = __$ctx.ctx;
    __$ctx.ctx = [ 6, 7, 8, 9 ].map(function(v) {
        return {
            elem: "css",
            url: url__$16 + ".ie" + v + ".css",
            ie: "IE " + v
        };
    });
    var __$r__$22;
    var __$l2__$23 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 8;
    __$r__$22 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$23;
    __$r__$18 = __$r__$22;
    $$mode = __$l0__$19;
    __$ctx.ctx = __$l1__$20;
    return;
}

function __$b62(__$ctx, __$ref) {
    var ie__$24 = __$ctx.ctx.ie, hideRule__$25 = !ie__$24 ? [ "gt IE 9", "<!-->", "<!--" ] : ie__$24 === "!IE" ? [ ie__$24, "<!-->", "<!--" ] : [ ie__$24, "", "" ];
    var __$r__$27;
    var __$l0__$28 = $$mode;
    $$mode = "";
    var __$l3__$29 = __$ctx.ctx;
    var __$l1__$30 = __$l3__$29._ieCommented;
    __$l3__$29._ieCommented = true;
    var __$l2__$31 = __$ctx.ctx;
    __$ctx.ctx = [ "<!--[if " + hideRule__$25[0] + "]>" + hideRule__$25[1], __$ctx.ctx, hideRule__$25[2] + "<![endif]-->" ];
    __$r__$27 = applyc(__$ctx, __$ref);
    $$mode = __$l0__$28;
    __$l3__$29._ieCommented = __$l1__$30;
    __$ctx.ctx = __$l2__$31;
    return;
}

function __$b63(__$ctx, __$ref) {
    __$ctx._defPageApplied = true;
    var ctx__$38 = __$ctx.ctx;
    var __$r__$40;
    var __$l0__$41 = $$mode;
    $$mode = "";
    var __$l1__$42 = __$ctx.ctx;
    __$ctx.ctx = [ ctx__$38.doctype || "<!DOCTYPE html>", {
        tag: "html",
        cls: "ua_js_no",
        content: [ {
            elem: "head",
            content: [ {
                tag: "meta",
                attrs: {
                    charset: "utf-8"
                }
            }, {
                tag: "title",
                content: ctx__$38.title
            }, {
                block: "ua"
            }, ctx__$38.head, ctx__$38.styles, ctx__$38.favicon ? {
                elem: "favicon",
                url: ctx__$38.favicon
            } : "" ]
        }, ctx__$38 ]
    } ];
    var __$r__$44;
    var __$l2__$45 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 64;
    __$r__$44 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$45;
    __$r__$40 = __$r__$44;
    $$mode = __$l0__$41;
    __$ctx.ctx = __$l1__$42;
    __$ctx._defPageApplied = false;
    return;
}

function __$b64(__$ctx, __$ref) {
    var BEM_INTERNAL__$46 = __$ctx.BEM.INTERNAL, ctx__$47 = __$ctx.ctx, isBEM__$48, tag__$49, res__$50;
    var __$r__$52;
    var __$l0__$53 = __$ctx._str;
    __$ctx._str = "";
    var vBlock__$54 = $$block;
    var __$r__$56;
    var __$l1__$57 = $$mode;
    $$mode = "tag";
    __$r__$56 = applyc(__$ctx, __$ref);
    $$mode = __$l1__$57;
    tag__$49 = __$r__$56;
    typeof tag__$49 !== "undefined" || (tag__$49 = ctx__$47.tag);
    typeof tag__$49 !== "undefined" || (tag__$49 = "div");
    if (tag__$49) {
        var jsParams__$58, js__$59;
        if (vBlock__$54 && ctx__$47.js !== false) {
            var __$r__$60;
            var __$l2__$61 = $$mode;
            $$mode = "js";
            __$r__$60 = applyc(__$ctx, __$ref);
            $$mode = __$l2__$61;
            js__$59 = __$r__$60;
            js__$59 = js__$59 ? __$ctx.extend(ctx__$47.js, js__$59 === true ? {} : js__$59) : ctx__$47.js === true ? {} : ctx__$47.js;
            js__$59 && ((jsParams__$58 = {})[BEM_INTERNAL__$46.buildClass(vBlock__$54, ctx__$47.elem)] = js__$59);
        }
        __$ctx._str += "<" + tag__$49;
        var __$r__$62;
        var __$l3__$63 = $$mode;
        $$mode = "bem";
        __$r__$62 = applyc(__$ctx, __$ref);
        $$mode = __$l3__$63;
        isBEM__$48 = __$r__$62;
        typeof isBEM__$48 !== "undefined" || (isBEM__$48 = typeof ctx__$47.bem !== "undefined" ? ctx__$47.bem : ctx__$47.block || ctx__$47.elem);
        var __$r__$65;
        var __$l4__$66 = $$mode;
        $$mode = "cls";
        __$r__$65 = applyc(__$ctx, __$ref);
        $$mode = __$l4__$66;
        var cls__$64 = __$r__$65;
        cls__$64 || (cls__$64 = ctx__$47.cls);
        var addJSInitClass__$67 = ctx__$47.block && jsParams__$58 && !ctx__$47.elem;
        if (isBEM__$48 || cls__$64) {
            __$ctx._str += ' class="';
            if (isBEM__$48) {
                __$ctx._str += BEM_INTERNAL__$46.buildClasses(vBlock__$54, ctx__$47.elem, ctx__$47.elemMods || ctx__$47.mods);
                var __$r__$69;
                var __$l5__$70 = $$mode;
                $$mode = "mix";
                __$r__$69 = applyc(__$ctx, __$ref);
                $$mode = __$l5__$70;
                var mix__$68 = __$r__$69;
                ctx__$47.mix && (mix__$68 = mix__$68 ? [].concat(mix__$68, ctx__$47.mix) : ctx__$47.mix);
                if (mix__$68) {
                    var visited__$71 = {}, visitedKey__$72 = function(block, elem) {
                        return (block || "") + "__" + (elem || "");
                    };
                    visited__$71[visitedKey__$72(vBlock__$54, $$elem)] = true;
                    __$ctx.isArray(mix__$68) || (mix__$68 = [ mix__$68 ]);
                    for (var i__$73 = 0; i__$73 < mix__$68.length; i__$73++) {
                        var mixItem__$74 = mix__$68[i__$73], hasItem__$75 = mixItem__$74.block || mixItem__$74.elem, mixBlock__$76 = mixItem__$74.block || mixItem__$74._block || $$block, mixElem__$77 = mixItem__$74.elem || mixItem__$74._elem || $$elem;
                        hasItem__$75 && (__$ctx._str += " ");
                        __$ctx._str += BEM_INTERNAL__$46[hasItem__$75 ? "buildClasses" : "buildModsClasses"](mixBlock__$76, mixItem__$74.elem || mixItem__$74._elem || (mixItem__$74.block ? undefined : $$elem), mixItem__$74.elemMods || mixItem__$74.mods);
                        if (mixItem__$74.js) {
                            (jsParams__$58 || (jsParams__$58 = {}))[BEM_INTERNAL__$46.buildClass(mixBlock__$76, mixItem__$74.elem)] = mixItem__$74.js === true ? {} : mixItem__$74.js;
                            addJSInitClass__$67 || (addJSInitClass__$67 = mixBlock__$76 && !mixItem__$74.elem);
                        }
                        if (hasItem__$75 && !visited__$71[visitedKey__$72(mixBlock__$76, mixElem__$77)]) {
                            visited__$71[visitedKey__$72(mixBlock__$76, mixElem__$77)] = true;
                            var __$r__$79;
                            var __$l6__$80 = $$mode;
                            $$mode = "mix";
                            var __$l7__$81 = $$block;
                            $$block = mixBlock__$76;
                            var __$l8__$82 = $$elem;
                            $$elem = mixElem__$77;
                            __$r__$79 = applyc(__$ctx, __$ref);
                            $$mode = __$l6__$80;
                            $$block = __$l7__$81;
                            $$elem = __$l8__$82;
                            var nestedMix__$78 = __$r__$79;
                            if (nestedMix__$78) {
                                for (var j__$83 = 0; j__$83 < nestedMix__$78.length; j__$83++) {
                                    var nestedItem__$84 = nestedMix__$78[j__$83];
                                    if (!nestedItem__$84.block && !nestedItem__$84.elem || !visited__$71[visitedKey__$72(nestedItem__$84.block, nestedItem__$84.elem)]) {
                                        nestedItem__$84._block = mixBlock__$76;
                                        nestedItem__$84._elem = mixElem__$77;
                                        mix__$68.splice(i__$73 + 1, 0, nestedItem__$84);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            cls__$64 && (__$ctx._str += isBEM__$48 ? " " + cls__$64 : cls__$64);
            __$ctx._str += addJSInitClass__$67 ? ' i-bem"' : '"';
        }
        if (isBEM__$48 && jsParams__$58) {
            __$ctx._str += ' data-bem="' + __$ctx.attrEscape(JSON.stringify(jsParams__$58)) + '"';
        }
        var __$r__$86;
        var __$l9__$87 = $$mode;
        $$mode = "attrs";
        __$r__$86 = applyc(__$ctx, __$ref);
        $$mode = __$l9__$87;
        var attrs__$85 = __$r__$86;
        attrs__$85 = __$ctx.extend(attrs__$85, ctx__$47.attrs);
        if (attrs__$85) {
            var name__$88, attr__$89;
            for (name__$88 in attrs__$85) {
                attr__$89 = attrs__$85[name__$88];
                if (typeof attr__$89 === "undefined") continue;
                __$ctx._str += " " + name__$88 + '="' + __$ctx.attrEscape(__$ctx.isSimple(attr__$89) ? attr__$89 : __$ctx.reapply(attr__$89)) + '"';
            }
        }
    }
    if (__$ctx.isShortTag(tag__$49)) {
        __$ctx._str += "/>";
    } else {
        tag__$49 && (__$ctx._str += ">");
        var __$r__$91;
        var __$l10__$92 = $$mode;
        $$mode = "content";
        __$r__$91 = applyc(__$ctx, __$ref);
        $$mode = __$l10__$92;
        var content__$90 = __$r__$91;
        if (content__$90 || content__$90 === 0) {
            isBEM__$48 = vBlock__$54 || $$elem;
            var __$r__$93;
            var __$l11__$94 = $$mode;
            $$mode = "";
            var __$l12__$95 = __$ctx._notNewList;
            __$ctx._notNewList = false;
            var __$l13__$96 = __$ctx.position;
            __$ctx.position = isBEM__$48 ? 1 : __$ctx.position;
            var __$l14__$97 = __$ctx._listLength;
            __$ctx._listLength = isBEM__$48 ? 1 : __$ctx._listLength;
            var __$l15__$98 = __$ctx.ctx;
            __$ctx.ctx = content__$90;
            __$r__$93 = applyc(__$ctx, __$ref);
            $$mode = __$l11__$94;
            __$ctx._notNewList = __$l12__$95;
            __$ctx.position = __$l13__$96;
            __$ctx._listLength = __$l14__$97;
            __$ctx.ctx = __$l15__$98;
        }
        tag__$49 && (__$ctx._str += "</" + tag__$49 + ">");
    }
    res__$50 = __$ctx._str;
    __$r__$52 = undefined;
    __$ctx._str = __$l0__$53;
    __$ctx._buf.push(res__$50);
    return;
}

function __$b66(__$ctx, __$ref) {
    var __$r__$100;
    var __$l0__$101 = $$mode;
    $$mode = "";
    var __$l1__$102 = __$ctx.ctx;
    __$ctx.ctx = __$ctx.ctx._value;
    var __$r__$104;
    var __$l2__$105 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 128;
    __$r__$104 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$105;
    __$r__$100 = __$r__$104;
    $$mode = __$l0__$101;
    __$ctx.ctx = __$l1__$102;
    return;
}

function __$b67(__$ctx, __$ref) {
    __$ctx._listLength--;
    var ctx__$106 = __$ctx.ctx;
    if (ctx__$106 && ctx__$106 !== true || ctx__$106 === 0) {
        __$ctx._str += ctx__$106 + "";
    }
    return;
}

function __$b68(__$ctx, __$ref) {
    __$ctx._listLength--;
    return;
}

function __$b69(__$ctx, __$ref) {
    var ctx__$107 = __$ctx.ctx, len__$108 = ctx__$107.length, i__$109 = 0, prevPos__$110 = __$ctx.position, prevNotNewList__$111 = __$ctx._notNewList;
    if (prevNotNewList__$111) {
        __$ctx._listLength += len__$108 - 1;
    } else {
        __$ctx.position = 0;
        __$ctx._listLength = len__$108;
    }
    __$ctx._notNewList = true;
    while (i__$109 < len__$108) (function __$lb__$112() {
        var __$r__$113;
        var __$l0__$114 = __$ctx.ctx;
        __$ctx.ctx = ctx__$107[i__$109++];
        __$r__$113 = applyc(__$ctx, __$ref);
        __$ctx.ctx = __$l0__$114;
        return __$r__$113;
    })();
    prevNotNewList__$111 || (__$ctx.position = prevPos__$110);
    return;
}

function __$b70(__$ctx, __$ref) {
    __$ctx.ctx || (__$ctx.ctx = {});
    var vBlock__$115 = __$ctx.ctx.block, vElem__$116 = __$ctx.ctx.elem, block__$117 = __$ctx._currBlock || $$block;
    var __$r__$119;
    var __$l0__$120 = $$mode;
    $$mode = "default";
    var __$l1__$121 = $$block;
    $$block = vBlock__$115 || (vElem__$116 ? block__$117 : undefined);
    var __$l2__$122 = __$ctx._currBlock;
    __$ctx._currBlock = vBlock__$115 || vElem__$116 ? undefined : block__$117;
    var __$l3__$123 = $$elem;
    $$elem = vElem__$116;
    var __$l4__$124 = $$mods;
    $$mods = vBlock__$115 ? __$ctx.ctx.mods || (__$ctx.ctx.mods = {}) : $$mods;
    var __$l5__$125 = $$elemMods;
    $$elemMods = __$ctx.ctx.elemMods || {};
    $$block || $$elem ? __$ctx.position = (__$ctx.position || 0) + 1 : __$ctx._listLength--;
    applyc(__$ctx, __$ref);
    __$r__$119 = undefined;
    $$mode = __$l0__$120;
    $$block = __$l1__$121;
    __$ctx._currBlock = __$l2__$122;
    $$elem = __$l3__$123;
    $$mods = __$l4__$124;
    $$elemMods = __$l5__$125;
    return;
}

function __$g0(__$ctx, __$ref) {
    var __$t = $$block;
    if (__$t === "g-button") {
        if (!$$elem) {
            return "span";
        }
    } else if (__$t === "g-product") {
        var __$t = $$elem;
        if (__$t === "price") {
            return "span";
        } else if (__$t === "jw") {
            return "span";
        } else if (__$t === "pw") {
            return "span";
        } else if (__$t === "image") {
            return "img";
        } else if (__$t === "title") {
            return "h1";
        }
        if (!$$elem) {
            return "li";
        }
    } else if (__$t === "g-goods") {
        if (!$$elem) {
            return "ul";
        }
    } else if (__$t === "g-section") {
        if (!$$elem) {
            return "div";
        }
    } else if (__$t === "g-pride-item") {
        if (!$$elem) {
            return "div";
        }
    } else if (__$t === "g-promotion-item") {
        var __$t = $$elem;
        if (__$t === "price") {
            return "p";
        } else if (__$t === "title") {
            return "p";
        }
    } else if (__$t === "g-menu-item") {
        if (!$$elem) {
            return "li";
        }
    } else if (__$t === "g-logo") {
        if (!$$elem) {
            return "div";
        }
    } else if (__$t === "page") {
        var __$t = $$elem;
        if (__$t === "js") {
            return "script";
        } else if (__$t === "css") {
            if (__$ctx.ctx.url) {
                return "link";
            }
            return "style";
        } else if (__$t === "head") {
            return "head";
        } else if (__$t === "favicon") {
            return "link";
        } else if (__$t === "link") {
            return "link";
        } else if (__$t === "meta") {
            return "meta";
        }
        if (!$$elem) {
            return "body";
        }
    } else if (__$t === "ua") {
        if (!$$elem) {
            return "script";
        }
    }
    return undefined;
    return __$ref;
}

function __$g1(__$ctx, __$ref) {
    var __$t = $$block;
    if (__$t === "g-footer") {
        if (!$$elem) {
            return {
                block: "g-footer_inner",
                content: [ {
                    elem: "left",
                    content: [ {
                        tag: "p",
                        content: "&copy GoldPoisk, 2014"
                    } ]
                }, {
                    elem: "middle",
                    content: [ {
                        tag: "section",
                        content: [ {
                            tag: "header",
                            content: [ {
                                tag: "h1",
                                content: "Мы в социальных сетях"
                            } ]
                        }, {
                            tag: "span",
                            cls: "fb"
                        }, {
                            tag: "span",
                            cls: "tw"
                        }, {
                            tag: "span",
                            cls: "vk"
                        }, {
                            tag: "span",
                            cls: "ok"
                        } ]
                    } ]
                }, {
                    elem: "right",
                    content: [ {
                        tag: "p",
                        content: "New Mind Inc."
                    } ]
                } ]
            };
        }
    } else if (__$t === "g-cooperation") {
        if (!$$elem) {
            return [ {
                elem: "inner",
                tag: "section",
                content: [ {
                    tag: "header",
                    content: [ {
                        tag: "h1",
                        content: "Хотите сотрудничать и стать нашим партнёром?"
                    } ]
                }, {
                    tag: "p",
                    content: "- свяжитесь с нами по адресу support@goldpoisk.ru"
                } ]
            } ];
        }
    } else if (__$t === "g-product") {
        if (!$$elem) {
            return [ {
                mods: {
                    action: __$ctx.ctx.action ? "yes" : undefined,
                    hit: __$ctx.ctx.hit ? "yes" : undefined,
                    like: __$ctx.ctx.like ? "yes" : undefined
                }
            }, {
                elem: "like"
            }, {
                tag: "a",
                attrs: {
                    href: __$ctx.ctx.href
                },
                content: [ {
                    elem: "tape"
                }, {
                    elem: "image",
                    url: __$ctx.ctx.image
                }, {
                    elem: "title",
                    content: __$ctx.ctx.title
                } ]
            }, {
                elem: "pw",
                content: [ {
                    tag: "span"
                }, {
                    tag: "p",
                    content: __$ctx.ctx.pw
                } ]
            }, {
                elem: "jw",
                content: [ {
                    tag: "span"
                }, {
                    tag: "p",
                    content: __$ctx.ctx.jw
                } ]
            }, {
                elem: "shop",
                content: __$ctx.ctx.shop
            }, {
                elem: "price",
                content: __$ctx.ctx.price
            }, {
                block: "g-button",
                content: "Купить"
            } ];
        }
    } else if (__$t === "g-goods") {
        if (!$$elem && (__$ctx.__$a0 & 1) === 0) {
            return [ function __$lb__$0() {
                var __$r__$1;
                var __$l0__$2 = __$ctx.__$a0;
                __$ctx.__$a0 = __$ctx.__$a0 | 1;
                __$r__$1 = applyc(__$ctx, __$ref);
                __$ctx.__$a0 = __$l0__$2;
                return __$r__$1;
            }(), {
                block: "clear"
            } ];
        }
    } else if (__$t === "g-section") {
        var __$t = !$$elem;
        if (__$t) {
            if ($$mods && $$mods.type === "subscription" && __$ctx["__$anflg2"] !== true) {
                return [ function __$lb__$3() {
                    var __$r__$4;
                    var __$l0__$5 = __$ctx.__$anflg2;
                    __$ctx.__$anflg2 = true;
                    __$r__$4 = applyc(__$ctx, __$ref);
                    __$ctx.__$anflg2 = __$l0__$5;
                    return __$r__$4;
                }(), {
                    tag: "form",
                    content: [ {
                        tag: "label",
                        content: "Ваш e-mail"
                    }, {
                        tag: "input",
                        content: ""
                    }, {
                        elem: "g-button",
                        content: "Подписаться"
                    } ]
                } ];
            }
            return [ {
                tag: "header",
                content: [ {
                    tag: "h1",
                    content: __$ctx.ctx.title
                } ]
            }, {
                tag: "p",
                content: __$ctx.ctx.description
            } ];
        }
        if (!$$elem) {
            return [ {
                tag: "header",
                content: [ {
                    tag: "h1",
                    content: __$ctx.ctx.title
                } ]
            }, {
                tag: "p",
                content: __$ctx.ctx.description
            } ], function() {
                return {
                    elem: "inner",
                    content: function __$lb__$6() {
                        var __$r__$7;
                        var __$l0__$8 = __$ctx.__$anflg1;
                        __$ctx.__$anflg1 = true;
                        __$r__$7 = applyc(__$ctx, __$ref);
                        __$ctx.__$anflg1 = __$l0__$8;
                        return __$r__$7;
                    }()
                };
            };
        }
    } else if (__$t === "g-pride-item") {
        if (!$$elem) {
            return [ {
                tag: "div",
                cls: "img"
            }, {
                tag: "p",
                content: __$ctx.ctx.label
            } ];
        }
    } else if (__$t === "g-pride") {
        if (!$$elem && (__$ctx.__$a0 & 2) === 0) {
            return {
                elem: "inner",
                content: function __$lb__$9() {
                    var __$r__$10;
                    var __$l0__$11 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 2;
                    __$r__$10 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$11;
                    return __$r__$10;
                }()
            };
        }
    } else if (__$t === "g-promotion-item") {
        var __$t = $$elem;
        if (__$t === "price") {
            return __$ctx.ctx.price;
        } else if (__$t === "title") {
            return __$ctx.ctx.title;
        }
    } else if (__$t === "fotorama") {
        if (!$$elem) {
            var __$r = __$b36(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "g-menu-item") {
        if (!$$elem) {
            return {
                tag: "a",
                attrs: {
                    href: __$ctx.ctx.href
                },
                content: [ {
                    elem: "logo",
                    tag: "mask",
                    content: ""
                }, {
                    elem: "title",
                    tag: "span",
                    content: __$ctx.ctx.label
                }, {
                    elem: "arrow",
                    tag: "span"
                } ]
            };
        }
    } else if (__$t === "g-category") {
        if (!$$elem && (__$ctx.__$a0 & 4) === 0) {
            return {
                elem: "list",
                tag: "ul",
                content: function __$lb__$13() {
                    var __$r__$14;
                    var __$l0__$15 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 4;
                    __$r__$14 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$15;
                    return __$r__$14;
                }()
            };
        }
    } else if (__$t === "g-basket") {
        if (!$$elem) {
            var __$r = __$b39(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "g-logo") {
        if (!$$elem) {
            return [ {
                tag: "a",
                elem: "link",
                attrs: {
                    href: "/"
                },
                content: [ {
                    elem: "gold",
                    tag: "span"
                }, {
                    elem: "poisk",
                    tag: "span"
                } ]
            }, {
                elem: "description",
                tag: "div",
                content: __$ctx.ctx.description
            } ];
        }
    } else if (__$t === "page") {
        if ($$elem === "head" && (__$ctx.__$a0 & 16) === 0) {
            return [ __$ctx.ctx["x-ua-compatible"] === false ? false : {
                tag: "meta",
                attrs: {
                    "http-equiv": "X-UA-Compatible",
                    content: __$ctx.ctx["x-ua-compatible"] || "IE=edge"
                }
            }, function __$lb__$32() {
                var __$r__$33;
                var __$l0__$34 = __$ctx.__$a0;
                __$ctx.__$a0 = __$ctx.__$a0 | 16;
                __$r__$33 = applyc(__$ctx, __$ref);
                __$ctx.__$a0 = __$l0__$34;
                return __$r__$33;
            }() ];
        }
        if (!$$elem && (__$ctx.__$a0 & 32) === 0) {
            return [ function __$lb__$35() {
                var __$r__$36;
                var __$l0__$37 = __$ctx.__$a0;
                __$ctx.__$a0 = __$ctx.__$a0 | 32;
                __$r__$36 = applyc(__$ctx, __$ref);
                __$ctx.__$a0 = __$l0__$37;
                return __$r__$36;
            }(), __$ctx.ctx.scripts ];
        }
    } else if (__$t === "ua") {
        if (!$$elem) {
            return [ "(function(e,c){", 'e[c]=e[c].replace(/(ua_js_)no/g,"$1yes");', '})(document.documentElement,"className");' ];
        }
    }
    return __$ctx.ctx.content;
    return __$ref;
}

function __$g2(__$ctx, __$ref) {
    var __$t = $$mode;
    if (__$t === "tag") {
        var __$r = __$g0(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "content") {
        var __$r = __$g1(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "attrs") {
        var __$t = $$block;
        if (__$t === "g-product") {
            if ($$elem === "image") {
                return {
                    src: __$ctx.ctx.url,
                    width: "100%",
                    height: "180px"
                };
            }
        } else if (__$t === "page") {
            var __$t = $$elem;
            if (__$t === "js") {
                if (__$ctx.ctx.url) {
                    return {
                        src: __$ctx.ctx.url
                    };
                }
            } else if (__$t === "css") {
                if (__$ctx.ctx.url) {
                    return {
                        rel: "stylesheet",
                        href: __$ctx.ctx.url
                    };
                }
            } else if (__$t === "favicon") {
                return {
                    rel: "shortcut icon",
                    href: __$ctx.ctx.url
                };
            }
        }
        return undefined;
    } else if (__$t === "cls") {
        if ($$block === "g-section" && !$$elem) {
            return "g-section__inner";
        }
        return undefined;
    } else if (__$t === "js") {
        return undefined;
    } else if (__$t === "bem") {
        var __$t = $$block;
        if (__$t === "page") {
            var __$t = $$elem;
            if (__$t === "js") {
                return false;
            } else if (__$t === "css") {
                return false;
            } else if (__$t === "head") {
                return false;
            } else if (__$t === "favicon") {
                return false;
            } else if (__$t === "link") {
                return false;
            } else if (__$t === "meta") {
                return false;
            }
        } else if (__$t === "ua") {
            if (!$$elem) {
                return false;
            }
        }
        return undefined;
    } else if (__$t === "default") {
        var __$t = $$block;
        if (__$t === "page") {
            var __$t = $$elem;
            if (__$t === "css") {
                var __$t = !__$ctx.ctx._ieCommented;
                if (__$t) {
                    var __$t = __$ctx.ctx.hasOwnProperty("ie");
                    if (__$t) {
                        if (__$ctx.ctx.ie === true && (__$ctx.__$a0 & 8) === 0) {
                            var __$r = __$b61(__$ctx, __$ref);
                            if (__$r !== __$ref) return __$r;
                        }
                        var __$r = __$b62(__$ctx, __$ref);
                        if (__$r !== __$ref) return __$r;
                    }
                }
            }
            if (!$$elem && !__$ctx._defPageApplied && (__$ctx.__$a0 & 64) === 0) {
                var __$r = __$b63(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
        }
        var __$r = __$b64(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "mix") {
        return undefined;
    } else if (__$t === "") {
        if (__$ctx.ctx && __$ctx.ctx._vow && (__$ctx.__$a0 & 128) === 0) {
            var __$r = __$b66(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (__$ctx.isSimple(__$ctx.ctx)) {
            var __$r = __$b67(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (!__$ctx.ctx) {
            var __$r = __$b68(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (__$ctx.isArray(__$ctx.ctx)) {
            var __$r = __$b69(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        var __$r = __$b70(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    }
    return __$ref;
};
     return exports;
  }
  var defineAsGlobal = true;
  if(typeof exports === "object") {
    exports["BEMHTML"] = __bem_xjst({});
    defineAsGlobal = false;
  }
  if(typeof modules === "object") {
    modules.define("BEMHTML",
      function(provide) {
        provide(__bem_xjst({})) });
    defineAsGlobal = false;
  }
  defineAsGlobal && (g["BEMHTML"] = __bem_xjst({}));
})(this);