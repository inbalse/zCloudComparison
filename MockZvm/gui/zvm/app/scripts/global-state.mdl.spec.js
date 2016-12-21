describe("GlobalState Model", function () {
    var state, enums;

    beforeEach(module('zvmTest', function ($provide) {
        state = {
            go: function (value) {
            }
        };

        $provide.value('$state', state);
        spyOn(state, 'go');
    }));

    describe('GlobalState not in portal', function () {
        var globalStateModel, initValue;
        beforeEach(inject(function (_globalStateModel_, _enums_) {
            enums = _enums_;
            globalStateModel = _globalStateModel_;

            globalStateModel.data = {};
            initValue = {
                "IsPortal": false,
                "VirtualizationProviderType": 2,
                "HasLicence": true,
                "IsSessionValid": true
            };

        }));

        it("should test call init", function () {
            globalStateModel.init(initValue);
            expect(state.go).toHaveBeenCalledWith('main.dashboard');
        });

        it("should test _findNextState", function () {
            globalStateModel.data = initValue;
            globalStateModel.previousState = null;
            expect(globalStateModel._findNextState()).toEqual('main.dashboard');
        });
    });

    describe('GlobalState in portal', function () {
        var globalStateModel, initValue;
        beforeEach(inject(function (_globalStateModel_, _enums_) {
            enums = _enums_;
            globalStateModel = _globalStateModel_;

            globalStateModel.data = {};
            initValue = {"IsPortal": true, "VirtualizationProviderType": 2, "HasLicence": true, "IsSessionValid": true};

        }));

        it("should test call init", function () {
            globalStateModel.init(initValue);
            expect(state.go).toHaveBeenCalledWith('main.vpgs');
        });

        it("should test _findNextState", function () {
            globalStateModel.data = initValue;
            globalStateModel.previousState = null;
            expect(globalStateModel._findNextState()).toEqual('main.vpgs');
        });
    });
});
