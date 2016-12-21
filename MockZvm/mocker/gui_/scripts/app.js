'use strict';
// set up zlog
/* jshint ignore:start */
var keys = [];
document.onkeydown = function (evt) {
    var key = evt.keyCode;
    keys[key] = true;
    if (keys[16] && keys[17] && keys[76]) {
        zlog.downloadLog();
    }
};

document.onkeyup = function (evt) {
    var key = evt.keyCode;
    keys[key] = false;
};

window.zlog = new debugout();

/* jshint ignore:end */

//define sub modules
angular.module('zvmApp.filters', []);
angular.module('zvmApp.services', []);
angular.module('zvmApp.directives', []);
angular.module('zvmApp.components', []);
angular.module('zvmApp.core', []);
angular.module('zvmApp.models', []);
angular.module('zvmApp.constant', []);
angular.module('zvmApp.dataCollection', []);

var app = angular
    .module('zvmApp', [
        'angular-lodash',
        'ngSanitize',
        'ui.bootstrap',
        'ui.router',
        'ui.select',
        'pascalprecht.translate',
        'zvmApp.filters',
        'zvmApp.services',
        'zvmApp.directives',
        'zvmApp.components',
        'zvmApp.core',
        'zvmApp.models',
        'zvmApp.constant',
        'zvmApp.dataCollection',
        'ui.bootstrap.progressbar',
        'ngSlider',
        'ui.bootstrap.tpls',
        'react',
        'ngAnimate',
        'ct.ui.router.extras',
        'ui.tree',
        'ngBootstrap',
        'ngMessages',
        'validator.rules',
        'ngIdle',
        'angulartics',
        'angulartics.google.analytics'
    ]);
////override modal template

//registering toastr as injectable
app.value('toastr', toastr);// jshint ignore:line

