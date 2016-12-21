var destinations = require('./destinations')();

module.exports = function () {
    return {
        //GLOBAL
        appIndex: 'app/index.html',
        appReplaceCssLink: ['app/loading.html', 'app/Credentials.html', 'app/db_disconnected_template.html'],
        appScripts: 'app/scripts/**/*.js',
        vendorImages: ['../common/vendor/SlickGrid/images/*.{gif,png}', 'app/bower_components/bootstrap-sass/assets/fonts/bootstrap/*.{ttf,woff,woff2}'],
        appStylesMainScss: 'app/styles/main.scss',
        appScss: ['app/**/*.scss', '../common/**/*.scss', '!app/styles/_concat-styles.scss'],
        distCopy: ['app/*.{ico,png,txt}', 'app/.htaccess', 'app/*.html', 'app/tweaks.json', '!app/index.html'],
        distAssets: 'app/assets/**/*',
        translate: '../common/i18n/**/*',
        loadingBuildVersion: [destinations.dist + '/loading.html', destinations.dist + '/Credentials.html', destinations.dist + '/db_disconnected_template.html'],
        common: '../common',

        devHelper: {
            localConsolePath: '../../../../../bin/UnitTests/debug/RunConsole.bat',
            remoteConsolePath: '../../../../../bin/UnitTests/debug_remote/RunConsole.bat',
            environmentsFilePath: '../../../unittest/Zvm/ZvmConsole/Environments.xml'
        },
        tmp: {
            rootTmp: '.tmp',
            scripts: '.tmp/scripts/',
            styles: '.tmp/styles/',
            allMinJs: '.tmp/scripts/*min.js',
            allCss: '.tmp/styles/*.css',
            mainCss: '.tmp/styles/main*.css',
            templatesScript: 'scripts-templates.js',
            commonTemplatesScript: 'common-templates.js'
        },
        zvm: {
            app: 'app/**/*',
            appHtml: ['app/**/*.html', '../common/scripts/**/*.html'],
            appCommon: ['../common/scripts/**/*.js', '!../common/scripts/**/*.spec.js'],
            appScriptsScss: ['app/scripts/**/*.scss', '../common/scripts/**/*.scss'],
            appScripts: ['app/scripts/**/*.js', '!app/scripts/**/*.spec.js', '!app/scripts/core/services/zerto-service-request-handler-mocker.fct.js'],
            appWatchScripts: ['app/scripts/**/*.js', 'app/scripts/**/*.spec.js', '../common/scripts/**/*.js', '../common/scripts/**/*.spec.js'],
            appMockScripts: ['app/scripts/**/*.js', '!app/scripts/core/services/zerto-service-request-handler.fct.js', '!app/scripts/**/*.spec.js']
        },
        distZvm: {
            template: ['app/scripts/**/*.html', '../common/scripts/**/*.html'],
            scripts: ['app/scripts/**/*.js', '!app/scripts/**/*.spec.js', '../common/scripts/**/*.js', '!../common/scripts/**/*.spec.js'],
            scssConcat: ['app/scripts/**/*.scss', '../common/scripts/**/*.scss']
        }
    }
};
