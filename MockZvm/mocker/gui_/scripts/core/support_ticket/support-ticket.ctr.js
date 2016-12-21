'use strict';

angular.module('zvmApp.core')
    .controller('supportTicketController', ['$scope', 'supportTicketFactory', 'enums', 'vos', '$translate' ,'zertoServiceFactory', function ($scope, supportTicketFactory, enums, vos, $translate,zertoServiceFactory) {
        //==========================================================================
        //  Properties
        //==========================================================================
        $scope.loading = true;
        $scope.forms = {};
        $scope.showResultText = false;
        $scope.showProgress = false;
        $scope.supportTicket = new vos.SubmitSupportTicketVisualObject();
        //==========================================================================
        //  User interaction
        //==========================================================================
        $scope.close = function () {
            $scope.cancel();
        };

        $scope.cancel = function () {
            supportTicketFactory.modalInstance.dismiss('close');
        };

        $scope.submit = function () {
            $scope.showProgress = true;
            $scope.showResultText = false;
            $scope.submitButton.disabled = true;
            $scope.supportTicket.Severity = enums.TicketSeverity.Medium;
            supportTicketFactory.submitSupportTicket($scope.supportTicket).then(function (value) {
                if (angular.isDefined(value)) {
                    $scope.refreshSubmission(value);
                }
            });
        };
        //==========================================================================
        //  Helpers
        //==========================================================================
        $scope.initButtons = function () {
            $scope.submitButton = {label: $scope.translations['SUPPORT_TICKET.SUBMIT'], handler: $scope.submit, disabled: true};
            $scope.buttons = [
                {label: $scope.translations['SUPPORT_TICKET.CANCEL'], class:'btn btn-link', handler: $scope.cancel, disabled: false},
                $scope.submitButton
            ];
        };

        $scope.initTypes = function () {
            $scope.types = [
                {'id': enums.TicketType.Problem, 'name': $scope.translations['SUPPORT_TICKET.PROBLEM']},
                {'id': enums.TicketType.FeatureRequest, 'name': $scope.translations['SUPPORT_TICKET.FEATURE_REQUEST']},
                {'id': enums.TicketType.Question, 'name': $scope.translations['SUPPORT_TICKET.QUESTION']}
            ];
        };

        $scope.refreshSubmission = function (value) {
            supportTicketFactory.submitTicketStatus($scope, value).then(null, null, function (result) {
                if (result.Status !== enums.SupportTicketResultStatus.Running) {
                    $scope.showResultText = true;
                    $scope.showProgress = false;
                    $scope.submitButton.disabled = false;
                    //stop the recalling for ticket status refresh
                    supportTicketFactory.stopSubmitTicketStatus($scope);
                    //write in the status label
                    $scope.resultText = $scope.getResultText(result);
                }
            });
        };

        $scope.setSubmitButtonToClose = function () {
            $scope.submitButton.label = $scope.translations['SUPPORT_TICKET.CLOSE'];   //when sucess disable this button
            $scope.submitButton.handler = $scope.cancel;
        };

        $scope.getResultText = function (result) {
            $scope.textResultClass = 'error-text';
            switch (result.Status) {
                case enums.SupportTicketResultStatus.Success:
                    $scope.textResultClass = 'success-text';
                    $scope.setSubmitButtonToClose();
                    return $scope.translations['SUPPORT_TICKET.SUCCESS'].replace('{0}', result.CaseNumber);
                case enums.SupportTicketResultStatus.CommunicationException:
                    return $scope.translations['SUPPORT_TICKET.COMMUNICATION_EXCEPTION'];
                case enums.SupportTicketResultStatus.Aborted:
                    return $scope.translations['SUPPORT_TICKET.ABORTED'];
                case enums.SupportTicketResultStatus.InvalidEmailForAccount:
                    return $scope.translations['SUPPORT_TICKET.INVALID_EMAIL'];
                case enums.SupportTicketResultStatus.NoLicense:
                    return $scope.translations['SUPPORT_TICKET.NO_LICENSE'];
                default:
                    return $scope.translations['SUPPORT_TICKET.DEFAULT_ERROR'];
            }
        };
        //==========================================================================
        //  Init
        //==========================================================================
        $scope.$watch('forms.ticketForm.$valid', function (value) {
            if (angular.isDefined(value)) {
                $scope.submitButton.disabled = !value;
            }
        });

        zertoServiceFactory.GetSupportTicketDisplayData().then(function (result) {
            $scope.version = result.Version + ' Build  ' + result.BuildNumber;
        });

        $translate(['SUPPORT_TICKET.SUCCESS', 'SUPPORT_TICKET.COMMUNICATION_EXCEPTION', 'SUPPORT_TICKET.ABORTED',
            'SUPPORT_TICKET.INVALID_EMAIL', 'SUPPORT_TICKET.NO_LICENSE', 'SUPPORT_TICKET.DEFAULT_ERROR',
            'SUPPORT_TICKET.PROBLEM', 'SUPPORT_TICKET.FEATURE_REQUEST', 'SUPPORT_TICKET.QUESTION',
            'SUPPORT_TICKET.CLOSE', 'SUPPORT_TICKET.SUBMIT', 'SUPPORT_TICKET.CANCEL']).then(function (translations) {
                $scope.translations = translations;
                $scope.initTypes();
                $scope.initButtons();
                $scope.loading = false;
            });
    }]);
