'use strict';
describe('directive: card filter selection', function () {
    var element, scope, selectedNotifier,
        zNotificationService, zNotificationConstant, zSlickGridFilterTypes, multiSelectClassConstants, cardFilterSelectionConstants;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($rootScope, $compile, _zNotificationService_, _cardFilterSelectionConstants_,
                                _zNotificationConstant_, _zSlickGridFilterTypes_, _multiSelectClassConstants_) {
        scope = $rootScope.$new();
        zNotificationService = _zNotificationService_;
        zNotificationConstant = _zNotificationConstant_;
        zSlickGridFilterTypes = _zSlickGridFilterTypes_;
        multiSelectClassConstants = _multiSelectClassConstants_;
        cardFilterSelectionConstants = _cardFilterSelectionConstants_;
        element =
            '<card-filter-selection column="column"></card-filter-selection>';
        element = $compile(element)(scope);
        selectedNotifier = zNotificationService.getNotifier(zNotificationConstant.CARD_FILTER_CHANGE);
        scope.$digest();

    }));

    it('should parse wildcard values', function () {
        var test = 'test';
        scope.column = {
            isFilterActive: true,
            filter: zSlickGridFilterTypes.WILDCARD,
            wildcardValues: [test]
        };
        scope.$digest();

        selectedNotifier.notify({key: zNotificationConstant.CARD_FILTER_CHANGE});
        scope.$digest();

        testTextCase(getChild(element), test);

    });

    it('should parse range values', function () {
        scope.column = {
            isFilterActive: true,
            filter: zSlickGridFilterTypes.RANGE,
            rangeValues: [5, 10]
        };
        scope.$digest();
        selectedNotifier.notify({key: zNotificationConstant.CARD_FILTER_CHANGE});
        scope.$digest();

        var test = scope.column.rangeValues[0] + '-' + scope.column.rangeValues[1];
        testTextCase(getChild(element), test);
    });

    it('should parse range size values', function () {
        scope.column = {
            isFilterActive: true,
            filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
            rangeValues: [5, 10],
            rangeTypeMultiplier: 1
        };
        scope.$digest();

        selectedNotifier.notify({key: zNotificationConstant.CARD_FILTER_CHANGE});
        scope.$digest();
        var test = scope.column.rangeValues[0] + '-' + scope.column.rangeValues[1] + 'MB';
        testTextCase(getChild(element), test);

        scope.column.rangeTypeMultiplier = 1024;
        scope.$digest();

        selectedNotifier.notify({key: zNotificationConstant.CARD_FILTER_CHANGE});
        scope.$digest();

        test = scope.column.rangeValues[0] + '-' + scope.column.rangeValues[1] + 'GB';
        testTextCase(getChild(element), test);
    });

    it('should parse date values', function () {
        scope.column = {
            isFilterActive: true,
            filter: zSlickGridFilterTypes.DATE,
            dateValues: [moment('02/04/2016', 'MM/DD/YYYY'), moment('02/05/2016', 'MM/DD/YYYY')]
        };
        scope.$digest();

        selectedNotifier.notify({key: zNotificationConstant.CARD_FILTER_CHANGE});
        scope.$digest();
        testTextCase(getChild(element), '04/02/2016-05/02/2016')
    });

    it('should append multiple value on selected', function () {
        scope.column = {
            isFilterActive: true,
            filter: zSlickGridFilterTypes.MULTI_SELECT,
            filterValues: ['pain', 'is', 'a', 'bitch']
        };
        scope.$digest();

        selectedNotifier.notify({key: zNotificationConstant.CARD_FILTER_CHANGE});

        scope.$digest();

        testTextCase(getChild(element), cardFilterSelectionConstants.MULTIPLE_VALUES)
    });

    it('should parse formatter type of display', function () {
        var text = 'pain';
        scope.column = {
            isFilterActive: true,
            filter: zSlickGridFilterTypes.MULTI_SELECT,
            filterValues: [{display: text}],
            card_formatter: multiSelectClassConstants.FORMATTER_TYPE.DISPLAY
        };
        scope.$digest();
        selectedNotifier.notify({key: zNotificationConstant.CARD_FILTER_CHANGE});
        scope.$digest();

        testTextCase(getChild(element), text);
    });

    it('should parse formatter type of backup status', function () {
        var text = 'pain';
        scope.column = {
            isFilterActive: true,
            filter: zSlickGridFilterTypes.MULTI_SELECT,
            filterValues: [{display: text}],
            card_formatter: multiSelectClassConstants.FORMATTER_TYPE.BACKUP_STATUS
        };
        scope.$digest();
        selectedNotifier.notify({key: zNotificationConstant.CARD_FILTER_CHANGE});
        scope.$digest();

        testTextCase(getChild(element), text);

        scope.column.filterValues[0].display = '';

        scope.$digest();
        selectedNotifier.notify({key: zNotificationConstant.CARD_FILTER_CHANGE});
        scope.$digest();
        testTextCase(getChild(element), 'ENUM.VPG_BACKUP_JOB_SUMMARY_STATUS.INACTIVE');
    });

    it('should parse formatter type class', function () {
        testClassFormatter(multiSelectClassConstants.FORMATTER_TYPE.CLASS,0);
    });

    it('should parse formatter type class group', function () {
        testClassFormatter(multiSelectClassConstants.FORMATTER_TYPE.CLASS_GROUP,10);
    });

    function getChild(element) {
        return element.find('.' + cardFilterSelectionConstants.TEXT_CLASS);
    }

    function testTextCase(child, text) {
        expect(child.length).toBe(1);
        expect(child.text()).toBe(text);
    }

    function testClassFormatter(type, value) {
        var className = 'stark-power';
        scope.column = {
            isFilterActive: true,
            filter: zSlickGridFilterTypes.MULTI_SELECT,
            filterValues: [value],
            card_formatter: type,
            formatter_class: className
        };

        scope.$digest();
        selectedNotifier.notify({key: zNotificationConstant.CARD_FILTER_CHANGE});
        scope.$digest();


        var child = element.find(':first-child');
        expect(element.children().length).toBe(1);
        var classResult = child.attr('class');
        expect(classResult).toBe('card-selection-wrapper');
        child = child.find(':first-child');
        classResult = child.attr('class');
        expect(classResult).toBe(className + ' ' + className + '-' + value);
        var tagName = child.prop('tagName');
        expect(tagName).toBe('DIV');

    }
});
