/**
 * Created by guy.golan on 6/15/2016.
 */
'use strict';
angular.module('zvmApp.directives')
    .constant('cardFilterSelectionConstants', {
        MULTIPLE_VALUES: 'Multiple values',
        GB: 'GB',
        MB: 'MB',
        DATE_FORMAT: 'DD/MM/YYYY',
        TEXT_CLASS: 'cards-active-filter__value'
    })
    .directive('cardFilterSelection', function ($translate, zNotificationService, zNotificationConstant,
                                                zSlickGridFilterTypes, multiSelectClassConstants, cardFilterSelectionConstants) {

            return {
                restrict: 'E',
                scope: {
                    column: '='
                },
                link: function (scope, element) {
                    var subscriber = zNotificationService.getSubscriber(zNotificationConstant.CARD_FILTER_CHANGE).promise;

                    scope.$on('destroy', function () {
                        zNotificationService.unSubscribe(subscriber, zNotificationConstant.CARD_FILTER_CHANGE);
                    });

                    parseFilter();
                    subscriber.then(null, null, parseFilter);


                    function appendText(text) {
                        element.append('<div class="' + cardFilterSelectionConstants.TEXT_CLASS + '">' + text + '</div>');
                    }

                    function parseFilter() {
                        element.empty();

                        if (_.isNullOrUndefined(scope.column)) {
                            return;
                        }
                        if (!scope.column.isFilterActive) {
                            return;
                        }
                        switch (scope.column.filter) {
                            case zSlickGridFilterTypes.WILDCARD:
                                appendText(scope.column.wildcardValues[0]);
                                break;
                            case zSlickGridFilterTypes.RANGE:
                                appendText(scope.column.rangeValues[0] + '-' + scope.column.rangeValues[1]);
                                break;

                            case zSlickGridFilterTypes.MB_OR_GB_RANGE:
                                var type = _.isEqual(scope.column.rangeTypeMultiplier, 1) ? cardFilterSelectionConstants.MB : cardFilterSelectionConstants.GB;
                                appendText(scope.column.rangeValues[0] + '-' + scope.column.rangeValues[1] + type);
                                break;
                            case zSlickGridFilterTypes.DATE:
                                var startDate, endDate;
                                if (_.isFunction(scope.column.dateValues[0]).format) {
                                    startDate = scope.column.dateValues[0];
                                    endDate = scope.column.dateValues[1];
                                } else {
                                    startDate = moment(scope.column.dateValues[0]);
                                    endDate = moment(scope.column.dateValues[1]);
                                }

                                appendText(startDate.format(cardFilterSelectionConstants.DATE_FORMAT) + '-' +
                                    endDate.format(cardFilterSelectionConstants.DATE_FORMAT));
                                break;
                            case zSlickGridFilterTypes.MULTI_SELECT:
                                if (_.size(scope.column.filterValues) > 1) {
                                    appendText(cardFilterSelectionConstants.MULTIPLE_VALUES);
                                    return;
                                }
                                switch (scope.column.card_formatter) {
                                    case multiSelectClassConstants.FORMATTER_TYPE.DISPLAY:
                                        appendText(scope.column.filterValues[0].display);
                                        break;
                                    case multiSelectClassConstants.FORMATTER_TYPE.BACKUP_STATUS:

                                        var text = scope.column.filterValues[0].display;
                                        if (_.isEmpty(text)) {
                                            text = $translate.instant('ENUM.VPG_BACKUP_JOB_SUMMARY_STATUS.INACTIVE');
                                        }
                                        appendText(text);
                                        break;

                                    default:
                                        var className = scope.column.formatter_class + ' ' + scope.column.formatter_class + '-' + scope.column.filterValues[0];
                                        element.append('<div class="card-selection-wrapper"><div class="' + className + '">&nbsp;</div></div>');
                                        break;
                                }
                        }
                    }
                }
            };
        }
    );
