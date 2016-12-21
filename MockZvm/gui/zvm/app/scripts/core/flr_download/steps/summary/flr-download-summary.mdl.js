'use strict';

angular.module('zvmApp.core')
    .factory('flrDownloadSummaryModel', function (flrApiService, zWizardStepStates, flrDownloadModel, flrDownloadFileModel, flrDownloadSettingsModel,
                                                  $translate, zSlickGridFilterTypes, $filter, zEntitiesService, flrConstant, flrDownloadFactory) {
        var flrDownloadSummaryModel = {};
        flrDownloadSummaryModel.model = {};

        //TODO Denis: refactor to best practise like ( flr-wizard-vm.mdl and flr-wizard-restorepoint.mdl )

        flrDownloadSummaryModel.model.compressed = false;
        flrDownloadSummaryModel.model.isCompressedDisabled = false;
        flrDownloadSummaryModel.model.preffix = '';
        flrDownloadSummaryModel.model.note = '';
        flrDownloadSummaryModel.model.options = {
            showSearch: false,
            showGroupBy: false,
            showCheckbox: false,
            columns: [
                {
                    name: 'Name',
                    id: 'nameObject',
                    field: 'nameObject',
                    filter: zSlickGridFilterTypes.WILDCARD,
                    minWidth: 200,
                    formatter: $filter('zEntitiesFormatter')(zEntitiesService.createParams('flr-summary', null, null, null, null))
                },
                {
                    name: 'Path',
                    id: flrConstant.GRID_PATH_COLUMN_FIELD,
                    field: flrConstant.GRID_PATH_COLUMN_FIELD,
                    minWidth: 300,
                    formatter: $filter('flrPathPopoverFormatter')
                }
            ]
        };

        flrDownloadSummaryModel.revert = function () {
            flrDownloadSummaryModel.model.step.class = '';
            flrDownloadSummaryModel.model.step.stateIcon = zWizardStepStates.INITIAL;
            flrDownloadSummaryModel.model.compressed = false;
            flrDownloadSummaryModel.model.preffix = '';
            flrDownloadSummaryModel.model.note = '';
        };

        flrDownloadSummaryModel.validate = function () {
            flrDownloadSummaryModel.model.step.isEnabled = true;
            flrDownloadSummaryModel.model.step.stateIcon = zWizardStepStates.VALID;
            return true;
        };

        flrDownloadSummaryModel.model.step = {
            class: '',
            isEnabled: false,
            stateIcon: zWizardStepStates.INITIAL,
            id: 'SUMMARY',
            stepTitle: $translate.instant('FLR.DOWNLOAD.SUMMARY.SUMMARY_TITLE'),
            template: '<ng-include src="\'scripts/core/flr_download/steps/summary/flr-download-summary.html\'"></ng-include>',
            isValid: flrDownloadSummaryModel.validate,
            validationError: ''
        };

        flrDownloadSummaryModel.download = function () {
            var paths = _.pluck(flrDownloadFileModel.model.selectedNodes, 'fullPath'),
                pathsExtensions = [],
                totalSize;

            try {
                var ext;

                totalSize = flrDownloadFileModel.model.totalSize / 1024;
                _.forEach(paths, function (path) {
                    ext = path.slice((Math.max(0, path.lastIndexOf('.')) || Infinity) + 1);
                    if(ext !== ''){
                        pathsExtensions.push(ext);
                    }
                });
                pathsExtensions = _.unique(pathsExtensions);
            }
            catch (e) {
                totalSize = 0;
                pathsExtensions = [];
            }

            flrDownloadFactory._self.sendEventToAnalytics(pathsExtensions.toString(), totalSize);
            flrApiService.requestDownload(flrDownloadSettingsModel.model.sessionId, flrDownloadSummaryModel.model.compressed, paths)
                .then(flrDownloadSummaryModel.onUrlReceive, flrApiService.onFail);
        };

        flrDownloadSummaryModel.onUrlReceive = function (url) {
            flrDownloadModel.isDownloadSuccessfully = true;
            flrApiService.startDownload(flrDownloadFileModel.model.selectedNodes[0].name, url.replace(/\\/g, '/'));
        };

        flrDownloadModel.addModel({revert: flrDownloadSummaryModel.revert});

        return {
            _self: flrDownloadSummaryModel,
            model: flrDownloadSummaryModel.model,
            revert: flrDownloadSummaryModel.revert,
            validate: flrDownloadSummaryModel.validate,
            download: flrDownloadSummaryModel.download
        };
    });
