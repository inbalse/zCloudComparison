'use strict';

angular.module('zvmApp.core')
    .factory('supportTicketFactory', function ($uibModal, zertoServiceFactory, zertoServiceUpdaterFactory) {
        var supportTicketFactory = {};

        supportTicketFactory.showSupportTicket = function () {
            supportTicketFactory.modalInstance = $uibModal.open({
                templateUrl: 'scripts/core/support_ticket/support-ticket.html',
                windowClass: 'supportTicketModal',
                controller: 'supportTicketController',
                backdrop: 'static'
            });
        };

        supportTicketFactory.submitSupportTicket = function (value) {
            return zertoServiceFactory.SubmitSupportTicket(value);
        };

        var operation = 'GetSupportTicketStatus';
        var params = [];
        supportTicketFactory.submitTicketStatus = function (scope, value) {
            params = [value];
            //autoUpdater.createAutoUpdater(zertoServiceFactory, zertoServiceFactory.GetSupportTicketStatus, [value]);
            return zertoServiceUpdaterFactory.register(scope, operation, params, false);
        };

        supportTicketFactory.stopSubmitTicketStatus = function (scope) {
            zertoServiceUpdaterFactory.unregister(scope, operation, params);
        };
        return supportTicketFactory;
    });
