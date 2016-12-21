'use strict';

angular.module('zvmApp.filters')
    .filter('storageFormatter', function () {
        return function (row, cell, value) {
            return '<div class="storage-progressbar-content"><div class="progress storage-progressbar">' +
                '<div class="progress-bar" aria-valuenow="' + value.value + '" aria-valuemin="0" aria-valuemax="' + value.capacity + '" style="width: ' + value.percent + '%">' +
                '</div><i>' + value.value + ' / ' + value.capacity + '</i>' +
                '</div></div>';
        };
    });

