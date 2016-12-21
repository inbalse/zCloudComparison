// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: [
            'jasmine',
            'jasmine-matchers'
        ],

        plugins: [
            'karma-jasmine',
            'karma-jasmine-matchers',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-ie-launcher',
            'karma-mocha-reporter',
            'karma-ng-html2js-preprocessor',
            'karma-coverage'
        ],

        // reporters configuration
        reporters: ['mocha', 'coverage'],

        // full (default)	all output is printed to the console
        // autowatch	first run will have the full output and the next runs just output the summary and errors in mocha style
        // minimal	only the summary and errors are printed to the console in mocha style
        // noFailures	the failure details are not logged
        mochaReporter: {
            output: 'minimal',
            colors: {
                success: 'green',
                info: 'gray',
                warning: 'yellow',
                error: 'red'
            }
        },

        ignoreSkipped: false,

        // list of files / patterns to load in the browser
        files: [
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
            'app/bower_components/lodash/lodash.min.js',
            'app/bower_components/angular-lodash/angular-lodash.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.js',
            'app/bower_components/autofill-event/src/autofill-event.js',
            'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'app/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
            'app/bower_components/toastr/toastr.js',
            'app/bower_components/angular-translate/angular-translate.js',
            'app/bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
            'app/bower_components/basil.js/build/basil.js',
            'app/bower_components/moment/moment.js',
            'app/bower_components/mockjs/dist/mock.js',
            '../common/vendor/porthole.min.js',
            'app/bower_components/d3/d3.js',
            '../common/vendor/debugout.js',
            'app/bower_components/angular-ui-select/dist/select.js',
            'app/bower_components/mathjs/dist/math.js',
//          TODO-yaniv: fix jquery msie issue
//            'app/vendor/SlickGrid/controls/*.js',
//            'app/vendor/SlickGrid/lib/*.js',
//            'app/vendor/SlickGrid/*.js',
            'app/scripts/**/*.js',
            '../common/scripts/**/*.js',
            '../common/scripts/**/*.html',
            'app/scripts/**/*.html',
            'test/unit/**/*.js'
        ],
        exclude: [
            'app/scripts/core/site_settings/*.spec.js'
        ],
        preprocessors: {
            'app/scripts/**/*.html': ['ng-html2js'],
            'app/scripts/**/!(*.spec).js': ['coverage']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/',
            moduleName: 'templates'
        },

        // web server port
        port: 9949,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        // browsers: ['Chrome', 'Firefox', 'IE'],
         browsers: ['Chrome'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,
        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'coverage/',
            subdir: '.'
        }
    });
};
