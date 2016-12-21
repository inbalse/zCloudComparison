'use strict';

/*
 ================================== TASKS OPTIONS ========================================

 1) gulp zvm ( runs zvm app in developer mode )
 *)   //usage
 // gulp zvm >>> default 'gui_local'
 // gulp zvm --remote >>> default 'gui_remote'
 // gulp zvm --env='gui_local'
 // gulp zvm --remote --env='assaf_aws_remote'

 2) gulp mockZvm ( runs zvm app in developer mode and mocked all BE data )

 3) gulp karma ( run unit tests )
 4) gulp jshint ( run jshint all over js files )
 5) gulp sass ( concat all scss files and convert to main.css file )
 6) gulp bowerCss (concat all bower css files to bower.css file )

 7) gulp devDist ( distribute developer version to chosen destination )
 8) gulp release --ver 0.0.0.0 optional params ( distribute production version to chosen destination )

 ------------------------ configuration ----------------------------------------------------
 in gulp/destinations file you have dist option to configure. the option mean
 when you want to extract GUI files
 */

//live reload path in index.html (<script src="http://localhost:35729/livereload.js?snipver=1" type="text/javascript"></script>)

try {
    var DevConfig = require('./devConfig');
} catch (err) {
    console.log('DevConfig file is not available. in gulp file');
}
//region VARIABLES ----------------------------------------------------------------------//
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    sass = require('gulp-sass'),
    path = require('path'),
    debug = require('gulp-debug'),
    server = require('gulp-express'),
    jshint = require('gulp-jshint'),
    liveReload = require('gulp-livereload'),
    templateCache = require('gulp-angular-templatecache'),
    minifyHtml = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    ngAnnotate = require('gulp-ng-annotate'),
    minify = require('gulp-minify'),
    inject = require('gulp-inject'),
    replace = require('gulp-replace-task'),
    argv = require('yargs').argv,
    rev = require('gulp-rev'),
    FileCache = require("gulp-file-cache"),
    comment = require('gulp-decomment'),
    vendorPaths = require('./gulp/vendor-lib-destinations')(),
    bowerPaths = require('./gulp/bower-lib-destinations')(),
    paths = require('./gulp/paths')(),
    shell = require('gulp-shell'),
    destinations = require('./gulp/destinations')(),
    karma = require('./gulp/karma')(),
    jsHintReporter = require('./gulp/jsHintReporter')(),
    runningTask = argv._[0],
    version = argv.ver || '4.5';

liveReload({start: false, quiet: true});

//initials flags
var fileCache = new FileCache(),
    config;

if (DevConfig !== undefined) {
    config = new DevConfig();
}

//check is need to remove .tmp folder by running task
var generateBuildVersionBeforeRunTasksCollection = runningTask === 'devRelease' ? ['removeTmp'] : ['bowerDist', 'copyTmp'];

// actual reload function that managed reload after all task been completed.
function reloadManager() {
    var interval = setInterval(function () {
        tick()
    }, 250);

    function tick() {
        if (!gulp.isRunning) {
            clearInterval(interval);
            liveReload.reload();
        }
    }
}
//endregion

//region COMMON TASKS -------------------------------------------------------------------//
gulp.task('copyImages', function () {
    return gulp.src(paths.vendorImages)
        .pipe(gulp.dest(destinations.destAppStylesImages));
});

gulp.task('bowerCss', function () {
    return gulp.src(bowerPaths.css.concat(vendorPaths.css))
        .pipe(concat('bower.css'))
        .pipe(gulp.dest(destinations.destAppStyles));
});

gulp.task('scssConcat', function () {
    return gulp.src(paths.zvm.appScriptsScss)
        .pipe(concat('_concat-styles.scss'))
        .pipe(gulp.dest(destinations.destAppStyles));
});

gulp.task('sass', ['scssConcat'], function () {
    return gulp.src(paths.appStylesMainScss)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 1 version']
        }))
        .pipe(gulp.dest(destinations.destAppStyles))
        .pipe(liveReload());
});

gulp.task('indexVendorGenerator', ['indexBowerGenerator'], function () {
    var target = gulp.src(paths.appIndex);
    var sources = gulp.src(vendorPaths.js, {read: false});

    return target.pipe(inject(sources, {
        ignorePath: paths.common + '/',
        addRootSlash: false,
        starttag: '<!--vendor:js-->',
        endtag: '<!--end vendor:js-->'
    }))
        .pipe(gulp.dest('app/'));
});

