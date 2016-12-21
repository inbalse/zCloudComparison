module.exports = function () {

    var cssCollection = [
        '../common/vendor/SlickGrid/slick.grid.css',
        '../common/vendor/ReactVirtualized/css/default.css',
        '../common/vendor/SlickGrid/slick-default-theme.css',
        '../common/vendor/SlickGrid/css/plugins-common.css',
        '../common/vendor/SlickGrid/controls/slick.columnpicker.css',
        '../common/vendor/SlickGrid/plugins/slick.headerbuttons.css',
        '../common/vendor/bootstrap-daterangepicker/daterangepicker-bs3.css'
    ];

    var jsCollection = [
        '../common/vendor/bootstrap-daterangepicker/daterangepicker.js',
        '../common/vendor/ng-bs-daterangepicker/ng-bs-daterangepicker.js',
        '../common/vendor/porthole.min.js',
        '../common/vendor/debugout.js',
        '../common/vendor/SlickGrid/lib/firebugx.js',
        '../common/vendor/SlickGrid/lib/jquery.event.drag-2.2.js',
        '../common/vendor/SlickGrid/slick.core.js',
        '../common/vendor/SlickGrid/slick.formatters.js',
        '../common/vendor/SlickGrid/slick.editors.js',
        '../common/vendor/SlickGrid/plugins/slick.checkboxselectcolumn.js',
        '../common/vendor/SlickGrid/plugins/slick.cellrangedecorator.js',
        '../common/vendor/SlickGrid/plugins/slick.cellrangeselector.js',
        '../common/vendor/SlickGrid/plugins/slick.cellselectionmodel.js',
        '../common/vendor/SlickGrid/plugins/slick.rowselectionmodel.js',
        '../common/vendor/SlickGrid/plugins/ext.headerfilter.js',
        '../common/vendor/SlickGrid/slick.grid.js',
        '../common/vendor/SlickGrid/slick.groupitemmetadataprovider.js',
        '../common/vendor/SlickGrid/slick.dataview.js',
        '../common/vendor/SlickGrid/controls/slick.pager.js',
        '../common/vendor/SlickGrid/controls/slick.columnpicker.js',
        '../common/vendor/SlickGrid/plugins/slick.headerbuttons.js',
        '../common/vendor/Validator/angular-validator.js',
        '../common/vendor/Validator/angular-validator-rules.js',
        '../common/vendor/angular-idle.js',
        '../common/vendor/Flot/jquery.flot.min.js',
        '../common/vendor/Flot/jquery.flot.resize.min.js',
        '../common/vendor/Flot/jquery.flot.threshold.min.js',
        '../common/vendor/Flot/jquery.flot.time.min.js',
        '../common/vendor/ReactVirtualized/react-virtualized.js',
        '../common/vendor/classNames/classNames.js'
    ];

    return {
        css: cssCollection,
        js: jsCollection
    }
};
