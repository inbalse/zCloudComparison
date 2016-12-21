'use strict';

angular.module('zvmApp.directives').
    directive('recoveryWizardTooltipDirective', function ($translate) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {

                var $temp;

                function appendTooltip() {
                    var site = scope[attr.data];

                    var sites = angular.isDefined(site.sitesCount) ? '<p>' + $translate.instant('RECOVERY_WIZARD.TOPOLOGY.TOTAL_SITES') + '<span>' + site.sitesCount + '</span></p>' : '';
                    var height = angular.isDefined(site.sitesCount) ? '85px' : '';

                    $temp = $('<div class="recovery-topology-tooltip ' + attr.classPosition + '" style="height:'+ height +'">' +
                              '   <p>' + $translate.instant('RECOVERY_WIZARD.TOPOLOGY.TOTAL_VPGS') + '<span>' + site.data.vpgCount + '</span></p>' +
                              '   <p>' + $translate.instant('RECOVERY_WIZARD.TOPOLOGY.TOTAL_VMS') + '<span>' + site.data.vmCount + '</span></p>' +
                              '   <p>' + $translate.instant('RECOVERY_WIZARD.TOPOLOGY.TOTAL_SIZE') + '<span>' + site.data.storage + '</span></p>' +
                                 sites +
                              '</div>');

                    element.append($temp);
                }

                element.bind('mouseenter', function () {
                    appendTooltip();
                });
                element.bind('mouseleave', function () {
                    $temp.remove();
                });
            }
        };
    });

