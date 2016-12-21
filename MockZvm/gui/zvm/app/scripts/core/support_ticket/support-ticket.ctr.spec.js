'use strict';

describe('Support ticket controller', function () {
    var controller, testScope, zertoServiceFactory, enums, vos, testSupportTicketFactory, trans;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _zertoServiceFactory_, _enums_, _vos_, $compile, $translate) {
        testScope = $rootScope.$new();

        zertoServiceFactory = _zertoServiceFactory_;
        enums = _enums_;
        vos = _vos_;

        /// --- mock data ----
        testScope.supportTicket = new vos.SubmitSupportTicketVisualObject;
        testScope.supportTicket.Description = "A description";
        testScope.supportTicket.Subject = "A Subject";
        testScope.supportTicket.Severity = 1;
        testScope.supportTicket.SspEmailAddress = "test@zerto.com";
        testScope.supportTicket.Type = 1;
        testScope.translations = {};

        testSupportTicketFactory = jasmine.createSpyObj('supportTicketFactory', ['submitSupportTicket', 'submitTicketStatus', 'stopSubmitTicketStatus']);
        testSupportTicketFactory.submitSupportTicket.and.returnValue({then: function (resolve) {
            return resolve({'CommandTaskIdentifier': {Identifier: {}, SiteId: 'aaaaa'}});
        }});

        trans = function (value) {
            return {then: function (resolve) {
                return resolve({});
            }}
        };

        controller = $controller('supportTicketController', {$scope: testScope, supportTicketFactory: testSupportTicketFactory,
            zertoServiceFactory: zertoServiceFactory, enums: enums, vos: vos, $compile: $compile, $translate: trans});
    }));

    it("should have user interaction funciton defined", function () {
        expect(testScope.close).toBeDefined();
        expect(testScope.cancel).toBeDefined();
        expect(testScope.submit).toBeDefined();
        expect(testScope.initButtons).toBeDefined();
        expect(testScope.initTypes).toBeDefined();
        expect(testScope.refreshSubmission).toBeDefined();
        expect(testScope.setSubmitButtonToClose).toBeDefined();
        expect(testScope.getResultText).toBeDefined();
    });

    it("should check properties defined", function () {
        expect(testScope.loading).toBeDefined();
        expect(testScope.forms).toBeDefined();
        expect(testScope.showResultText).toBeDefined();
        expect(testScope.showProgress).toBeDefined();
        expect(testScope.supportTicket).toBeDefined();
        expect(testScope.types).toBeDefined();
        expect(testScope.buttons).toBeDefined();
        expect(testScope.submitButton).toBeDefined();
    });

    it("should have cancel and submit handlers for the buttons", function () {
        expect(testScope.buttons[1].handler).toEqual(testScope.submit);
        expect(testScope.buttons[0].handler).toEqual(testScope.cancel);
    });

    it("should check the submit values while return status is Running", function () {

        testSupportTicketFactory.submitTicketStatus.and.returnValue({then: function (resolve, reject, notify) {
            return notify({'Status': 4})
        }});
        testScope.submit();
        expect(testScope.showProgress).toBeTruthy();
        expect(testScope.showResultText).toBeFalsy();
        expect(testScope.submitButton.disabled).toBeTruthy();
        expect(testScope.supportTicket.Severity).toEqual(enums.TicketSeverity.Medium);
        expect(testSupportTicketFactory.submitSupportTicket).toHaveBeenCalledWith(testScope.supportTicket);
        expect(testSupportTicketFactory.submitTicketStatus).toHaveBeenCalled();
    });

    it("should check the submit function while return status is Success", function () {
        testScope.translations['SUPPORT_TICKET.CLOSE'] = 'CLOSE';
        testScope.translations['SUPPORT_TICKET.SUCCESS'] = 'Ticket <b>#{0}</b> was successfully created and sent to Zerto support where the team will process it and contact you. If you need to send logs to Zerto, follow the instructions <a href="/Administrator%20for%20Zerto%20Virtual%20Manager/Troubleshooting.16.08.html" target="_blank">here</a>.'
        testSupportTicketFactory.submitTicketStatus.and.returnValue({then: function (resolve, reject, notify) {
            return notify({'Status': 0, 'CaseNumber': '88888'})
        }});
        testScope.submit();
        expect(testScope.showProgress).toBeFalsy();
        expect(testScope.showResultText).toBeTruthy();
        expect(testScope.submitButton.disabled).toBeFalsy();
        expect(testSupportTicketFactory.submitSupportTicket).toHaveBeenCalledWith(testScope.supportTicket);
        expect(testSupportTicketFactory.submitTicketStatus).toHaveBeenCalled();
        expect(testScope.resultText).toEqual('Ticket <b>#88888</b> was successfully created and sent to Zerto support where the team will process it and contact you. If you need to send logs to Zerto, follow the instructions <a href="/Administrator%20for%20Zerto%20Virtual%20Manager/Troubleshooting.16.08.html" target="_blank">here</a>.')
        expect(testScope.textResultClass).toEqual('success-text');
    });

    it("should check for default error text", function () {
        testScope.translations['SUPPORT_TICKET.DEFAULT_ERROR'] = 'An error has occurred with the ticket submission. <a href="mailto:support@zerto.com"> Contact Zerto support.</a>';
        expect(testScope.getResultText({'Status': '12'})).toEqual('An error has occurred with the ticket submission. <a href="mailto:support@zerto.com"> Contact Zerto support.</a>');
        expect(testScope.textResultClass).toEqual('error-text');
    });

    it("should check the change submit button to close button", function () {
        expect(testScope.submitButton.handler).toEqual(testScope.submit);
        testScope.setSubmitButtonToClose();
        expect(testScope.submitButton.handler).toEqual(testScope.cancel);
    });
});
