var karmaParseConfig = require('karma/lib/config').parseConfig,
    karma = require('karma'),
    path = require('path'),
    util = require('gulp-util');

module.exports = function () {
    function runKarma(configFilePath, options, cb) {

        configFilePath = path.resolve(configFilePath);

        var server = karma.Server;
        var log = util.log, colors = util.colors;
        var config = karmaParseConfig(configFilePath, {});

        Object.keys(options).forEach(function (key) {
            config[key] = options[key];
        });

        server.start(config, function (exitCode) {
            if (exitCode === 1) {
                log(colors.red('UT failed ' + exitCode));
            } else {
                log(colors.green('Finished all UT succeed !!!'))
            }
            cb();
            process.exit(exitCode);
        });
    }

    return {
        runKarma: runKarma
    };
};
