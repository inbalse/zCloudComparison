'use strict';

angular.module('zvmApp.core')
    .service('zertoAnalyticsService', function ($rootScope, analyticsEventsTypes, zertoServiceUpdaterFactory, zertoServiceFactory, gaTweaks,
                                                zertoAnalyticsEventsFactory, enums, globalStateModel, zertoEventsCustomDefinitions, tweaksService, zertoLoggerServiceFactory) {

        var zertoAnalyticsService = this,
            isAlreadySubscribed = false,
            isZssp = false,
            isVsphere = false,
            NO_LICENSE_KEY = '0000-0000-0000',
            /*
             *
             'dimension1': 'Site ID',
             'dimension3': 'Account ID',
             'dimension4': 'Site Name',
             'dimension5': 'License Type'
             *
             */
            customVariables = {
                'dimension1': '',
                'dimension3': '',
                'dimension4': '',
                'dimension5': ''
            },

            _listeners = [],
            siteLicenseTypes = _.invert(enums.SiteLicenseType);

        zertoAnalyticsService.start = function () {

            $rootScope.$on(analyticsEventsTypes.ANALYTICS.SERVICE.START, function () {
                if (isAlreadySubscribed) {
                    return;
                }

                isZssp = globalStateModel.data.IsPortal;
                isVsphere = globalStateModel.isvSphere;

                zertoAnalyticsService.subscribeToDataChanges();
                zertoAnalyticsService.registerAnalyticsEvents();
            });

            $rootScope.$on(analyticsEventsTypes.ANALYTICS.SERVICE.STOP, function () {
                if (!isAlreadySubscribed) {
                    return;
                }

                zertoAnalyticsService.unSubscribeToDataChanges();
                zertoAnalyticsService.unregisterAnalyticsEvents();
            });
        };

        zertoAnalyticsService.registerAnalyticsEvents = function () {
            _.forEach(zertoAnalyticsEventsFactory, function (eventHandlerFn, eventName) {
                _listeners.push($rootScope.$on(eventName, function (event, eventData) {
                    eventHandlerFn(customVariables, eventData);
                }));
            });
        };

        zertoAnalyticsService.unregisterAnalyticsEvents = function () {
            _.forEach(_listeners, function (listener) {
                listener();
            });
            _listeners = [];
        };

        zertoAnalyticsService.subscribeToDataChanges = function () {

            updateSiteIdentifierAndHashedLicense();

            //Single request
            zertoServiceFactory
                .GetAboutScreen()
                .then(updateVersion); //Supported by ZSSP

            //Register to Auto-updater
            zertoServiceUpdaterFactory
                .register($rootScope, 'GetSummaryMinimal', [])
                .then(null, null, updateSummaryMinimal);//Supported by ZSSP

            if (!isZssp) {
                zertoServiceUpdaterFactory
                    .register($rootScope, 'GetSummaryScreenInformation', [])
                    .then(null, null, updateSummaryInformation);//NOT Supported by ZSSP
            } else{
                updateZSSPSummaryInformation();
            }

            isAlreadySubscribed = true;
        };

        zertoAnalyticsService.unSubscribeToDataChanges = function () {

            zertoServiceUpdaterFactory
                .unregister($rootScope, 'GetSummaryMinimal', []);

            if (!isZssp) {
                zertoServiceUpdaterFactory
                    .unregister($rootScope, 'GetSummaryScreenInformation', []);
            }

            isAlreadySubscribed = false;
        };

        function updateVersion(aboutScreen) {
            var platformTypes = _.invert(enums.VpgEntityType);

            if (!_.isNullOrUndefined(aboutScreen) && aboutScreen.hasOwnProperty('Version')) {

                try {
                    customVariables[zertoEventsCustomDefinitions.DIMENSIONS.SOURCE_PLATFORM] = platformTypes[globalStateModel.data.VirtualizationProviderType];
                    customVariables[zertoEventsCustomDefinitions.DIMENSIONS.CLIENT_TYPE] = isZssp ? 'ZSSP' : (isVsphere ? 'vSphere' : 'ZVM');

                    ga('set', {
                        appVersion: aboutScreen.Version
                    });
                }
                catch (error) {
                    zertoLoggerServiceFactory.logError('Google Analytics', aboutScreen.Version, error);
                }
            }
        }

        function updateSummaryMinimal(summaryMinimal) {
            customVariables[zertoEventsCustomDefinitions.DIMENSIONS.SITE_NAME] = summaryMinimal.SiteDetails.SiteName;
            customVariables[zertoEventsCustomDefinitions.DIMENSIONS.LICENSE_TYPE] = siteLicenseTypes[summaryMinimal.SiteDetails.LicenseType];
        }

        function updateSummaryInformation(summaryInformation) {
            if (!_.isNullOrUndefined(summaryInformation)) {
                var numOfVpgs =
                    summaryInformation.LocalSiteInfo.ConfiguredSelfVpgs +
                    summaryInformation.RemoteSiteInfo.ConfiguredSelfVpgs +
                    summaryInformation.LocalSiteInfo.Stats.NumberOfVpgsConfigured +
                    summaryInformation.RemoteSiteInfo.Stats.NumberOfVpgsConfigured;

                customVariables[zertoEventsCustomDefinitions.METRICS.NUMBER_OF_ACTIVE_ALERTS] = summaryInformation.State.AlertTips.TotalNumberOfAlerts;
                customVariables[zertoEventsCustomDefinitions.METRICS.NUMBER_OF_PAIRED_SITES] = summaryInformation.State.RemoteConnectionStatus.NumPeers;
                customVariables[zertoEventsCustomDefinitions.METRICS.NUMBER_OF_VPGS] = numOfVpgs;
            }
        }

        function updateSiteIdentifierAndHashedLicense() {
            var googleAnalyticsSiteIdentifier = tweaksService.getTweak(gaTweaks.siteIdentifier, null);

            if (globalStateModel.data) {
                customVariables[zertoEventsCustomDefinitions.DIMENSIONS.SITE_ID] =
                    !_.isNullOrUndefined(googleAnalyticsSiteIdentifier) ? googleAnalyticsSiteIdentifier : globalStateModel.data.SiteIdentifier.SiteGuid;
                customVariables[zertoEventsCustomDefinitions.DIMENSIONS.ZERTO_CUSTOMER_ID] = globalStateModel.data.HashedLicense || NO_LICENSE_KEY;
            }
        }

        function updateZSSPSummaryInformation() {
            customVariables[zertoEventsCustomDefinitions.METRICS.NUMBER_OF_ACTIVE_ALERTS] = 0;
            customVariables[zertoEventsCustomDefinitions.METRICS.NUMBER_OF_PAIRED_SITES] = 0;
            customVariables[zertoEventsCustomDefinitions.METRICS.NUMBER_OF_VPGS] = 0;
        }

        return zertoAnalyticsService;
    });
