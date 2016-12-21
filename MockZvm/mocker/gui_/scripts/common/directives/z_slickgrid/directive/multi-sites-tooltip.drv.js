'use strict';

angular.module('zvmApp.directives')
    .directive('multiSitesTooltip', function ($translate) {
        return {
            restrict: 'A',
            link: function (scope, element ,attr) {
                var tooltipContentRows = '', dot = '.', tooltipMainClass = 'multi-sites-tooltip-container', linkClass = '__navigation-link';
                var $body = $(document.body);
                var position = element[0].getBoundingClientRect();
                var info = JSON.parse(_.replaceSingleQuotesToDouble(attr.data));


                var tooltipContainerTmp = _.template('<div class="' + tooltipMainClass + '">' +
                                                         '<div class="' + tooltipMainClass + '__headed-summary <%=headerClass%>"><%=headerSummary%> </div>' +
                                                         '<%=tooltipContent%>' +
                                                     '</div>');

                var tooltipContentTmp = _.template('<div class="' + tooltipMainClass + '__content">' +
                                                        '<div class="<%=statusIconClass%> col-xs-1 ' + tooltipMainClass + '__content-icon"></div>' +
                                                        '<span class="col-xs-4 ' + tooltipMainClass + '__content-text">' +
                                                            '<a class="<%=linkClass%>" title="<%=vpgName%>" href="<%=href%>"><%=vpgName%></a>' +
                                                        '</span>' +
                                                        '<div class="<%=directionIconClass%> col-xs-2 ' + tooltipMainClass + '__content-icon"></div>' +
                                                        '<div class="<%=siteTypeIconClass%> col-xs-1 ' + tooltipMainClass + '__content-icon"></div>' +
                                                        '<span class="col-xs-4 ' + tooltipMainClass + '__content-text" title="<%=siteName%>"><%=siteName%></span>' +
                                                    '</div>');


                _.each(info.data, function (vpg) {
                    var tooltipRow = tooltipContentTmp({
                        statusIconClass: 'protection-group-alert-status-' + vpg.VpgAlertStatus,
                        vpgName: vpg.VpgName + '(' + vpg.NumberOfVms + ')',
                        href: '#/main/vpg_details?id=' + vpg.VpgIdentifier.GroupGuid,
                        linkClass: tooltipMainClass + linkClass,
                        directionIconClass: 'protection-group-state-visual-' + vpg.VpgDirection,
                        siteTypeIconClass: 'remote-site-icon-' + vpg.PeerSiteVpgEntityType,
                        siteName: vpg.PeerSiteName
                    });

                    tooltipContentRows = tooltipContentRows + tooltipRow;
                });

                if (info.data.length !== info.totalNumberOfVpgs) {
                    var numOfProcessingVpgs = info.totalNumberOfVpgs - info.data.length;

                    var tempProcessingVpg = tooltipContentTmp({
                        statusIconClass: tooltipMainClass + '__content-NA',
                        vpgName: $translate.instant('CREATE_VPG_SELECT_VMS.ROW_ITEM_NA_TEXT'),
                        href: 'javascript:void(0);',
                        linkClass: tooltipMainClass + '__content_link-NA',
                        directionIconClass: tooltipMainClass + '__content-NA',
                        siteTypeIconClass: tooltipMainClass + '__content-NA',
                        siteName: 'N/A'
                    });

                    for (var i = 0; i < numOfProcessingVpgs; i++) {
                        tooltipContentRows = tooltipContentRows + tempProcessingVpg;
                    }
                }

                var getTooltipHeaderInfo = function (numOfVpgs) {
                    return  numOfVpgs !== 0 ?  $translate.instant('CREATE_VPG_SELECT_VMS.HEADER_TOOLTIP_PROTECTED_SIDE', {numOfVpgs: numOfVpgs})  : $translate.instant('CREATE_VPG_SELECT_VMS.HEADER_TOOLTIP_RECOVERY_SIDE')
                };

                var tooltip = tooltipContainerTmp({
                    headerSummary:  getTooltipHeaderInfo(info.totalNumberOfVpgs),
                    tooltipContent: tooltipContentRows,
                    headerClass: info.totalNumberOfVpgs !== 0 ? '' : tooltipMainClass + '__static-header-info'
                });

                var removeTooltip = function () {
                    $(dot + tooltipMainClass).remove();
                };

                var mouseLeaveEvent = function (event) {
                    if (!(_.isNullOrUndefined(event.relatedTarget) || _.contains(event.relatedTarget.className, tooltipMainClass))) {
                        removeTooltip();
                    }
                };

                var mouseClickEvent = function (event) {
                    if(event.target.className === tooltipMainClass + linkClass) {
                        removeTooltip();
                    }
                };

                if ($body.find(dot + tooltipMainClass).length > 0) {
                    removeTooltip();
                }

                $body.append(tooltip);

                var $inDomTooltip = $(dot + tooltipMainClass);

                $inDomTooltip.on('mouseleave', mouseLeaveEvent);
                $inDomTooltip.on('click', mouseClickEvent);

                var gridCellElement = $(element[0]).closest('div[class^="slick-cell"]');
                var cellWidth = gridCellElement.width();

                gridCellElement.on('mouseleave', mouseLeaveEvent);

                $inDomTooltip.css({'top': position.top - $inDomTooltip.height() - 10, 'left': position.left + (cellWidth / 2)});
            }
        }
    });