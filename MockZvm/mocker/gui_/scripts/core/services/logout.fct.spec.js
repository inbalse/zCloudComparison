'use strict';

describe('logout service testing', function () {
    var factory, amf, zertoServiceFactory, globalStateModel, state, rootScope, analyticsEventsTypes;

    beforeEach(function () {

        module('zvmTest');

        inject(function ($injector, $http, basil, _amf_, _zertoServiceFactory_, $window, $state, _globalStateModel_, _$rootScope_, _analyticsEventsTypes_) {
            amf = _amf_;
            zertoServiceFactory = _zertoServiceFactory_;
            globalStateModel = _globalStateModel_;
            state = $state;
            factory = $injector.get('logoutFactory', {'$http': $http, 'basil': basil, 'amf': amf, 'zertoServiceFactory': zertoServiceFactory, '$window': $window, '$state':$state, 'globalStateModel': _globalStateModel_});
            rootScope = _$rootScope_;
            analyticsEventsTypes = _analyticsEventsTypes_;
        });
    });

    it('should have some defined functions to it', function () {
        expect(factory._getMessage()).toBeDefined();
        expect(factory._message).toBeDefined();
        expect(factory._navigateToLogin).toBeDefined();
        expect(factory._httpLogout).toBeDefined();
        expect(factory._httpLogoutWithoutRedirect).toBeDefined();
        expect(factory.logOut).toBeDefined();
    });

    it('should set value to message when _getMessage is called', function () {
        expect(factory._message).toEqual(null);
        factory._getMessage();
        expect(factory._message).not.toEqual(null);
    });

    it('should clear session id from _sessionIdentifies and amf service when clearSession is called', function () {

        amf.addHeader('DSRemoteCredentials', ':test');

        expect(amf.headers[0].DSRemoteCredentials).toBe(':test');
//        console.log(amf.headers)
//        expect(amf.headers[0].DSRemoteCredentials).toBe(':test');
        //There is an issue here with the btoa function
    });

    it('should call get summary minimal when _callServerNow is called', function () {
        spyOn(state, 'go').and.callFake(function(){});
        factory._navigateToLogin();
        expect(state.go).toHaveBeenCalledWith('login');
    });

    it('should call _httpLogoutWithoutRedirect when in portal mode', function () {
        globalStateModel.data = {};
        globalStateModel.data.IsPortal = true;
        globalStateModel.isStandalonePortal = false;
        spyOn(factory, '_httpLogoutWithoutRedirect').and.callFake(function () {
        });
        factory.logOut();
        expect(factory._httpLogoutWithoutRedirect).toHaveBeenCalled();
    });

    it('should call _httpLogout when in standalone portal mode', function () {
        globalStateModel.data = {};
        globalStateModel.data.IsPortal = true;
        globalStateModel.isStandalonePortal = true;
        spyOn(factory, '_httpLogout').and.callFake(function () {
        });
        factory.logOut();
        expect(factory._httpLogout).toHaveBeenCalled();
    });

    it('should call clearSession and _callServerNow when regular standalone gui mode', function () {
        globalStateModel.data = {};
        globalStateModel.data.IsPortal = false;
        globalStateModel.isStandalonePortal = false;
        spyOn(globalStateModel, 'clearSession').and.callFake(function () {
        });
        spyOn(factory, '_navigateToLogin').and.callFake(function () {
        });
        factory.logOut();
        expect(globalStateModel.clearSession).toHaveBeenCalled();
        expect(factory._navigateToLogin).toHaveBeenCalled();
    });

    it('verify that logout function triggers an google analytics event', function(){
        globalStateModel.data = {};
        globalStateModel.data.IsPortal = false;
        globalStateModel.isStandalonePortal = false;
        spyOn(globalStateModel, 'clearSession').and.callFake(function () {});
        spyOn(factory, '_navigateToLogin').and.callFake(function () {});
        spyOn(rootScope, '$emit');

        factory.logOut();
        expect(rootScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.GENERAL.LOGOUT);
    });
});
