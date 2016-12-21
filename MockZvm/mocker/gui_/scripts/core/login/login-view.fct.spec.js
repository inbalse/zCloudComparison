describe("Login View Factory", function () {
    var loginViewFactory, vos, $state, amf, basil, zertoServiceFactory, globalStateModel, rootScope, analyticsEventsTypes;

    beforeEach(function(){
        module('zvmTest');
        // injected properties can be called with underscores for convenience
        inject(function(_loginViewFactory_, _vos_, _amf_, _$state_, _basil_, _zertoServiceFactory_, _globalStateModel_, _$rootScope_, _analyticsEventsTypes_) {
            /* get the angular injections, loginViewFactory to test it and vos to use it */
            loginViewFactory = _loginViewFactory_;
            vos = _vos_;
            amf = _amf_;
            $state = _$state_;
            basil = _basil_;
            zertoServiceFactory = _zertoServiceFactory_;
            globalStateModel = _globalStateModel_;
            rootScope = _$rootScope_;
            analyticsEventsTypes = _analyticsEventsTypes_;
        });

        globalStateModel.data = {};
    });

    it('should have a login function that calls ZVMs LoginToVCenter', function(){
        expect(loginViewFactory.login).toBeDefined();
        spyOn(zertoServiceFactory, 'LoginToVCenter').and.callThrough();
        loginViewFactory.login({username: 'someUserName', password: 'somePassword'});
        expect(zertoServiceFactory.LoginToVCenter).toHaveBeenCalledWith('someUserName', 'somePassword');
    });


    xit('verify that login function triggers an google analytics event', function(){
        spyOn(rootScope, '$emit');
        loginViewFactory.login({username: 'someUserName', password: 'somePassword'});
        expect(rootScope.$emit).toHaveBeenCalledWith(analyticsEventsTypes.GENERAL.LOGIN);
    });

    describe('login success handler', function() {
        beforeEach(function(){
            spyOn(amf, 'addHeader');
            spyOn($state, 'go');
            loginViewFactory.loginSuccess(new vos.SessionIdentifier('intenalIdent'));
        });

        it('should add a header on AMF', function(){
            expect(amf.addHeader).toHaveBeenCalled();
        });

        it('should navigate to main state', function(){
            expect($state.go).toHaveBeenCalledWith('loading');
        });
    });
});
