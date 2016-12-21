'use strict';

angular.module('zvmApp.filters')
    .constant('multiSiteDirectionConstants', {
        LOCAL_ICON: 0,
        REMOTE_ICON: 1,
        TEMPLATES: {
            REGULAR: '<div class="<%=iconClass%>"></div>',
            MULTI_SITE_LOCAL: '<div class="<%=iconClass%>" <%=iconAttr%> data="<%=data%>"></div>',
            MULTI_SITE_REMOTE: '<div class="<%=iconClass%>" z-slickgrid-tooltip="<%=label%>"></div>'
        }
    })
    .filter('multiSiteDirectionFormatter', function ($translate, multiSiteDirectionConstants, enums) {
        return function (row, cell, cellItem) {

            if (_.isNullOrUndefined(cellItem)) {
                return '';
            }

            var data = getIconData(cellItem);

            if (_.isNullOrUndefined(data.knownProtectedVmVpgsInfo)) {
                return buildRegular(data);

            } else {
                return buildMultiSite(data);
            }
        };

        function buildRegular(data) {
            var iconTemplate = _.template(multiSiteDirectionConstants.TEMPLATES.REGULAR);
            return iconTemplate({
                iconClass: data.iconClass
            });
        }

        function buildMultiSite(data) {
            var template, iconTemplate,
                attributes = {
                    iconClass: data.iconClass
                };
            if (data.isLocalSite) {
                template = multiSiteDirectionConstants.TEMPLATES.MULTI_SITE_LOCAL;
                attributes.iconAttr = 'multi-sites-tooltip';
                attributes.data = _.replaceDoubleQuotesToSingle(JSON.stringify({data: data.knownProtectedVmVpgsInfo, totalNumberOfVpgs: data.totalNumberOfVpgs}))

            } else {
                template = multiSiteDirectionConstants.TEMPLATES.MULTI_SITE_REMOTE;
                attributes.label = $translate.instant('VM_LIST.MULTI_SITE_REMOTE_VM_LABEL');
            }

            iconTemplate = _.template(template);

            return iconTemplate(attributes);
        }

        function getIconData(item) {
            if (_.isNullOrUndefined(item.protectedVmVpgsInfoVisualObject) ||
                item.protectedVmVpgsInfoVisualObject.TotalNumberOfVpgs === 1) {
                return {
                    iconClass: getDirection(item.direction)
                };
            }

            var isLocalSite = (item.direction === enums.ProtectionGroupStateVisual.Protected ||
            item.direction === enums.ProtectionGroupStateVisual.SelfProtected);
            return {
                iconClass: getMultiSiteIcon(isLocalSite),
                isLocalSite: isLocalSite,
                knownProtectedVmVpgsInfo: item.protectedVmVpgsInfoVisualObject.KnownProtectedVmVpgsInfo,
                totalNumberOfVpgs: item.protectedVmVpgsInfoVisualObject.TotalNumberOfVpgs
            };
        }

        function getMultiSiteIcon(isLocalSite) {
            var state = isLocalSite ? multiSiteDirectionConstants.LOCAL_ICON : multiSiteDirectionConstants.REMOTE_ICON;
            return 'protection-group-state-multi-visual-' + state;
        }

        function getDirection(direction) {
            return 'protection-group-state-visual-' + direction;
        }
    });