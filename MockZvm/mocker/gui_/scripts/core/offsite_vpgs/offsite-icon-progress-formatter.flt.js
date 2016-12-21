'use strict';

angular.module('zvmApp.filters')
    .filter('offsiteIconProgressFormatter', function () {
        return function (row, cell, value,columnDef, dataContext) {
            if (dataContext) {
                var tempString = '';

                if (dataContext.ProgressActive) {
                    tempString = '<div class="' + dataContext.IconClass + '"><span class="progress-span">' + dataContext.StatusText + ' ' + dataContext.BackupProgress + '%</span>';
                    tempString += '<div class="progress slimNoValueProgressBar">' +
                        '<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="' + dataContext.BackupProgress + '" aria-valuemin="0" aria-valuemax="100" style="width:' + dataContext.BackupProgress + '%"></div>' +
                        '</div>';
                }else{
                    tempString = '<div class="' + dataContext.IconClass + '"><span class="progress-span">' + dataContext.StatusText + '</span>';
                }
                tempString += '</div>';
                return tempString;

            } else {
                return '';
            }
        };
    });