app.config(function ($provide, $stateProvider, $urlRouterProvider, $httpProvider, $translateProvider,
                     $translatePartialLoaderProvider, $compileProvider, KeepaliveProvider, IdleProvider, $analyticsProvider) {

    if ('@@env' === 'production') {
        $compileProvider.debugInfoEnabled(false);
    }

    // initialize keepalive for portal
    KeepaliveProvider.interval(5);
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(0); // in seconds

    var wasTimestampChanged = '@@timestamp' !== ('@' + '@' + 'time' + 'stamp');

    $provide.decorator('$exceptionHandler', function ($delegate) {
        return function (exception, cause) {
            var message = 'Error: ';

            if (exception.hasOwnProperty('stack')) {
                message = exception.stack + ',\n';
            } else {
                message += exception + ',\n';
            }

            zlog.log({
                date: new Date().toISOString(),
                operation: '$exceptionHandler',
                protocol: '$provide',
                type: 'decorator',
                content: 'message : ' + message + ' cause : ' + cause
            });

            if (!wasTimestampChanged) { // we do not want to pop the alert in production
                $delegate(exception, cause);
            }

        };
    });

    $translateProvider.useSanitizeValueStrategy('sanitize');

    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-amf; charset=UTF-8';
    $httpProvider.defaults.headers.common['Accept'] = 'application/x-amf; charset=UTF-8'; // jshint ignore:line

    var states = [];
    states.push({name: 'loading', url: '/loading', templateUrl: 'scripts/core/loading/loading-view.html'});
    //if you change login or license state name you need to find reference for this state in code and change them as well
    states.push({name: 'login', url: '/login', templateUrl: 'scripts/core/login/login-view.html'});
    states.push({name: 'license', url: '/license', templateUrl: 'scripts/core/license/license-view.html'});

    // Root of main app states
    states.push({
        name: 'main', url: '/main', templateUrl: 'scripts/core/main/main-view.html',
        controller: 'mainViewController', deepStateRedirect: true, abstract: true,
        resolve: {
            session: ['loadingViewService', 'globalStateModel', 'zNotificationService', 'zNotificationConstant', function (loadingViewService, globalStateModel, zNotificationService, zNotificationConstant) {
                //check if property IsSessionValid exist (bug 26207)
                if (!_.isNullOrUndefined(globalStateModel.data) && !globalStateModel.data.hasOwnProperty('IsSessionValid')) {
                    var notificationKey = zNotificationConstant.LOGIN_VIEW_NOTIFICATION,
                        notifier = zNotificationService.getNotifier(notificationKey);

                    loadingViewService.getInitialSessionValidation().then(function (result) {
                        globalStateModel.init(result);
                        notifier.notify({value: false, key: notificationKey});
                    });
                }
            }]
        }
    });

    //------------  DASHBOARD  -----------------------
    states.push({
        name: 'main.dashboard', url: '/dashboard', templateUrl: 'scripts/core/dashboard/dashboard.html',
        controller: 'dashboardController'
    });

    //------------  VPGs  -----------------------
    states.push({
        name: 'main.vpgs',
        url: '/vpgs',
        templateUrl: 'scripts/core/vpgs/vpgs-container.html',
        controller: 'vpgsContainerController',
        controllerAs: 'vpgsCtrl'
    });
    states.push({
        name: 'main.vpgs.list',
        url: '/list',
        templateUrl: 'scripts/core/vpgs/list/vpgs-list.html',
        controller: 'vpgsListController',
        controllerAs: 'vpgsListCtrl',
        isCardView: false
    });
    states.push({
        name: 'main.vpgs.cards',
        url: '/cards',
        templateUrl: 'scripts/core/vpgs/cards/vpgs-cards.html',
        controller: 'vpgsCardsController',
        controllerAs: 'vpgsCardsCtrl',
        isCardView: true
    });

    //------------  VPG Details  -----------------------
    states.push({
        name: 'main.vpg_details', url: '/vpg_details?id', templateUrl: 'scripts/core/vpg_details/vpg-details.html',
        controller: 'vpgDetailsController'
    });

    states.push({
        name: 'main.vpg_details.status',
        url: '/status',
        templateUrl: 'scripts/core/vpg_details/tabs/status/vpg-status.html',
        controller: 'vpgStatusController'
    });

    states.push({
        name: 'main.vpg_details.vms',
        url: '/vms',
        templateUrl: 'scripts/core/vpg_details/tabs/vms/vpg-vms.html',
        controller: 'vpgVMsController'
    });
    states.push({
        name: 'main.vpg_details.sites',
        url: '/sites',
        templateUrl: 'scripts/core/vpg_details/tabs/sites/vpg-sites.html',
        controller: 'vpgSitesController'
    });
    states.push({
        name: 'main.vpg_details.parameters',
        url: '/parameters',
        templateUrl: 'scripts/core/vpg_details/tabs/parameters/vpg-parameters.html',
        controller: 'vpgParametersController'
    });

    $urlRouterProvider.when('/main/vpg_details?id', '/main/vpg_details/status?id');

    //------------  vSphere Quick Starts  -----------------------
    states.push({
        name: 'main.vm_quick_start',
        url: '/vm_quick_start',
        templateUrl: 'scripts/core/quick_start/vm-quick-start.html'
    });
    //------------  VRA Details  -----------------------
    states.push({
        name: 'main.vra_details', url: '/vra_details?id&name', templateUrl: 'scripts/core/vra_details/vra-details.html',
        controller: 'vraDetailsController'
    });
    states.push({
        name: 'main.vra_details.status',
        url: '/status',
        templateUrl: 'scripts/core/vra_details/tabs/status/vra-status.html',
        controller: 'vraStatusController'
    });
    states.push({
        name: 'main.vra_details.vpgs',
        url: '/sites',
        templateUrl: 'scripts/core/vra_details/tabs/vpgs/vra-vpgs.html',
        controller: 'vraVPGsController'
    });
    states.push({
        name: 'main.vra_details.vms',
        url: '/vms',
        templateUrl: 'scripts/core/vra_details/tabs/vms/vra-vms.html',
        controller: 'vraVMsController'
    });
    states.push({
        name: 'main.vra_details.parameters',
        url: '/parameters',
        templateUrl: 'scripts/core/vra_details/tabs/parameters/vra-parameters.html',
        controller: 'vraParametersController'
    });

    $urlRouterProvider.when('/main/vra_details?id&name', '/main/vra_details/status?id&name');
    //------------  VMs  -----------------------
    states.push({name: 'main.vms', url: '/vms', templateUrl: 'scripts/core/vms/vms-list.html'});

    //------------  SETUP  -----------------------

    states.push({
        name: 'main.setup', url: '/setup', templateUrl: 'scripts/core/setup/setup.html',
        controller: 'setupController', deepStateRedirect: true
    });
    states.push({
        name: 'main.setup.vras',
        url: '/vras?quickInstall',
        templateUrl: 'scripts/core/vra_list/vra-list.html'
    });
    states.push({
        name: 'main.setup.datastores',
        url: '/datastores',
        templateUrl: 'scripts/core/datastore/datastore.html'
    });
    states.push({
        name: 'main.setup.repositories',
        url: '/repositories',
        templateUrl: 'scripts/core/repository_list/repository-list.html'
    });

    //------------  SITES  -----------------------
    states.push({name: 'main.sites', url: '/sites?quickPair', templateUrl: 'scripts/core/sites_list/sites-list.html'});

    //------------  MONITORING  -----------------------
    $urlRouterProvider.when('/main/monitoring', '/main/monitoring/alerts');
    states.push({
        name: 'main.monitoring', url: '/monitoring', templateUrl: 'scripts/core/monitoring/monitoring.html',
        controller: 'monitoringController', deepStateRedirect: true
    });
    states.push({
        name: 'main.monitoring.alerts',
        url: '/alerts',
        templateUrl: 'scripts/core/alerts_list/alerts-list.html'
    });
    states.push({
        name: 'main.monitoring.events',
        url: '/events',
        templateUrl: 'scripts/core/events_list/events-list.html'
    });
    states.push({name: 'main.monitoring.tasks', url: '/tasks', templateUrl: 'scripts/core/tasks_list/tasks-list.html'});


    //------------ OFFSITE BACKUPS ------------------
    $urlRouterProvider.when('/main/offsite', '/main/offsite/vpgs');
    states.push({
        name: 'main.offsite', url: '/offsite', templateUrl: 'scripts/core/offsite_backup/offsite-backup.html',
        controller: 'offsiteController', deepStateRedirect: true
    });
    states.push({name: 'main.offsite.vpgs', url: '/vpgs', templateUrl: 'scripts/core/offsite_vpgs/offsite-vpgs.html'});
    states.push({name: 'main.offsite.vms', url: '/vms', templateUrl: 'scripts/core/offsite_vms/offsite-vms.html'});

    //------------  REPORTS  -----------------------
    states.push({
        name: 'main.reports', url: '/reports', templateUrl: 'scripts/core/reports/reports.html',
        controller: 'reportsController', deepStateRedirect: true
    });
    states.push({
        name: 'main.reports.outboundprotection',
        url: '/outboundprotection',
        templateUrl: 'scripts/core/reports/reports_views/outbound-protection-over-time.html',
        controller: 'outboundProtectionOverTimeController'
    });
    states.push({
        name: 'main.reports.protectionovertime',
        url: '/protectionovertime',
        templateUrl: 'scripts/core/reports/reports_views/protection-over-time-by-zorg.html',
        controller: 'protectionOverTimeByZorgController'
    });
    states.push({
        name: 'main.reports.recoveryreports',
        url: '/recoveryreports',
        templateUrl: 'scripts/core/reports/reports_views/recovery-reports.html',
        controller: 'recoveryReportsController'
    });
    states.push({
        name: 'main.reports.resourcereports',
        url: '/resourcereports',
        templateUrl: 'scripts/core/reports/reports_views/resource-reports.html',
        controller: 'resourceReportsController'
    });
    states.push({
        name: 'main.reports.usage',
        url: '/usage',
        templateUrl: 'scripts/core/reports/reports_views/usage-report.html',
        controller: 'usageReportController'
    });
    states.push({
        name: 'main.reports.vpgperformance',
        url: '/vpgperformance',
        templateUrl: 'scripts/core/reports/reports_views/vpg-performance.html',
        controller: 'vpgPerformanceController'
    });

    angular.forEach(states, function (state) {
        $stateProvider.state(state);
    });

    $urlRouterProvider.otherwise('loading');

    $translatePartialLoaderProvider.addPart('global');
    $translatePartialLoaderProvider.addPart('login');
    $translatePartialLoaderProvider.addPart('navigation');
    $translatePartialLoaderProvider.addPart('monitoring');
    $translatePartialLoaderProvider.addPart('failover_button');
    $translatePartialLoaderProvider.addPart('actions_button');
    $translatePartialLoaderProvider.addPart('alerts_tooltip');
    $translatePartialLoaderProvider.addPart('tasks');
    $translatePartialLoaderProvider.addPart('pair_sites');
    $translatePartialLoaderProvider.addPart('support_ticket');
    $translatePartialLoaderProvider.addPart('alerts_status');
    $translatePartialLoaderProvider.addPart('site_settings');
    $translatePartialLoaderProvider.addPart('site_settings_drop');
    $translatePartialLoaderProvider.addPart('tasks_summary');
    $translatePartialLoaderProvider.addPart('vra_install');
    $translatePartialLoaderProvider.addPart('create_checkpoint');
    $translatePartialLoaderProvider.addPart('vra_list');
    $translatePartialLoaderProvider.addPart('license');
    $translatePartialLoaderProvider.addPart('busy_overlay');
    $translatePartialLoaderProvider.addPart('reports');
    $translatePartialLoaderProvider.addPart('repository_list');
    $translatePartialLoaderProvider.addPart('setup');
    $translatePartialLoaderProvider.addPart('enums');
    $translatePartialLoaderProvider.addPart('vra_edit');
    $translatePartialLoaderProvider.addPart('online_help');
    $translatePartialLoaderProvider.addPart('alerts_list');
    $translatePartialLoaderProvider.addPart('tooltips');
    $translatePartialLoaderProvider.addPart('advanced_journal_settings');
    $translatePartialLoaderProvider.addPart('create_vpg');
    $translatePartialLoaderProvider.addPart('create_vpg/steps/create_vpg_initial');
    $translatePartialLoaderProvider.addPart('create_vpg/steps/create_vpg_select_vms');
    $translatePartialLoaderProvider.addPart('create_vpg/steps/create_vpg_recovery');
    $translatePartialLoaderProvider.addPart('create_vpg/steps/create_vpg_replication');
    $translatePartialLoaderProvider.addPart('create_vpg/steps/create_vpg_storage');
    $translatePartialLoaderProvider.addPart('create_vpg/steps/create_vpg_summary');
    $translatePartialLoaderProvider.addPart('create_vpg/steps/create_vpg_nics');
    $translatePartialLoaderProvider.addPart('z_wizard');
    $translatePartialLoaderProvider.addPart('datastores');
    $translatePartialLoaderProvider.addPart('edit_columns');
    $translatePartialLoaderProvider.addPart('advanced_vm_replication_settings');
    $translatePartialLoaderProvider.addPart('grids');
    $translatePartialLoaderProvider.addPart('cards');
    $translatePartialLoaderProvider.addPart('edit_vm');
    $translatePartialLoaderProvider.addPart('edit_volumes');
    $translatePartialLoaderProvider.addPart('create_vpg/steps/create_vpg_backup');
    $translatePartialLoaderProvider.addPart('edit_nic');
    $translatePartialLoaderProvider.addPart('boot_order');
    $translatePartialLoaderProvider.addPart('vpg_details');
    $translatePartialLoaderProvider.addPart('offsite_backup');
    $translatePartialLoaderProvider.addPart('sites_list');
    $translatePartialLoaderProvider.addPart('unpair_sites');
    $translatePartialLoaderProvider.addPart('edit_rep');
    $translatePartialLoaderProvider.addPart('recovery_wizard');
    $translatePartialLoaderProvider.addPart('remote_support');
    $translatePartialLoaderProvider.addPart('journal_limit');
    $translatePartialLoaderProvider.addPart('stop_failover_test');
    $translatePartialLoaderProvider.addPart('configure_checkpoint');
    $translatePartialLoaderProvider.addPart('restore_wizard');
    $translatePartialLoaderProvider.addPart('restore_volumes');
    $translatePartialLoaderProvider.addPart('restore_edit_volume');
    $translatePartialLoaderProvider.addPart('restore_nics');
    $translatePartialLoaderProvider.addPart('restore_edit_nic');
    $translatePartialLoaderProvider.addPart('delete_vpg');
    $translatePartialLoaderProvider.addPart('clone_vpg');
    $translatePartialLoaderProvider.addPart('dashboard');
    $translatePartialLoaderProvider.addPart('file_browse');
    $translatePartialLoaderProvider.addPart('vra_details');
    $translatePartialLoaderProvider.addPart('public_cloud_network_settings');
    $translatePartialLoaderProvider.addPart('vra_change_password');
    $translatePartialLoaderProvider.addPart('vra_upgrade');
    $translatePartialLoaderProvider.addPart('change_vm_recovery_vra');
    $translatePartialLoaderProvider.addPart('zssp_create_vpg');
    $translatePartialLoaderProvider.addPart('configure_paired_site_routing');
    $translatePartialLoaderProvider.addPart('v_sphere_tab');
    $translatePartialLoaderProvider.addPart('select_vpg');
    $translatePartialLoaderProvider.addPart('recovery_folder_vm_settings');
    $translatePartialLoaderProvider.addPart('tasks_list');
    $translatePartialLoaderProvider.addPart('flr');

    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: 'i18n/{part}/{lang}.json'
    })
        .preferredLanguage('en');


    //Google Analytics
    $analyticsProvider.firstPageview(true);
    /* Records pages that don't use $state or $route */
    $analyticsProvider.withAutoBase(true);
    /* Records full path */
    $analyticsProvider.trackExceptions(true);
    /* Automatic exception tracking */
});

