'use strict';

angular.module('zvmApp.directives')
    .constant('zWizardStepStates', {
        INITIAL: 'z-wizard-state-initial',
        VALID: 'z-wizard-state-valid',
        INVALID: 'z-wizard-state-invalid',
        MIXED: 'z-wizard-state-mixed' //can be used to identify step that valid partially but still can proceed
    })
    .directive('zWizard', function ($translate, $compile, $rootScope, $q, zAlertFactory, tweaksService, zNotificationService,
                                    zNotificationConstant, createVPGWizardModel, stepId, enums, vos, createVPGModel, $location, analyticsEventsTypes) {

        return {
            restrict: 'E',
            templateUrl: 'scripts/common/directives/z_wizard/z-wizard.html',
            link: function (scope, element, attributes) {
                scope.cancelEnabled = true;
                scope.previousEnabled = false;
                scope.nextEnabled = false;
                scope.showDoneButton = true;
                var wizardName = attributes.name;
                trackInternalPageView(wizardName);


                var validationNotificationKey = zNotificationConstant.INLINE_OPENED_NOTIFICATION;
                var isButtonsValid = true;

                if (attributes.showDoneButton) {
                    scope.showDoneButton = JSON.parse(attributes.showDoneButton);
                }

                scope.handleStepClick = function (item) {
                    if (item.class === 'active' || item.stepTitle === scope.currentStep.stepTitle) {
                        return;
                    }
                    //todo: do not use indexOf - scope.steps.indexOf(scope.currentStep) does not works
                    if (scope.steps.indexOf(item) < scope.steps.indexOf(scope.currentStep)) {
                        scope.changeCurrentStep(item);
                    } else if ((scope.steps.indexOf(item) === scope.steps.indexOf(scope.currentStep) + 1) || item.isEnabled) {
                        $rootScope.$broadcast('wizard:PreHandelNextButtonClickEvent', scope.currentStep);//fire event to controller
                        scope.validateAndMoveStep(scope.currentStep, false, item);
                    }
                };

                scope.changeCurrentStep = function (item) {
                    //destroy previous element if is present
                    if (scope.currentScope) {
                        scope.currentScope.$destroy();
                        scope.currentScope = null;
                    }

                    //remove the active class
                    if (scope.currentStep) {
                        scope.currentStep.class = '';
                    }

                    //add the active class to the selected item
                    item.class = 'active';
                    scope.currentStep = item;

                    //find the target div only one
                    if (!scope.target) {
                        scope.target = element.find('#z-wizard-placeholder');
                    }

                    //add the new view
                    var linkFn = $compile(item.template);
                    scope.currentScope = scope.$new();
                    var elm = linkFn(scope.currentScope);

                    scope.target.html(elm);


                    //reset the buttons
                    scope.enableDisableButtons();
                    scope.$broadcast('wizard:StepChanged', item);
                    scope.$emit('wizard:StepChanged', item);

                    trackInternalPageView(wizardName + '/' + item.id);
                };

                scope._buttons = {};
                scope._buttons.cancel = $translate.instant('Z_WIZARD.CANCEL');
                scope._buttons.previous = $translate.instant('Z_WIZARD.PREVIOUS');
                scope._buttons.next = $translate.instant('Z_WIZARD.NEXT');
                scope._buttons.done = $translate.instant('Z_WIZARD.DONE');

                scope.handleButtonClick = function (event) {
                    if (isButtonsValid) {
                        switch (event.target.innerHTML.trim()) {
                            case scope._buttons.cancel:
                                scope.$emit('wizard:CancelButtonClick');
                                break;
                            case scope._buttons.previous:
                                scope.previous();
                                scope.$emit('wizard:PreviousButtonClick');
                                scope.$broadcast('wizard:PreviousButtonClick', scope.currentStep);
                                break;
                            case scope._buttons.next:
                                $rootScope.$broadcast('wizard:PreHandelNextButtonClickEvent', scope.currentStep);//fire event to controller
                                scope.validateAndMoveStep(scope.currentStep, true);
                                break;
                            case scope._buttons.done:
                                scope.$emit('wizard:DoneButtonClick');
                                scope.$broadcast('wizard:DoneButtonClick');
                                break;
                        }
                    }
                };

                scope.validateAndMoveStep = function (step, isNextButton, item) {
                    scope.$broadcast('wizard:hideErrors');
                    if (scope.currentStep.isValid(step)) { //gui validations is ok
                        if (tweaksService.getTweak('t_createVpgServerValidations', false) && step.isServerValid) {
                            step.isServerValid(step).then(function (result) {
                                if (result && result.length > 0 && !_.isNullOrUndefined(createVPGModel)) {
                                    if (result[0].ErrorMsg.indexOf('Warning:') !== -1) {
                                        applyReverseReplicationValidation(result);//one to many bug26134
                                    } else {
                                        zAlertFactory.fail('Current step is not valid', scope.setServerValidationErrorString(result));
                                    }
                                } else {
                                    if (isNextButton) { //doing the step change
                                        scope.next();
                                        scope.$emit('wizard:NextButtonClickEvent');
                                        scope.$broadcast('wizard:NextButtonClickEvent', step);
                                    } else {
                                        scope.changeCurrentStep(item);
                                    }
                                }
                            });
                        } else {
                            if (isNextButton) { //doing the step change
                                scope.next();
                                scope.$emit('wizard:NextButtonClickEvent');
                                scope.$broadcast('wizard:NextButtonClickEvent', step);
                            } else {
                                scope.changeCurrentStep(item);
                            }
                        }
                    } else {  //gui validations failed
                        if (angular.isDefined(step.validationError) && step.validationError.length) {
                            zAlertFactory.fail('Current step is not valid', scope.setValidationErrorString(step.validationError));
                        }
                        if (angular.isDefined(step.validationComponents) && step.validationComponents.length) {
                            _.forEach(step.validationComponents, function (component) {
                                scope.$broadcast('wizard:' + component.id, component.error);
                            });
                        }
                        scope.$emit('wizard:NextButtonFailedEvent');
                    }

                };

                scope.setServerValidationErrorString = function (validationError) {
                    var result = '<ul>';
                    _.forEach(validationError, function (error) {
                        result = result + '<li>' + error.ErrorMsg + '</li>';
                    });
                    return result + '</ul>';
                };

                scope.setValidationErrorString = function (validationError) {
                    var result = '';
                    if (angular.isArray(validationError)) {
                        result = '<ul>';
                        _.forEach(validationError, function (error) {
                            result = result + '<li>' + error + '</li>';
                        });
                        return result + '</ul>';
                    } else {
                        return validationError;
                    }
                };

                //custom event to go next step
                scope.$on('wizard:ClickNextButtonManual', function () {
                    scope.next();
                });

                scope.next = function () {
                    scope.changeCurrentStep(scope.steps[scope._getCurrentIndex() + 1]);
                };

                scope.previous = function () {
                    scope.changeCurrentStep(scope.steps[scope._getCurrentIndex() - 1]);
                };

                scope._getCurrentIndex = function () {
                    return _.findIndex(scope.steps, {stepTitle: scope.currentStep.stepTitle});
                };

                scope.enableDisableButtons = function () {
                    scope.previousEnabled = scope._isPreviousButtonEnabled(scope.currentStep);
                    scope.nextEnabled = scope._isNextButtonEnabled(scope.currentStep);
                };

                scope._isPreviousButtonEnabled = function () {
                    return scope._getCurrentIndex() > 0;
                };

                scope._isNextButtonEnabled = function () {
                    return scope._getCurrentIndex() < (scope.steps.length - 1);
                };

                scope.changeCurrentStep(scope.steps[0]);

                scope._handleFormChange = function () {
                    scope.$emit('wizard:StepChanged');
                };

                scope._handleUpdateCurrentStepReference = function (event, currentStepName) {
                    var updatedCurrentStepIndex = _.findIndex(scope.steps, function (step) {
                        return step.stepTitle === currentStepName;
                    });

                    if (updatedCurrentStepIndex > -1) {
                        scope.currentStep = scope.steps[updatedCurrentStepIndex];
                    }
                };

                scope.$on('wizard:FormValidationChanged', scope._handleFormChange);
                scope.$on('wizard:updateCurrentStepReference', scope._handleUpdateCurrentStepReference);

                var wizardButtonState = function (isValid) {
                    isButtonsValid = isValid;
                    scope.cancelEnabled = isValid;
                    scope.previousEnabled = isValid;
                    scope.nextEnabled = isValid;
                };

                var subscriber = zNotificationService.getSubscriber(validationNotificationKey);
                subscriber.promise.then(null, null, wizardButtonState);

                //TODO : needs refactoring move the validation logic to create-vpg-validation.fct.js or create new service   
                var applyReverseReplicationValidation = function (result) {
                    zAlertFactory.warn('Warning', result[0].ErrorMsg, function (event) {
                        if (event.target.name === zAlertFactory.buttons.OK) {
                            _.remove(createVPGWizardModel.serverValidationMap[stepId.REPLICATION], function (svm) {
                                return svm.ValidationType === enums.InWizardValidationTypeVisualObject.ReverseReplicationValidation
                            });

                            createVPGModel.getEditValidationFlags().IgnoreReverseReplicationWarning = true;
                        }
                    });
                };

                var setCreateVpgToInitialValidationState = function () {
                    var reverseReplicationValidationObj = _.find(createVPGWizardModel.serverValidationMap[stepId.REPLICATION],
                        {ValidationType: enums.InWizardValidationTypeVisualObject.ReverseReplicationValidation});

                    if (_.isNullOrUndefined(reverseReplicationValidationObj)) {
                        createVPGWizardModel.serverValidationMap[stepId.REPLICATION].push(new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.ReverseReplicationValidation))
                    }

                    createVPGModel.getEditValidationFlags().IgnoreReverseReplicationWarning = false;
                };

                scope.$on('$destroy', function () {
                    zNotificationService.unSubscribe(subscriber, validationNotificationKey);
                    if (wizardName === 'create-vpg-wizard') {
                        setCreateVpgToInitialValidationState();
                    }

                    trackInternalPageView($location.absUrl());
                });

                function trackInternalPageView(url) {
                    $rootScope.$emit(analyticsEventsTypes.PAGE_VIEW, url);
                }
            }
        };
    });
