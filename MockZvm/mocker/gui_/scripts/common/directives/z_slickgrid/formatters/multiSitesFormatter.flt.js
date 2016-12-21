'use strict';

angular.module('zvmApp.filters')
    .filter('multiSitesSharedIconFormatter', function (selectedVmsCons) {
        return function (row, cell, cellItem) {
            if (cellItem) {
                var data = [], prop, iconTemplate, totalNumberOfVpgs;

                if (cellItem.hasOwnProperty(selectedVmsCons.MULTI_SITE_VCD_VAPP_COLUMN_FIELD)) {
                    data = cellItem[selectedVmsCons.MULTI_SITE_VCD_VAPP_COLUMN_FIELD][selectedVmsCons.MULTI_SITE_VCD_VAPP_DATA_COLUMN_FIELD];
                    prop = selectedVmsCons.MULTI_SITE_VCD_VAPP_COLUMN_FIELD;
                    totalNumberOfVpgs = cellItem[selectedVmsCons.MULTI_SITE_VCD_VAPP_COLUMN_FIELD]['TotalNumberOfVpgs'];
                } else if (cellItem.hasOwnProperty(selectedVmsCons.MULTI_SITE_VC_DATA_COLUMN_FIELD)) {
                    data = cellItem[selectedVmsCons.MULTI_SITE_VC_DATA_COLUMN_FIELD];
                    prop = selectedVmsCons.MULTI_SITE_VC_DATA_COLUMN_FIELD;
                    totalNumberOfVpgs = cellItem.TotalNumberOfVpgs;
                }

                iconTemplate = _.template('<div class="<%=iconClass%>" <%=iconAttr%> data="<%=data%>"></div>');

                return cellItem.isProtected && cellItem[prop] ? iconTemplate({
                    iconClass: 'multi-site-already-protected-icon',
                    iconAttr: 'multi-sites-tooltip',
                    data: _.replaceDoubleQuotesToSingle(JSON.stringify({data: data, totalNumberOfVpgs: totalNumberOfVpgs}))
                }) : '';
            }

            return '';
        };
    });
