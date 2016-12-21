'use strict';

angular.module('zvmApp.core')
    .directive('siteSettingsDropMenu', function (siteSettingsFactory, supportTicketFactory, remoteSupportFactory, logoutFactory,
                                                 globalStateModel, $window, summaryMinimalModel, analyticsEventsTypes) {
        return{
            templateUrl: 'scripts/core/site_settings_drop_menu/site-settings-drop-menu.html',
            restrict: 'E',
            scope: true,
            link: function (scope) {
                scope.buttonClass = 'siteSettingsButtonUp';
                scope.showMenu = false;
                scope.state = 'siteSettingsMenu';
                scope.isPortal = globalStateModel.data.IsPortal;
                scope.isVsphare = globalStateModel.isvSphere;
                scope.createSupportTicketEnabled = globalStateModel.data.IsCreateSupportTicketEnabled;

                summaryMinimalModel.register(scope).then(null, null, function (result) {
                    scope.isManageSiteEnabled = result.SummaryState.IsManageSiteSettingsEnabled;
                });

                scope.handleButtonClick = function () {
                    showHideMenu(!scope.showMenu);
                };

                scope.helpEnabled = false;

                scope.handleMenuItemClicked = function ($event) {
                    showHideMenu(false);
                    switch ($event.currentTarget.firstChild.data) {
                        case 'Help':
                            scope.$emit(analyticsEventsTypes.SETTINGS.HELP);
                            siteSettingsFactory.showHelpSite();
                            break;
                        case 'Open Interface in Browser':
                            $window.open('/', '_blank');
                            break;
                        case 'Site Settings':
                            scope.$emit(analyticsEventsTypes.SETTINGS.SITE_SETTINGS);
                            siteSettingsFactory.showSiteSettings(siteSettingsFactory.tabsIndices.SITESETTINGS);
                            break;
                        case 'License':
                            scope.$emit(analyticsEventsTypes.SETTINGS.LICENSE);
                            siteSettingsFactory.showSiteSettings(siteSettingsFactory.tabsIndices.LICENSE);
                            break;
                        case 'Submit Support Ticket':
                            scope.$emit(analyticsEventsTypes.SETTINGS.SUBMIT_SUPPORT_TICKET);
                            supportTicketFactory.showSupportTicket();
                            break;
                        case 'Remote Support':
                            scope.$emit(analyticsEventsTypes.SETTINGS.REMOTE_SUPPORT);
                            remoteSupportFactory.showRemoteSupport();
                            break;
                        case 'About':
                            scope.$emit(analyticsEventsTypes.SETTINGS.ABOUT);
                            siteSettingsFactory.showSiteSettings(siteSettingsFactory.tabsIndices.ABOUT);
                            break;
                        case 'Refresh':
                            location.reload();
                            break;
                        case 'Log Out':
                            logoutFactory.logOut();
                            break;
                        default:
                            break;
                    }
                };

                scope.handleMouseLeave = function () {
                    showHideMenu(false);
                };

                function showHideMenu(value) {
                    if (value) {
                        scope.buttonClass = 'siteSettingsButtonSelected';
                        scope.showMenu = true;
                    } else {
                        scope.buttonClass = 'siteSettingsButtonUp';
                        scope.showMenu = false;
                    }
                }
            }
        };
    });
