'use strict';

describe("site settings drop menu View directive", function () {
    var scope, element, analyticsEventsTypes, siteSettingsFactory;

    // beforeEach(module('zvmApp.core'));

    beforeEach(module('templates'));

    beforeEach(module('zvmTest', function ($provide) {
        siteSettingsFactory = jasmine.createSpyObj('siteSettingsFactory', ['showHelpSite', 'showSiteSettings', 'showSupportTicket', 'showRemoteSupport']);
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
        $provide.value('siteSettingsFactory', siteSettingsFactory);
    }));

    beforeEach(module(function ($provide) {
        $provide.value('globalStateModel', {
            data: {
                VirtualizationProviderType: null,
                IsPortal: false
            },
            isvSphere: false
        });
    }));

    beforeEach(inject(function ($rootScope, $compile, _analyticsEventsTypes_) {

        element = $compile('<site-settings-drop-menu></site-settings-drop-menu>')($rootScope.$new());
        analyticsEventsTypes = _analyticsEventsTypes_;

        // directive creates its own scope, need to save it.
        scope = element.scope();

        scope.$digest();
    }));

    it('verify click on site-settings HELP triggers an google analytics event', function () {

        spyOn(scope, '$emit');

        scope.handleMenuItemClicked({
            currentTarget: {
                firstChild: {
                    data: 'Help'
                }
            }
        });

        expect(scope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.SETTINGS.HELP);
    });

    it('verify click to open site-settings triggers an google analytics event', function () {
        var event = {
            currentTarget: {
                firstChild: {
                    data: 'Site Settings'
                }
            }
        };

        spyOn(scope, '$emit');

        scope.handleMenuItemClicked(event);

        expect(scope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.SETTINGS.SITE_SETTINGS);
    });

    it('verify click to open License triggers an google analytics event', function () {
        var event = {
            currentTarget: {
                firstChild: {
                    data: 'License'
                }
            }
        };

        spyOn(scope, '$emit');

        scope.handleMenuItemClicked(event);

        expect(scope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.SETTINGS.LICENSE);
    });

    it('verify click to submit support ticket triggers an google analytics event', function () {
        var event = {
            currentTarget: {
                firstChild: {
                    data: 'Submit Support Ticket'
                }
            }
        };
        spyOn(scope, '$emit');

        scope.handleMenuItemClicked(event);

        expect(scope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.SETTINGS.SUBMIT_SUPPORT_TICKET);
    });

    it('verify click to click remote support triggers an google analytics event', function () {
        var event = {
            currentTarget: {
                firstChild: {
                    data: 'Remote Support'
                }
            }
        };
        spyOn(scope, '$emit');

        scope.handleMenuItemClicked(event);

        expect(scope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.SETTINGS.REMOTE_SUPPORT);
    });

    it('verify click to click About triggers an google analytics event', function () {
        var event = {
            currentTarget: {
                firstChild: {
                    data: 'About'
                }
            }
        };
        spyOn(scope, '$emit');

        scope.handleMenuItemClicked(event);

        expect(scope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.SETTINGS.ABOUT);
    });
});
