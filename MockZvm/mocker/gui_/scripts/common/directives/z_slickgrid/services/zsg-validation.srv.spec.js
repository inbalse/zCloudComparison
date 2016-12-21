'use strict';

describe('slick grid validation service', function () {
    var validationService, gridId, INVALID_CLASS, columns, data, grid;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_zSlickGridValidationService_) {
        validationService = _zSlickGridValidationService_;

        columns = [
            {
                name: 'column1', id: 'RecoveryHost', field: 'RecoveryHost',
                zCellValidation: function (dataItem) {
                    return angular.isDefined(dataItem.display) && dataItem.display !== '';
                }
            },
            {
                name: 'column2', field: 'Volume', id: 'Volume_1',
                zCellValidation: function (dataItem) {
                    return angular.isDefined(dataItem.display) && dataItem.display !== '';
                }
            },
            {name: 'column3', field: 'JournalHardLimitObj', id: 'JournalHardLimitObj'},
            {name: 'column4', field: 'JournalTest', id: 'JournalTest'}
        ];

        data = [
            {
                RecoveryHost: {display: 'test'},
                Volume: {display: 'test'},
                JournalHardLimitObj: 'test',
                JournalTest: 'test'
            },
            {RecoveryHost: {display: ''}, Volume: {display: 'test'}, JournalHardLimitObj: '', JournalTest: 'test'},
            {RecoveryHost: {display: 'test'}, Volume: {display: 'test'}, JournalHardLimitObj: '', JournalTest: ''},
            {RecoveryHost: {display: ''}, Volume: {display: ''}, JournalHardLimitObj: 'test', JournalTest: 'test'},
            {RecoveryHost: {display: 'test'}, Volume: {display: ''}, JournalHardLimitObj: '', JournalTest: ''},
            {RecoveryHost: {display: 'test'}, Volume: {display: 'test'}, JournalHardLimitObj: '', JournalTest: 'test'}
        ];

        gridId = 'grid-id';
        INVALID_CLASS = 'slick-invalid-cell';

        grid = {
            removeCellCssStyles: function () {},
            addCellCssStyles: function () {}
        };
    }));

    it("should have function defined", function () {
        expect(validationService._private.setCellValidation).toBeDefined();
        expect(validationService._private.getCellValidityByPropType).toBeDefined();
        expect(validationService._private.checkCellValidation).toBeDefined();
        expect(validationService._private.defaultValidation).toBeDefined();
        expect(validationService.getCellsValidationCollection).toBeDefined();
        expect(validationService.destroyCellsValidationCollection).toBeDefined();
        expect(validationService.cellValidation).toBeDefined();
        expect(validationService.gridCellsValidation).toBeDefined();
        expect(validationService._private.cellsValidationCollection).toBeDefined();
    });

    it('should check setCellValidation function', function () {
        validationService.getCellsValidationCollection(gridId, {});

        validationService._private.setCellValidation(0, 'RecoveryHost', true, 'grid-id');
        expect(angular.equals(validationService._private.cellsValidationCollection, {"grid-id": {}})).toBeTruthy();

        validationService._private.setCellValidation(1, 'RecoveryHost', false, 'grid-id');
        expect(angular.equals(validationService._private.cellsValidationCollection, {"grid-id": {1: {"RecoveryHost": INVALID_CLASS}}})).toBeTruthy();

        validationService._private.setCellValidation(3, 'RecoveryHost', false, 'grid-id');
        expect(angular.equals(validationService._private.cellsValidationCollection, {
            "grid-id": {
                "1": {"RecoveryHost": INVALID_CLASS},
                "3": {"RecoveryHost": INVALID_CLASS}
            }
        })).toBeTruthy();

    });

    it('should check getCellValidityByPropType function', function () {
        expect(validationService._private.getCellValidityByPropType(columns[1], data[0].RecoveryHost)).toBeTruthy();
        expect(validationService._private.getCellValidityByPropType(columns[0], data[5].RecoveryHost)).toBeTruthy();
        expect(validationService._private.getCellValidityByPropType(columns[1], data[1].RecoveryHost)).toBeFalsy();
        expect(validationService._private.getCellValidityByPropType(columns[0], data[3].RecoveryHost)).toBeFalsy();
    });

    it('should check defaultValidation function', function () {
        expect(validationService._private.defaultValidation('test')).toBeTruthy();
        expect(validationService._private.defaultValidation('')).toBeFalsy();
        expect(validationService._private.defaultValidation()).toBeFalsy();
    });

    it('should check getCellsValidationCollection function', function () {
        validationService.getCellsValidationCollection(gridId, {});
        expect(angular.equals(validationService._private.cellsValidationCollection, {"grid-id": {}})).toBeTruthy();
    });

    it('should check getCellsValidationCollection function', function () {
        validationService.destroyCellsValidationCollection(gridId);
        expect(angular.equals(validationService._private.cellsValidationCollection, {})).toBeTruthy();
    })
});
