'use strict';

angular.module('zvmApp.filters')
    .filter('groupBy', function () {
        return function (row) {
            var text;
            if (row.label === 'null') {
                text = 'empty';
            }
            else {
                switch (row.field) {
                    case 'Direction':
                    {
                        switch (row.label) {
                            case '0':
                                text = 'Protected';
                                break;
                            case '1':
                                text = 'Recovery';
                                break;
                            case '2':
                                text = 'Self';
                                break;
                            default:
                                text = 'Protected';
                        }
                        break;
                    }

                    default:
                        text = row.label;
                }
            }

            var numberOfChildren;
            if (row.totalChildren() === 1) {
                numberOfChildren = '1 Item';
            } else {
                numberOfChildren = row.totalChildren() + ' Items';
            }
            return '<div class="z-group-div-pos">' + text + '<span class="z-group-span-pos">' + numberOfChildren + '</span></div>';

        };
    });