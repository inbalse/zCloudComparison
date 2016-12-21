describe('zertoServiceWatcherFactory', function () {
    var factory, modal, errorsFactory, guiVisibleException, state, timeout, zAlertFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_$uibModal_, _$state_, _$timeout_, _zAlertFactory_, _zertoServiceWatcherFactory_, _guiVisibleException_) {
        factory = _zertoServiceWatcherFactory_;
        modal = _$uibModal_;
        state = _$state_;
        guiVisibleException = _guiVisibleException_;
        timeout = _$timeout_;
        zAlertFactory = _zAlertFactory_;

        errorsFactory = (function () {
            function newError(statusCode, errorString) {
                return {statusCode: statusCode, faultString: errorString}
            }

            return {
                invalid_creds: newError(null, guiVisibleException.INVALID_USERNAME_OR_PASSWORD_MESSAGE),
                license: newError(null, guiVisibleException.LICENSE_EXCEPTION),
                permission: newError(null, guiVisibleException.PERMISSION_DENIED),
                session_expired: newError(null, guiVisibleException.SESSION_EXPIRED),
                undetermined_session: newError(null, guiVisibleException.UNDETERMINED_SESSION),
                session_invalid: newError(null, guiVisibleException.INVALID_SESSION_MESSAGE),
                vcenter_session_expired: newError(null, guiVisibleException.VCENTER_SESSION_EXPIRED),
                zorg_session_expired: newError(null, guiVisibleException.ZORG_SESSION_EXPIRED),
                zorg_session_invalid: newError(null, guiVisibleException.ZORG_SESSION_INVALID),
                zssp_session_expired: newError(null, guiVisibleException.ZSSP_SESSION_EXPIRED),
                status_code_0: newError(0, 'statuscode0'),
                status_code_404: newError(404, 'statuscode404'),
                status_code_500: newError(500, 'statuscode500')
            }
        })();

        spyOn(zAlertFactory, 'fail');
        spyOn(state, 'go');
        spyOn(factory, 'addFaultToCount').and.callThrough();
    }));


    it('should contain defined functions and variables', function () {
        expect(factory._accumulatedFaults).toEqual(0);
        expect(factory._accumulatedTimeMS).toEqual(0);
        expect(factory._lastTimeMS).toEqual(0);
        expect(factory._timeThreshold).toEqual(35000);
        expect(factory._faultsThreshold).toEqual(6);
        expect(factory.serviceFaultHandler).toBeDefined();
        expect(factory._handleClose).toBeDefined();
        expect(factory.addFaultToCount).toBeDefined();
    });

    it('should correctly respond to fail strings', function () {
        factory.serviceFaultHandler(errorsFactory.invalid_creds);

        expect(zAlertFactory.fail).not.toHaveBeenCalled();
        expect(state.go).not.toHaveBeenCalled();
        expect(factory.addFaultToCount).not.toHaveBeenCalled();

    });

    it('should correctly respond to invalid_creds error', function () {
        factory.serviceFaultHandler(errorsFactory.invalid_creds);

        expect(zAlertFactory.fail).not.toHaveBeenCalled();
        expect(state.go).not.toHaveBeenCalled();
        expect(factory.addFaultToCount).not.toHaveBeenCalled();
    });

    it('should correctly respond to license_ex error', function () {
        factory.serviceFaultHandler(errorsFactory.license);

        expect(state.go).toHaveBeenCalledWith('license');
    });

    it('should correctly respond to license_ex error with portal', function () {
        factory.serviceFaultHandler(errorsFactory.license, true);

        expect(zAlertFactory.fail).toHaveBeenCalled();
    });

    it('should correctly respond to vcenter session expired error', function () {
        factory.serviceFaultHandler(errorsFactory.vcenter_session_expired);

        expect(state.go).toHaveBeenCalledWith('login');
    });

    it('should correctly respond to undetermined session error', function () {
        factory.serviceFaultHandler(errorsFactory.undetermined_session);

        expect(state.go).toHaveBeenCalledWith('login');
    });

    it('should correctly respond to session_invalid error', function () {
        factory.serviceFaultHandler(errorsFactory.session_invalid);

        expect(state.go).toHaveBeenCalledWith('login');
    });

    it('should correctly respond to session expired error', function () {
        factory.serviceFaultHandler(errorsFactory.session_expired);

        expect(state.go).toHaveBeenCalledWith('login');
    });

    it('should correctly respond to ZORG_SESSION_INVALID error', function () {
        factory.serviceFaultHandler(errorsFactory.zorg_session_expired);

        expect(zAlertFactory.fail).toHaveBeenCalled();
    });

    it('should correctly respond to ZORG_SESSION_EXPIRED error', function () {
        factory.serviceFaultHandler(errorsFactory.zorg_session_invalid);

        expect(zAlertFactory.fail).toHaveBeenCalled();
    });

    it('should correctly respond to ZSSP_SESSION_EXPIRED error', function () {
        factory.serviceFaultHandler(errorsFactory.zssp_session_expired);

        expect(state.go).toHaveBeenCalledWith('login');
    });

    it('should addFaultToCount in case of statuses 0, 404 and 500', function () {
        factory.serviceFaultHandler(errorsFactory.status_code_0);
        expect(factory.addFaultToCount).toHaveBeenCalled();
        factory.serviceFaultHandler(errorsFactory.status_code_404);
        expect(factory.addFaultToCount).toHaveBeenCalled();
        factory.serviceFaultHandler(errorsFactory.status_code_500);
        expect(factory.addFaultToCount).toHaveBeenCalled();
    });

    it('should call zAlert in case of time and error counts exceeds the defaults', function () {
        for (var i = 0; i < factory._faultsThreshold; i++) {
            factory.addFaultToCount();
        }

        expect(zAlertFactory.fail).toHaveBeenCalled();
    });

    it('should not call zAlert in case of time and error counts exceeds the defaults - not enough errors case, but enough threshold', function () {
        for (var i = 0; i < factory._faultsThreshold - 1; i++) {
            factory.addFaultToCount();
        }

        expect(zAlertFactory.fail).not.toHaveBeenCalled();
    });

    it('should not call zAlert in case of time and error counts exceeds the defaults - enough counts, but not in time threshold', function () {

        for (var i = 0; i < factory._faultsThreshold - 1; i++) {
            factory.addFaultToCount();
        }

        timeout(factory.addFaultToCount, factory._timeThreshold);
        timeout.flush(factory._timeThreshold - 1);

        expect(zAlertFactory.fail).not.toHaveBeenCalled();
    });

    it('should not call zAlert in case of time and error counts exceeds the defaults - not enough counts and not in time threshold', function () {

        timeout(factory.addFaultToCount, factory._timeThreshold);
        timeout.flush(factory._timeThreshold - 1);

        expect(zAlertFactory.fail).not.toHaveBeenCalled();
    });
});