var windowProxy;
app.run(function ($rootScope, $location, $translate, $uibModalStack, tweaksService, globalStateModel, $state, basil, authApiService, zertoApi, zertoAnalyticsService) {
    zertoApi.start();
    zertoAnalyticsService.start();

    //tweaksService.getTweakOnceLoaded('t_ZertoApiUsername', 'administrator').then(function (result) {
    //    var tUsername = result;
    //    var tPassword = tweaksService.getTweak('t_ZertoApiPassword', 'zertodata');
    //
    //    authApiService.auth(tUsername, tPassword);
    //});

    var timestamp = '@@timestamp';
    if (basil.get('timestamp') !== timestamp) {
        localStorage.clear();
        zlog.clear();
        basil.set('timestamp', timestamp);
    }

    zlog.log({
        date: new Date().toISOString(),
        operation: 'run',
        protocol: '$location',
        type: 'app',
        content: 'initial location :' + $location.absUrl()
    });

    if ($location.search().type === 'IFrame') {
        globalStateModel.isIframe = true;
        globalStateModel.iframeData = $location.search();
    }
    if ($location.search().vpgDetails === 'true') {
        globalStateModel.isVpgDetailsIframe = true;
    }
    if ($location.search().type === 'Portal') {
        globalStateModel.setIsPortalFlag(true);
        globalStateModel.portalData = $location.search();
        globalStateModel.isStandalonePortal = !!(globalStateModel.portalData.hasOwnProperty('sessionId') && globalStateModel.portalData.sessionId);
        //console.log(globalStateModel.portalData);
    }

    var qsTemp = document.location.search.replace(/(^\?)/, '').split('&').map(function (n) {
        return n = n.split('='), this[n[0]] = n[1], this;
    }.bind({}))[0];
    if (qsTemp.screenType !== undefined) {
        globalStateModel.isvSphere = true;
        globalStateModel.vSphereData = qsTemp;
    } else {
        globalStateModel.isvSphere = false;
    }

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

        //Close modals on state change
        $uibModalStack.dismissAll();

        //if user logout and try to go back (with browser button back)
        if (fromState.name === 'login') {
            //check if session id is empty
            if (globalStateModel.getSessionId() === '00000000-0000-0000-0000-000000000000') {
                $state.go('login');
            }
        }

        if (toState.name !== 'loading' && !globalStateModel.data) {
            //save the previous state of the navigation
            globalStateModel.previousState = toState.name;
            globalStateModel.previousParams = toParams;

            //todo create better setter and not (!globalStateModel.data) is dad indicator
            //default isPortal set if login via url
            globalStateModel.setIsPortalFlag(false);

            //stop the change from happening
            event.preventDefault();
            //start init proccess
            $state.go('loading');
        } else if (globalStateModel.data && globalStateModel.isIframe && toState.name === 'main.vpg_details.status' && fromState.name !== 'loading') {
            //meaning we are
            //already passed the loading state
            //and we are navigating to VPG Details screen
            if (globalStateModel.isVpgDetailsIframe !== true) {
                windowProxy.post([
                    {type: 'iframeNavigateToDetailsScreen', value: {type: 'VPG', id: toParams.id}}
                ]);
                event.preventDefault();
            }
        }

        // $urlRouterProvider.when('/main/vpgs', '/main/vpgs/list');//TODO: change to grid

        if (_.isEqual(toState.name, 'main.vpgs')) {
            event.preventDefault();

            var lastVpgsView = basil.get('last_vpgs_view');
            if (!_.isNullOrUndefined(lastVpgsView)) {
                $state.go(lastVpgsView);
                return;
            }

            $state.go('main.vpgs.list');
        }
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState) { //, toParams, fromState, fromParams) {
        if (_.isEqual(toState.name, 'main.vpgs.cards') || _.isEqual(toState.name, 'main.vpgs.list')) {
            basil.set('last_vpgs_view', toState.name);
        }

    });

    $translate.use($location.search().lang);

    tweaksService.loadTweaks();

    //iframe integration
    window.onMessage = function (value) {
        $state.go(value.data[0]);
    };
});
//region Iframe integration
/* jshint ignore:start */
//===============================================================

function getParameterByName(name) {
    name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
window.onload = function () {
    var path = getParameterByName('referer') + '/proxy.html';
    windowProxy = new Porthole.WindowProxy(path);
    windowProxy.addEventListener(window.onMessage);
};

// ===============================================================
/* jshint ignore:end */
//endregion

angular.module('zvmApp')
    .controller('appContainerController', function ($scope, $rootScope, globalStateModel) {

        $scope.$on('IsPortalChanged', function () {
            $('body').addClass('portalContainer');
        });

        if (globalStateModel.isIframe) {
            $scope.appContainerClass = 'iframeAppContainer appContainer';
        } else {
            $scope.appContainerClass = 'appContainer';
        }
    });
