'use strict';
angular.module('zvmApp.core')
    .controller('vpgsListController', function ($scope, vpgsListModel, vpgsModel, zTabsStateConstants, vpgsActionsService, zNotificationService, zNotificationConstant,vpgsContainerService) {
        //todo: there should be target type some day for remote site enum style icon
        var vpgsListCtrl = this;
        var statusFilterSubscriber = zNotificationService.getSubscriber(zNotificationConstant.STATUS_FILTER_CHANGE);
        var defaultQuerySubscriber = zNotificationService.getSubscriber(zNotificationConstant.RUN_DEFAULT_QUERY);
        var personalQuerySubscriber = zNotificationService.getSubscriber(zNotificationConstant.RUN_PERSONAL_QUERY);

        vpgsListCtrl.gridObj = {
            id: vpgsListModel.getGridId()
        };

        vpgsListCtrl.customOptions = {
            columns: vpgsListModel.getGridColumnsDefs(),
            defaultSortField: 'NameObj',
            defaultSortAsc: true,
            showSearch: true,
            numOfViews: 5
        };

        vpgsListCtrl.viewByValues = vpgsListModel.getGridDefaultViews();

        var onStatusFilterChange = function () {
            vpgsListCtrl.data = vpgsListModel.processData({ProtectionGroups : vpgsModel.getInitialItems()});
        };

        statusFilterSubscriber.promise.then(null, null, onStatusFilterChange);

        var runQuery = function (query) {
            // call the functions on the scope of z-slickgrid directive
            vpgsListCtrl.setSelectedGroup(query.groupBy);
            vpgsListCtrl.setSortColumn(query.sort.sortField, query.sort.sortAsc);
            vpgsListCtrl.setFilters(vpgsListModel.getGridColumnsDefs(), query.filters);
            vpgsListCtrl.gridObj.grid.updateData(vpgsListCtrl.data);
        };

        var runDefaultQuery = function () {
            var defaultQuery = {};
            defaultQuery.groupBy = null;
            defaultQuery.filters = [];
            defaultQuery.sort = {};
            defaultQuery.sort.sortField = vpgsListCtrl.customOptions.defaultSortField;
            defaultQuery.sort.sortAsc = vpgsListCtrl.customOptions.defaultSortAsc;
            runQuery(defaultQuery);
        };

        defaultQuerySubscriber.promise.then(null, null, runDefaultQuery);

        var runPersonalQuery = function (personalQuery) {
            runQuery(personalQuery);
        };

        personalQuerySubscriber.promise.then(null, null, runPersonalQuery);

        vpgsListCtrl.OnMigrateVpg = function(a,vpgId){

            var rows = a['toElement']['parentElement']['children'][1]['children'][1]['children'];
            for(var a=0; a<rows.length; a++) {
                var row = rows[a];
                var rowChecked = row['children'][0]['childNodes'][0]['checked'];
                var cloudName = row['children'][0]['childNodes'][1]['innerText'];
				if (rowChecked)
				{
					vpgsContainerService.createVPG();
				}
            }
        }

        vpgsListCtrl.rowClick = function (e, row, cell, grid) {
            if (cell === grid.getColumnIndex('tco')) {

                var dataView = grid.getData();
                var tco = dataView.getItem(row)['tco'];
                var rows = '';
				var rowItem = dataView.getItem(row);
				
				tco.alternativeTco.sort(function(a,b) {return a.saveNum < b.saveNum});
                for(var a=0; a<tco.alternativeTco.length; a++) {
                    var rowCloudProviderLogo ='';
                    if (tco.alternativeTco[a].cloud == 'AWS') rowCloudProviderLogo = '<img src="assets/list_icons/aws-icon-trans.png">';
                    else if (tco.alternativeTco[a].cloud == 'Azure') rowCloudProviderLogo = '<img src="assets/list_icons/azure-icon-trans.png">';
                    else if (tco.alternativeTco[a].cloud == 'iLand') rowCloudProviderLogo = '<img src="assets/list_icons/iLand.png">';
                    else if (tco.alternativeTco[a].cloud == 'NaviSite') rowCloudProviderLogo = '<img src="assets/list_icons/navisite.png">';
                    else if (tco.alternativeTco[a].cloud == 'Peak10') rowCloudProviderLogo = '<img src="assets/list_icons/peak10.png">';

                    rows += '<tr><td><input type="radio" name="radios" id="radio'+a+'" /><label for="radio'+a+'">'+rowCloudProviderLogo + "  " + tco.alternativeTco[a].cloud + '</label></td><td>' + tco.alternativeTco[a].tco + '</td><td style="color:green"><b>' + tco.alternativeTco[a].save + '</b></td></tr>';
                }


                var cellElement = $(e.target.parentElement)[0];
                $('<div class="tco-container table-responsive"><center style="margin-top:5px"><b>Choose a DR provider:</b></center> <table class="table table-hover"><thead><tr><th>Cloud</th><th>TCO</th><th>Save</th></tr></thead><tbody>'+rows+'</tbody></table><button class="migrate-dr">Migrate DR</button> <button class="migrate-dr-close">close</button></div>').appendTo($('body'));

                $('.migrate-dr-close').on('click', function() {
                    $( ".tco-container" ).remove();
                });

                $('.migrate-dr').on('click', function(a){
                    vpgsListCtrl.OnMigrateVpg(a,rowItem['id']);
                    $( ".tco-container" ).remove();
                });



            }

            if (e.target.value) {
                e.preventDefault();
            }
            var vpg = vpgsListCtrl.gridObj.grid.getDataItem(row);

            vpgsActionsService.execute(vpg, e.target.value);
        };


        vpgsListCtrl.onMouseEnter = function (e, row, cell, grid) {
            e.preventDefault();
            e.stopPropagation();
            if (vpgsListCtrl.cellStatusHovered) {
                return;
            }

            if (cell !== grid.getColumnIndex('AlertStatus')) {
                return;
            }
            var dataItem, node;

            node = grid.getCellNode(row, cell);
            dataItem = grid.getDataItem(row);

            if (dataItem.AlertStatus === 0) {
                return;
            }

            vpgsListCtrl.cellStatusHovered = true;

            vpgsListCtrl.tooltipData = {
                node: node,
                alertTips: dataItem.AlertTips
            };

        };

        vpgsListCtrl.onMouseLeave = function (e) {
            e.preventDefault();
            e.stopPropagation();
            vpgsListCtrl.cellStatusHovered = false;
            vpgsListCtrl.tooltipData = null;
        };

        vpgsListCtrl.onVpgsReceived = function (result) {
            vpgsListCtrl.data = result;
        };

        vpgsListModel.register($scope).then(null, null, vpgsListCtrl.onVpgsReceived);

        $scope.$on('$destroy', function () {
            zNotificationService.unSubscribe(statusFilterSubscriber, zNotificationConstant.STATUS_FILTER_CHANGE, false);
            zNotificationService.unSubscribe(defaultQuerySubscriber, zNotificationConstant.RUN_DEFAULT_QUERY, false);
            zNotificationService.unSubscribe(personalQuerySubscriber, zNotificationConstant.RUN_PERSONAL_QUERY, false);
        });
    });

angular.module('zvmApp.directives').directive('alertsTooltip', function (reactDirective, AlertsTooltipComponentFactory) {
    return reactDirective(AlertsTooltipComponentFactory);
});
