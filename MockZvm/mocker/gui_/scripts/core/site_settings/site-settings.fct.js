'use strict';

angular.module('zvmApp.core')
    .factory('siteSettingsFactory', function ($uibModal, $translate, globalStateModel, enums, $window, siteSettingsModel, siteDetailsModel,
                                              siteVcdSettingsModel, siteLicenseModel, siteSettingsPublicCloudModel, $q) {
        var siteSettingsFactory = {};
        siteSettingsFactory.settings = {};
        siteSettingsFactory.tabIndex = 0;
        siteSettingsFactory.isScvmm = globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.HyperV;
        siteSettingsFactory.isAws = globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.Aws;
        siteSettingsFactory.isAzure = globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.Azure;
        siteSettingsFactory.isVc = globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.VCVpg || globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.VCvApp;
        siteSettingsFactory.isVcd = globalStateModel.data.VirtualizationProviderType === enums.VpgEntityType.VCDvApp;

        siteSettingsFactory.isPublicCloud = siteSettingsFactory.isAws ||siteSettingsFactory.isAzure;

        siteSettingsFactory.tabs = [
            {title: 'SITE_SETTINGS.SITE_INFO.TAB_TITLE', active: false, visible: true, valid: true},
            {
                title: 'SITE_SETTINGS.PERFORMANCE.TAB_TITLE',
                active: false,
                visible: !siteSettingsFactory.isPublicCloud,
                valid: true
            },
            {title: 'SITE_SETTINGS.POLICIES.TAB_TITLE', active: false, visible: true, valid: true},
            {title: 'SITE_SETTINGS.EMAIL_SETTINGS.TAB_TITLE', active: false, visible: true, valid: true},
            {title: 'SITE_SETTINGS.REPORTS.TAB_TITLE', active: false, visible: true, valid: true},
            {
                title: 'SITE_SETTINGS.COMPATIBILITY.TAB_TITLE',
                active: false,
                visible: !siteSettingsFactory.isPublicCloud,
                valid: true
            },
            {
                title: 'SITE_SETTINGS.CLOUD_SETTINGS.TAB_TITLE',
                active: false,
                visible: !(siteSettingsFactory.isScvmm || siteSettingsFactory.isPublicCloud),
                valid: true
            },
            {title: 'SITE_SETTINGS.LICENSE.TAB_TITLE', active: false, visible: true, valid: true},
            {title: 'SITE_SETTINGS.ABOUT_SITE.TAB_TITLE', active: false, visible: true, valid: true}
        ];

        siteSettingsFactory.BandwidthInLBpsOpts =
        {
            from: 5,
            to: 100,
            step: 1,
            smooth: true,
            dimension: ' ' + $translate.instant('METRICS.M_BIT_PER_SEC')
        };

        //=====================================================================================
        //  global events used for communication between site-settings.ctr and its child controllers
        //=====================================================================================
        siteSettingsFactory.events = {
            VALIDITY: 'site-settings-validity'
        };

        //=====================================================================================
        //  static tab indices
        //=====================================================================================
        siteSettingsFactory.tabsIndices = {
            'SITESETTINGS': 0,
            'PERFORMANCE': 1,
            'POLICIES': 2,
            'EMAILS': 3,
            'SCALING': 4,
            'VERSIONS': 5,
            'VCD': 6,
            'LICENSE': 7,
            'ABOUT': 8
        };

        //region PRIVATE METHODS ==============================================================
        siteSettingsFactory.cloudSettingsChanged = false;
        siteSettingsFactory.private = {
            hourTranslation: $translate.instant('METRICS.HOURS_SHORT'),
            minutesTranslation: $translate.instant('METRICS.MINUTES_SHORT')
        };

        //endregion

        //=====================================================================================
        //  public methods
        //=====================================================================================

        //open dialog
        siteSettingsFactory.showSiteSettings = function (tabSelectedIndex) {

            var promises = [];
            promises.push(siteSettingsModel.load(),siteVcdSettingsModel.load(), siteLicenseModel.load(), siteDetailsModel.load());

            if(siteSettingsFactory.isPublicCloud){
                promises.push(siteSettingsPublicCloudModel.load());
            }

            $q.all(promises).then(function () {
                //load global object
                siteSettingsFactory.tabIndex = tabSelectedIndex;

                siteSettingsFactory.modalInstance = $uibModal.open({
                    templateUrl: 'scripts/core/site_settings/site-settings.html',
                    windowClass: 'siteSettingsModal',
                    controller: 'siteSettingsController',
                    backdrop: 'static',
                    resolve: {
                        tabSelectedIndex: function () {
                            return siteSettingsFactory.tabIndex;
                        }
                    }
                });
            });
        };

        //close dialog
        siteSettingsFactory.closeSiteSettings = function () {
            siteSettingsFactory.modalInstance.close();
        };


        siteSettingsFactory.showHelpSite = function () {
            var prefix = globalStateModel.data.IsPortal ? '/Help/ZSSP/index.html' : '/Help/index.html';
            $window.open(prefix, '_blank');
        };
        return siteSettingsFactory;
    });