gulp.task('indexBowerGenerator', function () {
    var target = gulp.src(paths.appIndex);
    var sources = gulp.src(bowerPaths.js, {read: false});

    return target.pipe(inject(sources, {
        ignorePath: 'app/',
        addRootSlash: false,
        starttag: '<!--bower:js-->',
        endtag: '<!--end bower:js-->'
    }))
        .pipe(gulp.dest('app/'));
});
//endregion -----------------------------------------------------------------------------//

//region INDEX GENERATOR ----------------------------------------------------------------//
gulp.task('indexZvmGenerator', ['indexVendorGenerator'], function () {//generate zvm files without mock to index.html
    var target = gulp.src(paths.appIndex);
    var commonSources = gulp.src(paths.zvm.appCommon, {read: false});
    var sources = gulp.src(paths.zvm.appScripts, {read: false});

    return target.pipe(inject(commonSources, {
        ignorePath: paths.common + '/scripts',
        addPrefix: 'scripts/common',
        starttag: '<!-- common:js -->',
        endtag: '<!-- end common:js -->',
        addRootSlash: false
    }))
        .pipe(inject(sources, {ignorePath: 'app/', addRootSlash: false}))
        .pipe(gulp.dest('app/'));
});

gulp.task('mockZvmIndexGenerator', ['indexVendorGenerator', 'copyImages'], function () {//generate zvm mock files to index.html
    var target = gulp.src(paths.appIndex);
    var commonSources = gulp.src(paths.zvm.appCommon, {read: false});
    var sources = gulp.src(paths.zvm.appMockScripts, {read: false});

    return target.pipe(inject(commonSources, {
        ignorePath: paths.common + '/scripts',
        addPrefix: 'scripts/common',
        starttag: '<!-- common:js -->',
        endtag: '<!-- end common:js -->',
        addRootSlash: false
    }))
        .pipe(inject(sources, {ignorePath: 'app/', addRootSlash: false}))
        .pipe(gulp.dest('app/'));
});
//endregion

//region UNIT TEST and JSHINT -----------------------------------------------------------//
gulp.task('karma', function (cb) {
    return karma.runKarma('karma.conf.js', {
        autoWatch: false,
        singleRun: true
        // browsers: ['Chrome'] // by configuration karma runs in 3 browser this option just for fix UT more easily
    }, cb);
});

//todo : in .jshintrc file remove( "latedef": false,) options and fix all warning
gulp.task('jshint', function () {
    if (runningTask !== 'jshint') {
        return gulp.src(paths.appScripts)
            .pipe(fileCache.filter())
            .pipe(jshint())
            .pipe(fileCache.cache())
            .pipe(jsHintReporter.reporter()).on('end', function () {
                jsHintReporter.done();
            });
    } else {
        return gulp.src(paths.appScripts)
            .pipe(jshint())
            .pipe(jsHintReporter.reporter()).on('end', function () {
                jsHintReporter.done();
            });
    }
});

gulp.task('guiTest', ['jshint', 'karma']);
//endregion

//region ZVM ----------------------------------------------------------------------------//
//open browser on localhost and proxies
gulp.task('webServerZvm', ['copyImages', 'bowerCss', 'sass'], function () {
    var type = argv.remote ? 'remote' : 'local';

    server.run(['express.js'], {
        env: {
            target: type
        }
    }, false);
});

gulp.task('htmlZvm', function () {
    return gulp.src(paths.zvm.appHtml)
        .on('end', function () {
            reloadManager();
        });
});

gulp.task('scriptsZvm', ['jshint'], function () {
    return gulp.src(paths.zvm.appWatchScripts)
        .on('end', function () {
            reloadManager();
        });
});

gulp.task('watchZvm', ['webServerZvm'], function () {
    liveReload.listen();

    gulp.watch(paths.zvm.appHtml, {interval: 500}, function (event) {
        console.log('Html File', event.path, 'was', event.type);
        gulp.start('htmlZvm');
    });

    gulp.watch(paths.appScss, {interval: 1000}, function (event) {
        console.log('Scss File', event.path, 'was', event.type);
        gulp.start('sass');
    });

    gulp.watch(paths.zvm.appWatchScripts, {interval: 500}, function (event) {
        if (event.type === 'added' || event.type === 'deleted') {
            if (runningTask === 'zvm') {
                gulp.start('indexZvmGenerator');
            } else {
                gulp.start('mockZvmIndexGenerator');
            }
        } else {
            gulp.start('scriptsZvm');
        }
        console.log('JS File', event.path, 'was', event.type);
    });
});

//task run mock server (script in package.json)
gulp.task('runMockServer', function () {
    // return gulp.src('')
    //     .pipe(shell('npm start', {
    //         cwd: config.mockServerLocation
    //     }));
});

gulp.task('zvm', ['runConsole', 'watchZvm', 'indexZvmGenerator']);
//endregion

