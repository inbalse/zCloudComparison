//'use strict';

//TODO wait for Yaniv fix jquery jQuery_1_7 load

//ddescribe('z-slick-grid', function () {
//    var scope, element, elementHTML;
//
//        elementHTML = '<z-slick-grid ' +
//                      '    id="grid-id" grid-id="grid-id" data="data" column-defs="columnDefs" ' +
//                      '    view-by-values="viewByValues" group-by-values="groupByValues" selected-items="selectedItems"' +
//                      '    on-selection="selectedItemsChange" custom-options="customOptions" selected-group="selectedGroup">' +
//                      '</z-slick-grid>';
//
//        //===================================== create mock data for grid ========================================//
//
//        var templateData = {
//            'ProtectedGroups|20-30': [{
//                'TestName': {
//                    'Name': {
//                        'label': '@word',
//                        'location': 'main/users/@word',
//                        'type': 'href'
//                    },
//                    'delete': {
//                        'type': 'delete',
//                        'event': 'deleteEvent',
//                        'enabled|1': true
//                    },
//                    'edit': {
//                        'type': 'edit',
//                        'event': 'editEvent',
//                        'enabled|1': true
//                    }
//                },
//                'AlertTip': {},
//                'Connected|0-12': 2,
//                'GB|1024-123123123': 1024,
//                'Device': '@name',
//                'DisplayName': [{'Name':'@first','Id':{'Guid':'@GUID'}}],
//                'IncomingMessage|0-12': 2,
//                'TimeStamp': '@date',
//                'NodeCount|0-1': 0,
//                'ProtectedCustomers|0-12': 2,
//                'RecoveryVolsSizeInGB|1024-123123123': 1024,
//                'TypeOfStore': '@name',
//                'Zerto|1': true
//            }]
//        };
//
//        var columnDefs = [
//            {name: 'name', field: 'TestName',             formatter: '',  views: ['General']},
//            {name: 'name', field: 'AlertTip',             formatter: '',  views: ['Backup']},
//            {name: 'name', field: 'Connected',            formatter: '',  views: ['General']},
//            {name: 'name', field: 'GB',                   formatter: '',  views: ['Performance']},
//            {name: 'name', field: 'Device',               formatter: '',  views: ['General']},
//            {name: 'name', field: 'DisplayName',          formatter: '',  views: ['Performance']},
//            {name: 'name', field: 'NodeCount',            formatter: '',  views: ['General']},
//            {name: 'name', field: 'ProtectedCustomers',   formatter: '',  views: ['Backup']},
//            {name: 'name', field: 'RecoveryVolsSizeInGB', formatter: '',  views: ['General']},
//            {name: 'name', field: 'TypeOfStore',          formatter: '',  views: ['Performance']},
//            {name: 'name', field: 'Zerto',                formatter: '',  views: ['Backup']}
//        ];
//
//
//
//    beforeEach(module('zvmTest'));
//    beforeEach(module('templates'));
//
//    var data = Mock.mock(templateData);
//
//    beforeEach(inject(function ($rootScope, $compile) {
//        scope = $rootScope.$new();
//        scope.data = data;
//        element = $compile(elementHTML)(scope);
//        scope.$digest();
//
//
//        scope.customOptions = {
//            columns: columnDefs,
//            defaultSortField: 'Name',
//            showSearch: true
//        };
//
//        scope.viewByValues = [
//            {
//                id: 'General',
//                text: 'General'
//            },
//            {
//                id: 'Performance',
//                text: 'Performance'
//            },
//            {
//                id: 'Backup',
//                text: 'Backup'
//            }
//        ];
//
//        scope.groupByValues = [
//            {
//                id: '',
//                text: 'none'
//            },
//            {
//                id: 'Direction',
//                text: 'Direction'
//            }
//        ];
//
//        scope.selectedGroup = [];
//        scope.selectedItems = [];
//
//        scope.selectedItemsChange = function(){
//        };
//    }));
//        //==========================================================================================================//
//
//    it('should be watch data to grid', function () {
//
//       // scope.$digest();
//
//        expect(scope.search).toHaveBeenCalledWith(scope.data);
//
//        //scope.search(scope.data);
//
//    });
//
//
//});
