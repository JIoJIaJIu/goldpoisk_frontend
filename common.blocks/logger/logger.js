modules.define('logger', [], function (provide) {
    var LEVELS = {
        'debug': 10,
        'warn': 20,
        'error': 30
    };

    var logger = {
        setLevel: function (level) {
            if (!LEVELS[level]) {
                throw new Error("Unknown level, use 'debug', 'warn' or 'error'");
            }

            return this._level = LEVELS[level];
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
        }
    };

    logger.setLevel('warn');
    window.logger = logger;
    provide(logger);
});