//region MOCK ZVM -----------------------------------------------------------------------//
gulp.task('mockZvm', ['watchZvm', 'mockZvmIndexGenerator', 'runMockServer']);
//endregion

//region DEV DIST -----------------------------------------------------------------------//
gulp.task('copyCommon', ['copyNoMin', 'clean'], function () {
    gulp.src(paths.common + '/scripts/**')
        .pipe(gulp.dest(destinations.dist + '/scripts/common'));

    gulp.src(paths.common + '/i18n/**/**')
        .pipe(gulp.dest(destinations.dist + '/i18n'));

    gulp.src(paths.common + '/styles/**/**')
        .pipe(gulp.dest(destinations.dist + '/styles'));

    return gulp.src(paths.common + '/vendor/**/**')
        .pipe(gulp.dest(destinations.dist + '/vendor'));
});

gulp.task('copyNoMin', ['clean', 'indexZvmGenerator', 'sass'], function () {
    return gulp.src(paths.zvm.app)
        .pipe(gulp.dest(destinations.dist));
});

gulp.task('devDist', ['clean', 'sass',  'bowerCss', 'copyNoMin', 'copyCommon']);
//endregion

//region COMMON RELEASE TASKS -----------------------------------------------------------//
gulp.task('bowerDist', ['clean', 'copyImagesDist', 'copyDist', 'bowerCssDist', 'translateDist', 'assetsDist', 'zvmScriptsDist'], function () {
    return gulp.src(bowerPaths.minJs.concat(vendorPaths.js))
        .pipe(comment())
        .pipe(concat('bower.min.js'))
        .pipe(rev())
        .pipe(gulp.dest(paths.tmp.scripts));
});

gulp.task('translateDist', ['clean'], function () {
    return gulp.src(paths.translate)
        .pipe(gulp.dest(destinations.destTranslate));
});

gulp.task('bowerCssDist', ['clean'], function () {
    return gulp.src(bowerPaths.css.concat(vendorPaths.css))
        .pipe(concat('bower.css'))
        .pipe(rev())
        .pipe(uglifycss())
        .pipe(gulp.dest(paths.tmp.styles));
});

gulp.task('copyDist', ['clean'], function () {
    gulp.src(paths.distCopy)
        .pipe(gulp.dest(destinations.dist));
    return gulp.src(paths.common + '/styles/select2.png')
        .pipe(gulp.dest(destinations.destStyles));
});

gulp.task('copyImagesDist', ['clean'], function () {
    gulp.src(paths.vendorImages)
        .pipe(gulp.dest(destinations.destStylesFonts));
});

gulp.task('assetsDist', ['clean'], function () {
    return gulp.src(paths.distAssets)
        .pipe(gulp.dest(destinations.destAssets));
});

gulp.task('distLoading', ['clean', 'distIndex'], function () {
    return gulp.src(paths.appReplaceCssLink)
        .pipe(inject(gulp.src(paths.tmp.mainCss, {read: false}), {
            ignorePath: '.tmp/',
            addRootSlash: false,
            starttag: '<!--build:css-->',
            endtag: '<!--end build:css-->'
        }))
        .pipe(gulp.dest(destinations.dist));
});

gulp.task('distIndex', ['clean', 'bowerDist'], function () {
    return gulp.src(paths.appIndex)
        .pipe(inject(gulp.src(paths.tmp.allMinJs, {read: false}), {
            ignorePath: '.tmp/',
            addRootSlash: false,
            starttag: '<!--build:js-->',
            endtag: '<!--end build:js-->'
        }))
        .pipe(inject(gulp.src(paths.tmp.allCss, {read: false}), {
            ignorePath: '.tmp/',
            addRootSlash: false,
            starttag: '<!--build:css-->',
            endtag: '<!--end build:css-->'
        }))
        .pipe(gulp.dest(destinations.dist));
});

gulp.task('removeFromProdHtml', ['bowerDist', 'distLoading'], function () {
    return gulp.src(paths.tmp.allMinJs)
        .pipe(inject(gulp.src('', {read: false}), {
            starttag: '<!--remove-->',
            endtag: '<!--end remove-->',
            transform: function () {
                return '<!-- -->';
            }
        }))
        .pipe(gulp.dest(paths.tmp.scripts));
});

gulp.task('generateBuildVersion', generateBuildVersionBeforeRunTasksCollection, function () {
    return gulp.src(paths.loadingBuildVersion)
        .pipe(inject(gulp.src('', {read: false}), {
            starttag: '<!--build version-->',
            endtag: '<!--end build version-->',
            transform: function () {
                return 'ZVR ' + version.substring(0, 3);
            }
        }))
        .pipe(gulp.dest(destinations.dist))
});

