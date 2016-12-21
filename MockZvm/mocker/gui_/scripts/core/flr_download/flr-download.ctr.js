'use strict';

angular.module('zvmApp.core')
    .controller('flrDownloadController', function ($scope, flrDownloadFactory, flrDownloadSettingsModel, flrDownloadFileModel,
                                                   flrDownloadSummaryModel, flrDownloadModel) {
        $scope.steps = [
            flrDownloadSettingsModel.model.step,
            flrDownloadFileModel.model.step,
            flrDownloadSummaryModel.model.step
        ];

        /*
         * Functions
         * */
        $scope.closeHandler = function () {
            flrDownloadFactory._self.trackInWizardTimeToAnalytics(flrDownloadModel.isDownloadSuccessfully);
            flrDownloadFactory.close();
        };

        $scope._handleStepChanged = function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            _handleAutoSelectionOfDownloadAsCompressedZip();
        };

        function _handleAutoSelectionOfDownloadAsCompressedZip() {
            //set auto compressed when selectedNodes contain more than 1 file OR at least 1 folder.
            if (angular.isArray(flrDownloadFileModel.model.selectedNodes)) {
                switch (flrDownloadFileModel.model.selectedNodes.length) {
                    case 0 :
                        flrDownloadSummaryModel.model.compressed = false;
                        flrDownloadSummaryModel.model.isCompressedDisabled = false;
                        break;
                    case 1:
                        if (!flrDownloadFileModel.model.selectedNodes[0].isFile) {
                            flrDownloadSummaryModel.model.compressed = true;
                            flrDownloadSummaryModel.model.isCompressedDisabled = true;
                        } else {
                            flrDownloadSummaryModel.model.compressed = false;
                            flrDownloadSummaryModel.model.isCompressedDisabled = false;
                        }
                        break;
                    default:
                        flrDownloadSummaryModel.model.compressed = true;
                        flrDownloadSummaryModel.model.isCompressedDisabled = true;
                        break;
                }
            } else {
                flrDownloadSummaryModel.model.compressed = false;
            }
        }

        /*
         * Events
         * */
        $scope.$on('wizard:StepChanged', $scope._handleStepChanged);
        $scope.$on('wizard:DoneButtonClick', $scope._handleDoneClick);
        $scope.$on('wizard:CancelButtonClick', $scope.closeHandler);
    });
