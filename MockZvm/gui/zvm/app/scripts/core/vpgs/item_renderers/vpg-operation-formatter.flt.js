'use strict';

angular.module('zvmApp.filters')
    .filter('vpgOperationFormatter', function ($translate, vpgsListEvents) {
        var title = $translate.instant('GRID_COLUMNS.OPERATION');
        var _buttonTemplate = _.template('<button title="<%=title%>" value="<%=event%>" class="<%=cssClass%>"></button>');
        return function (row, cell, item, columnsDefs, context) {
            if (item) {

                var tempString = '';

                if (item.value > 0) {
                    tempString = '<span class="progress-span">' + item.display + ' ' + item.value + '%</span>';
                    tempString += '<div class="progress slimNoValueProgressBar">' +
                        '<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="' + item.value + '" aria-valuemin="0" aria-valuemax="100" style="width:' + item.value + '%"></div>' +
                        '</div>';
                } else {
                    tempString = '<span class="progress-span" title="' + title + '">' + item.display + '</span>';
                }

                if (context.operation) {

                    if (context.operation.stopTestButton) {
                        tempString += _buttonTemplate({
                            title: 'Stop Failover Test',
                            cssClass: 'stop-vpg-btn float-vpg-list-button',
                            event: vpgsListEvents.stopFot
                        });
                    }

                    if (context.operation.stopBackupButton) {
                        tempString += _buttonTemplate({
                            title: 'Stop Backup',
                            cssClass: 'stop-vpg-btn float-vpg-list-button',
                            event: vpgsListEvents.stopBackup
                        });
                    }
                    if (context.operation.stopCloneButton) {
                        tempString += _buttonTemplate({
                            title: 'Stop clone',
                            cssClass: 'stop-vpg-btn float-vpg-list-button',
                            event: vpgsListEvents.stopClone
                        });
                    }
                    if (context.operation.resumeButton) {
                        tempString += _buttonTemplate({
                            title: 'Resume',
                            cssClass: 'resume-vpg-btn float-vpg-list-button',
                            event: vpgsListEvents.resume
                        });
                    }
                    if (context.operation.rollbackCommitButton) {
                        tempString += _buttonTemplate({
                            title: 'Commit',
                            cssClass: 'commit-btn float-vpg-list-second-button',
                            event: vpgsListEvents.commit
                        });
                        tempString += _buttonTemplate({
                            title: 'Rollback',
                            cssClass: 'rollback-btn float-vpg-list-button',
                            event: vpgsListEvents.rollback
                        });
                    }
                }

                return tempString;

            } else {
                return '';
            }
        };
    });
