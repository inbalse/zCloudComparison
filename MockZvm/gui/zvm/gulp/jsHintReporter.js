'use strict';

var map = require('map-stream'),
    util = require('gulp-util'),
    runningTask = require('yargs').argv._[0];

module.exports = function () {
    var log = util.log, colors = util.colors, errorCollection = [];

    var reporter = function () {
        return map(function (file, cb) {
            if (file.jshint && !file.jshint.success && !file.jshint.ignored) {
                log(colors.cyan('JSHINT fail in ' + file.path));
                file.jshint.results.forEach(function (el) {
                    var err = el.error;
                    if (err) {
                        log(colors.yellow('line: ') + colors.red(err.line) +
                            colors.yellow(', col: ') + colors.red(err.character) +
                            //colors.yellow(', code: ') + colors.red(err.code) +
                            colors.yellow(',  reason: ') + colors.red(err.reason));

                        errorCollection.push(err);
                    }
                });

                //break the release task if JSHINT failed
                if (runningTask === 'release') {
                    process.exit(0);
                }
            }

            cb(null, file);
        });
    };

    var done = function () {
        var errorLength = errorCollection.length;

        if (errorLength === 0) {
            log(colors.green(' : - ) jshint done without errors ( -;'));
        } else {
            log(colors.red('you have ' + errorLength + ' jshint errors'));
        }

        errorCollection.length = 0;
    };

    return {
        reporter: reporter,
        done: done
    }
};
