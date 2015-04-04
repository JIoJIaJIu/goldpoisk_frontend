modules.define('logger', ['config'], function (provide, CONFIG) {
    var LEVELS = {
        'debug': 10,
        'warn': 20,
        'error': 30
    };

    //TODO: refactoring
    var logger = {
        name: "common",

        setLevel: function (level) {
            if (!LEVELS[level]) {
                throw new Error("Unknown level, use 'debug', 'warn' or 'error'");
            }

            var self = this;
            this._level = LEVELS[level];
            _.forEach(this._list, function (logger) {
                logger.setLevel(self._level)
            })
            return this._level;
        },

        getLevel: function () {
            return this._level;
        },

        debug: function () {
            if (LEVELS['debug'] < this._level)
                return;

            var args = Array.prototype.slice.call(arguments);
            console.log.apply(console, ["DEBUG:"].concat(args));
        },

        warn: function () {
            if (LEVELS['warn'] < this._level)
                return;

            var args = Array.prototype.slice.call(arguments);
            console.warn.apply(console, ["WARN:"].concat(args));
        },

        error: function () {
            if (LEVELS['error'] < this._level)
                return;

            var args = Array.prototype.slice.call(arguments);
            console.error.apply(console, ["ERROR:"].concat(args));
        },

        Logger: LoggerFactory,

        _list: []
    };

    function LoggerFactory (name) {
        return new Logger(name)
    }

    function Logger (name) {
        this.name = name;
        this.setLevel(CONFIG.logLevel);
        return this;
    }

    Logger.prototype = {
        init: function () {
            logger._list.push(this);
            return this;
        },

        finalize: function () {
            var index = logger._list.indexOf(this);
            logger._list.splice(index, 1);
        },

        getLevel: function () {
            return this._level;
        },

        setLevel: function (level) {
            if (!LEVELS[level]) {
                throw new Error("Unknown level, use 'debug', 'warn' or 'error'");
            }

            return this._level = LEVELS[level];
        },

        debug: function () {
            if (LEVELS['debug'] < this._level)
                return;

            var name = "{" + this.name + "}";
            var args = Array.prototype.slice.call(arguments);
            console.log.apply(console, [name, "DEBUG:"].concat(args));
        },

        warn: function () {
            if (LEVELS['warn'] < this._level)
                return;

            var name = "{" +this. name + "}";
            var args = Array.prototype.slice.call(arguments);
            console.warn.apply(console, [name, "WARN:"].concat(args));
        },

        error: function () {
            if (LEVELS['error'] < this._level)
                return;

            var name = "{" + this.name + "}";
            var args = Array.prototype.slice.call(arguments);
            console.error.apply(console, [name, "ERROR:"].concat(args));
        }
    };

    logger.setLevel(CONFIG.logLevel);
    window.logger = logger;
    provide(logger);
});
