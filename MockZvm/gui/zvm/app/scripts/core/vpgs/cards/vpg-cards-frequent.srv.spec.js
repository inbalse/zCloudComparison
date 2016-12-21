'use strict';
describe('Cards - frequent fields service', function () {
    var basil, cardsFrequentFieldsConstants, vpgCardsFrequentService;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_basil_, _cardsFrequentFieldsConstants_, _vpgCardsFrequentService_) {
        basil = _basil_;
        cardsFrequentFieldsConstants = _cardsFrequentFieldsConstants_;
        vpgCardsFrequentService = _vpgCardsFrequentService_;
    }));

    //region Sort
    it('should find the frequent sort', function () {
        var sortToCheck = {
            "field": "SourceTypeObj"
        };
        vpgCardsFrequentService.allFrequentData = {
            "sort": [
                {
                    "field": "NameObj",
                    "usages": ["2016-07-28T14:45:47.918Z"]
                },
                {
                    "field": "SourceTypeObj",
                    "usages": [moment()]
                },
                {
                    "field": "TargetTypeObj",
                    "usages": ["2016-07-28T14:56:31.862Z"]
                }
            ],
            "filter": []
        };
        expect(vpgCardsFrequentService.checkIfFrequentSortExist(sortToCheck)).toBeTruthy();
    });

    it('should not find the frequent sort', function () {
        var sortToCheck = {
            "field": "ProvisionedStorageInMBObj"
        };
        vpgCardsFrequentService.allFrequentData = {
            "sort": [
                {
                    "field": "NameObj",
                    "usages": ["2016-07-28T14:45:47.918Z"]
                },
                {
                    "field": "SourceTypeObj",
                    "usages": ["2016-07-28T14:56:26.491Z"]
                },
                {
                    "field": "TargetTypeObj",
                    "usages": ["2016-07-28T14:56:31.862Z"]
                }
            ],
            "filter": [
                {
                    "field": "SourceTypeObj",
                    "usages":["2016-07-28T14:39:52.652Z"]
                },
                {
                    "field": "TargetTypeObj",
                    "usages":["2016-07-28T14:39:59.154Z"]
                },
                {
                    "field": "PeerSiteTypeObj",
                    "usages": ["2016-07-28T14:40:01.906Z"]
                },
                {
                    "field": "Priority",
                    "usages": ["2016-07-28T14:40:04.939Z"]
                },
                {
                    "field": "CustomerName",
                    "usages": ["2016-07-28T14:40:08.121Z"]
                }
            ]
        };
        expect(vpgCardsFrequentService.checkIfFrequentSortExist(sortToCheck)).toBeFalsy();
    });

    it('should push sort field successfully', function () {

        var sortToPush = {
            "field": "SourceTypeObj"
        };
        vpgCardsFrequentService.allFrequentData = {
            "sort": [],
            "filter": []
        };

        vpgCardsFrequentService.pushSortField(sortToPush);
        expect(vpgCardsFrequentService.checkIfFrequentSortExist(sortToPush)).toBeTruthy();
    });

    it('should push sort field and remove the last frequent field successfully', function () {
        var sortToPush = {
                field: "sortToPush"
            },
            sortToPop = {
                field: "sortToPop"
            };

        vpgCardsFrequentService.allFrequentData = {
            "sort": [
                {
                    "field": "NameObj",
                    "usages": ["2016-07-28T14:45:47.918Z"]
                },
                {
                    "field": "NameObj1",
                    "usages": ["2016-07-28T14:45:47.918Z"]
                },
                {
                    "field": "NameObj2",
                    "usages": ["2016-07-28T14:45:47.918Z"]
                },
                {
                    "field": "SourceTypeObj",
                    "usages": ["2016-07-28T14:56:26.491Z"]
                },
                {
                    "field": "sortToPop",
                    "usages": ["2016-06-26T14:56:26.491Z"]
                }
            ],
            "filter": []
        };

        vpgCardsFrequentService.pushSortField(sortToPush);

        expect(vpgCardsFrequentService.checkIfFrequentSortExist(sortToPush)).toBeTruthy();
        expect(vpgCardsFrequentService.checkIfFrequentSortExist(sortToPop)).toBeFalsy();
    });
    //endregion

    //region Filter
    it('should find the frequent filter', function () {
        var today = moment();

        var filterToCheck = {
            "field": "PeerSiteTypeObj",
            "usages": [today]
        };
        vpgCardsFrequentService.allFrequentData = {
            "sort": [],
            "filter": [
                {
                    "field": "SourceTypeObj",
                    "usages": ["2016-07-28T14:39:52.652Z"]
                },
                {
                    "field": "TargetTypeObj",
                    "usages": ["2016-07-28T14:39:59.154Z"]
                },
                {
                    "field": "PeerSiteTypeObj",
                    "usages": [today]
                },
                {
                    "field": "Priority",
                    "usages": ["2016-07-28T14:40:04.939Z"]
                },
                {
                    "field": "CustomerName",
                    "usages": ["2016-07-28T14:40:08.121Z"]
                }
            ]
        };
        expect(vpgCardsFrequentService.checkIfFrequentFilterExist(filterToCheck)).toBeTruthy();
    });

    it('should not find the frequent filter', function () {
        var filterToCheck = {
            "field": "PeerSiteTypeObj",
            "usages": ["2016-07-28T14:40:01.906Z"]
        };
        vpgCardsFrequentService.allFrequentData = {
            "sort": [],
            "filter": [
                {
                    "field": "SourceTypeObj",
                    "usages": ["2016-07-28T14:39:52.652Z"]
                },
                {
                    "field": "TargetTypeObj",
                    "usages": ["2016-07-28T14:39:59.154Z"]
                },
                {
                    "field": "Priority",
                    "usages": ["2016-07-28T14:40:04.939Z"]
                },
                {
                    "field": "CustomerName",
                    "usages": ["2016-07-28T14:40:08.121Z"]
                }
            ]
        };
        expect(vpgCardsFrequentService.checkIfFrequentFilterExist(filterToCheck)).toBeFalsy();
    });

    it('should push filter field successfully', function () {
        var filterToPush = {
            field: 'filterToPush'
        };
        vpgCardsFrequentService.allFrequentData = {
            "sort": [],
            "filter": []
        };

        vpgCardsFrequentService.pushFilterField(filterToPush);
        expect(vpgCardsFrequentService.checkIfFrequentFilterExist(filterToPush)).toBeTruthy();
    });

    it('should push filter field and remove the last frequent field successfully', function () {
        var filterToPush = {
                field: 'filterToPush'
            },
            filterToPop = {
                field: 'filterToPop'
            };

        vpgCardsFrequentService.allFrequentData = {
            "sort": [
                {
                    "field": "NameObj",
                    "usages": ["2016-07-28T14:45:47.918Z"]
                },
                {
                    "field": "NameObj1",
                    "usages": ["2016-07-28T14:45:47.918Z"]
                },
                {
                    "field": "NameObj2",
                    "usages": ["2016-07-28T14:45:47.918Z"]
                },
                {
                    "field": "SourceTypeObj",
                    "usages": ["2016-07-28T14:56:26.491Z"]
                },
                {
                    "field": "filterToPop",
                    "usages": ["2016-06-28T14:56:31.862Z"]
                }
            ],
            "filter": []
        };

        vpgCardsFrequentService.pushFilterField(filterToPush);

        expect(vpgCardsFrequentService.checkIfFrequentFilterExist(filterToPush)).toBeTruthy();
        expect(vpgCardsFrequentService.checkIfFrequentFilterExist(filterToPop)).toBeFalsy();
    });
    //endregion

});
