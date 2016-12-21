module.exports = function () {

    var bowerCss = [
        'app/bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css',
        'app/bower_components/ng-slider/dist/css/ng-slider.min.css',
        'app/bower_components/ng-grid/ng-grid.css',
        'app/bower_components/toastr/toastr.css',
        'app/bower_components/select2/select2.css',
        'app/bower_components/angular-ui-select/dist/select.css',
        'app/bower_components/bootstrap-daterangepicker/daterangepicker-bs3.css',
        'app/bower_components/angular-ui-tree/dist/angular-ui-tree.min.css',
        'app/bower_components/isteven-angular-multiselect/angular-multi-select.css',
        'app/bower_components/c3/c3.min.css'
    ];

    var bowerJs = [
        'app/bower_components/jquery/dist/jquery.js',
        'app/bower_components/jquery-ui/jquery-ui.js',
        'app/bower_components/angular/angular.js',
        'app/bower_components/json3/lib/json3.js',
        'app/bower_components/angular-sanitize/angular-sanitize.js',
        'app/bower_components/angular-ui-router/release/angular-ui-router.js',
        'app/bower_components/angular-animate/angular-animate.js',
        'app/bower_components/react/react-with-addons.min.js',
        'app/bower_components/react/react-dom.min.js',
        'app/bower_components/ngReact/ngReact.js',
        'app/bower_components/autofill-event/src/autofill-event.js',
        'app/bower_components/toastr/toastr.js',
        'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'app/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
        'app/bower_components/angular-translate/angular-translate.js',
        'app/bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
        'app/bower_components/base64/base64.js',
        'app/bower_components/angular-mocks/angular-mocks.js',
        'app/bower_components/angular-ui-select/dist/select.js',
        'app/bower_components/angular-messages/angular-messages.js',
        'app/bower_components/lodash/lodash.js',
        'app/bower_components/angular-lodash/angular-lodash.js',
        'app/bower_components/moment/moment.js',
        'app/bower_components/basil.js/build/basil.js',
        'app/bower_components/blob/Blob.js',
        'app/bower_components/FileSaver/FileSaver.js',
        'app/bower_components/ng-slider/src/ng-slider.js',
        'app/bower_components/mockjs/dist/mock.js',
        'app/bower_components/mathjs/dist/math.js',
        'app/bower_components/ui-router-extras/release/ct-ui-router-extras.js',
        'app/bower_components/angular-ui-tree/dist/angular-ui-tree.js',
        'app/bower_components/d3/d3.js',
        'app/bower_components/c3/c3.js',
        'app/bower_components/angulartics/src/angulartics.js',
        'app/bower_components/angulartics-google-analytics/lib/angulartics-ga.js'
    ];

    var bowerMinJs = [
        'app/bower_components/jquery/dist/jquery.min.js',
        'app/bower_components/jquery-ui/jquery-ui.min.js',
        'app/bower_components/angular/angular.min.js',
        'app/bower_components/json3/lib/json3.min.js',
        'app/bower_components/angular-sanitize/angular-sanitize.min.js',
        'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'app/bower_components/angular-animate/angular-animate.min.js',
        'app/bower_components/react/react-with-addons.min.js',
        'app/bower_components/react/react-dom.min.js',
        'app/bower_components/ngReact/ngReact.min.js',
        'app/bower_components/autofill-event/src/autofill-event.js',
        'app/bower_components/toastr/toastr.min.js',
        'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'app/bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        'app/bower_components/angular-translate/angular-translate.min.js',
        'app/bower_components/angular-translate-loader-partial/angular-translate-loader-partial.min.js',
        'app/bower_components/base64/base64.min.js',
        'app/bower_components/angular-mocks/angular-mocks.min.js',
        'app/bower_components/angular-ui-select/dist/select.min.js',
        'app/bower_components/angular-messages/angular-messages.min.js',
        'app/bower_components/lodash/lodash.min.js',
        'app/bower_components/angular-lodash/angular-lodash.js',
        'app/bower_components/moment/min/moment.min.js',
        'app/bower_components/basil.js/build/basil.min.js',
        'app/bower_components/blob/Blob.js',
        'app/bower_components/FileSaver/FileSaver.min.js',
        'app/bower_components/ng-slider/dist/ng-slider.min.js',
        'app/bower_components/mockjs/dist/mock-min.js',
        'app/bower_components/mathjs/dist/math.min.js',
        'app/bower_components/ui-router-extras/release/ct-ui-router-extras.min.js',
        'app/bower_components/angular-ui-tree/dist/angular-ui-tree.min.js',
        'app/bower_components/d3/d3.min.js',
        'app/bower_components/c3/c3.min.js',
        'app/bower_components/angulartics/dist/angulartics.min.js',
        'app/bower_components/angulartics-google-analytics/dist/angulartics-ga.min.js'
    ];


    return {
        js: bowerJs,
        minJs: bowerMinJs,
        css: bowerCss
    }
};