gulp.task('copyTmp', ['bowerDist', 'removeFromProdHtml', 'distLoading'], function () {
    gulp.src(paths.tmp.allMinJs)
        .pipe(gulp.dest(destinations.destScripts));
    return gulp.src(paths.tmp.allCss)
        .pipe(gulp.dest(destinations.destStyles))
});

gulp.task('removeTmp', ['bowerDist', 'copyTmp'], function () {
    return del([
        paths.tmp.rootTmp
    ]);
});

gulp.task('clean', function () {//['guiTest'],//todo add gui test when moving to 5.0
    return del([destinations.dist + '/*'], {force: true});
});
//endregion

//region ZVM RELEASE --------------------------------------------------------------------//
gulp.task('templatesDist', ['clean'], function () {
    return gulp.src(paths.distZvm.template[0])
        .pipe(minifyHtml({
            removeEmptyAttributes: true,
            removeAttributeQuotes: false,
            removeComments: false
        }))//removeComments must stay true for build version generate
        .pipe(templateCache(paths.tmp.templatesScript, {module: 'zvmApp', root: 'scripts/', standAlone: false}))
        .pipe(gulp.dest(paths.tmp.scripts));
});

gulp.task('commonTemplatesDist', ['clean'], function () {
    return gulp.src(paths.distZvm.template[1])
        .pipe(minifyHtml({
            removeEmptyAttributes: true,
            removeAttributeQuotes: false,
            removeComments: false
        }))//removeComments must stay true for build version generate
        .pipe(templateCache(paths.tmp.commonTemplatesScript, {
            module: 'zvmApp',
            root: 'scripts/common/',
            standAlone: false
        }))
        .pipe(gulp.dest(paths.tmp.scripts));
});

gulp.task('concatTemplateDist', ['clean', 'templatesDist', 'commonTemplatesDist'], function () {
    return gulp.src([paths.tmp.scripts + paths.tmp.commonTemplatesScript, paths.tmp.scripts + paths.tmp.templatesScript])
        .pipe(concat('templates.js'))
        .pipe(inject(gulp.src('', {read: false}), {
            starttag: '<!--build version-->',
            endtag: '<!--end build version-->',
            transform: function () {
                return 'ZVR ' + version.substring(0, 3);
            }
        }))
        .pipe(rev())
        .pipe(minify())
        .pipe(uglify())
        .pipe(gulp.dest(paths.tmp.scripts))
});

gulp.task('zvmScriptsDist', ['clean'], function () {
    return gulp.src(paths.distZvm.scripts)
        .pipe(concat('scripts.js'))
        .pipe(replace({
            patterns: [
                {match: 'timestamp', replacement: new Date().getTime()},
                {match: 'env', replacement: 'production'}
            ]
        }))
        .pipe(ngAnnotate())
        .pipe(rev())
        .pipe(minify())
        .pipe(uglify())
        .pipe(gulp.dest(paths.tmp.scripts));
});

gulp.task('scssConcatZvmDist', function () {
    return gulp.src(paths.distZvm.scssConcat)
        .pipe(concat('_concat-styles.scss'))
        .pipe(gulp.dest(destinations.destAppStyles));
});

gulp.task('zvmSassDist', ['clean', 'scssConcatZvmDist'], function () {
    return gulp.src(paths.appStylesMainScss)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 1 version']
        }))
        .pipe(uglifycss())
        .pipe(rev())
        .pipe(gulp.dest(paths.tmp.styles));
});

//development task for distribute GUI version (remove .tmp folder)
gulp.task('devRelease', ['generateBuildVersion', 'zvmSassDist', 'removeTmp', 'removeFromProdHtml', 'concatTemplateDist']);

//CI distribute task for build GUI in JENKINS (doesn't delete .tmp folder)
gulp.task('release', ['generateBuildVersion', 'zvmSassDist', 'removeFromProdHtml', 'concatTemplateDist']);

//endregion

//region CONSOLE ------------------------------------------------------------------------//

gulp.task('runConsole', function () {
    var pathDir, env;
    if (argv.console) {
        var nodeWindows = require('node-windows');

        if (!argv.remote) {
            pathDir = paths.devHelper.localConsolePath;
            env = argv.env || 'gui_local';

        } else {
            pathDir = paths.devHelper.remoteConsolePath;
            env = argv.env || 'gui_remote';
        }

        nodeWindows.elevate('ConsoleExecuter.exe ' + (path.normalize(__dirname + pathDir)) + ' ' + (argv.remote ? 'remote ' : 'local ') + env);
    }
});

gulp.task('envs', function () {
    require('child_process').exec('notepad ' + paths.devHelper.environmentsFilePath);
});
//endregion
