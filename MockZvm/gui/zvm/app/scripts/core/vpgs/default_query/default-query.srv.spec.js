'use strict';

describe('default query service', function () {
    var defaultQueryService, zNotificationConstant, basil, defaultQueryConstants;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_defaultQueryService_, _zNotificationConstant_, _defaultQueryConstants_, _basil_) {
        defaultQueryService = _defaultQueryService_;
        zNotificationConstant = _zNotificationConstant_;
        defaultQueryConstants = _defaultQueryConstants_;
        basil = _basil_;
    }));

    it('should check runDefaultQuery function', function () {
        var defaultQueryNotifier = defaultQueryService.getDefaultQueryNotifier();
        spyOn(defaultQueryNotifier, 'notify');
        defaultQueryService.runDefaultQuery();
        expect(defaultQueryNotifier.notify).toHaveBeenCalledWith({key: zNotificationConstant.RUN_DEFAULT_QUERY});
    });

    it('should check runPersonalQuery function', function () {
        var personalQueryNotifier = defaultQueryService.getPersonalQueryNotifier();
        var personalQuery = {
            "filters": [
                {
                    "name": "VPG Name (# VMs)",
                    "views": [
                        "General",
                        "Performance",
                        "Backup"
                    ],
                    "toolTip": "VPG name + number of VMs protected in the VPG",
                    "field": "NameObj",
                    "filter": 0,
                    "id": "NameObj",
                    "sortable": true,
                    "wildcardValues": null
                },
                {
                    "name": "Direction",
                    "maxWidth": 100,
                    "field": "Direction",
                    "filter": 2,
                    "views": [
                        "General"
                    ],
                    "formatter_class": "protection-group-state-visual",
                    "card_default": true,
                    "card_formatter": 2,
                    "id": "Direction",
                    "sortable": true,
                    "isFilterActive": true,
                    "isSelected": true,
                    "filterValues": [
                        2
                    ]
                },
                {
                    "name": "Protected Site",
                    "filter": 0,
                    "field": "SourceTypeObj",
                    "views": [
                        ""
                    ],
                    "id": "SourceTypeObj",
                    "sortable": true
                },
                {
                    "name": "Priority",
                    "maxWidth": 85,
                    "toolTip": "Priority for transferring data to the recovery site of the VPG",
                    "filter": 2,
                    "field": "Priority",
                    "views": [
                        "General"
                    ],
                    "formatter_class": "protection-group-priority",
                    "card_formatter": 1,
                    "id": "Priority",
                    "sortable": true,
                    "filterValues": null
                }
            ],
            "sort": {
                "sortField": "Priority",
                "sortAsc": true
            },
            "groupBy": {
                "id": "SourceSiteName",
                "field": "SourceTypeObj",
                "text": "Protected Site",
                "$$hashKey": "object:187"
            }
        };
        defaultQueryService.setPersonalQuery(personalQuery);
        spyOn(personalQueryNotifier, 'notify');
        spyOn(defaultQueryService, 'getPersonalQuery');
        defaultQueryService.runPersonalQuery();
        expect(defaultQueryService.getPersonalQuery).toHaveBeenCalled();
        expect(personalQueryNotifier.notify).toHaveBeenCalledWith({key: zNotificationConstant.RUN_PERSONAL_QUERY, value: defaultQueryService.getPersonalQuery()});
    });

    it('should check saveCurrentQuery function', function () {
        spyOn(defaultQueryService, 'setPersonalQuery');
        defaultQueryService.saveCurrentQuery();
        expect(defaultQueryService.setPersonalQuery).toHaveBeenCalled();
    });
});
