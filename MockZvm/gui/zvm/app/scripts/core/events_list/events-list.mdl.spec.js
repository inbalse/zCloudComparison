'use strict';

describe('Events List Model', function () {
    var model;
    var template = {
        'BannedReason': '@word',
        'QueryCriteriasOptions': {
            'VpgName|1-3': [{'Name':'@first','Id':{'Guid':'@GUID'}}],
            'Users|1-3': [{'Name':'@first','Id':{'Guid':'@GUID'}}],
            'PeerSites|1-3': [{'Name':'@first','Id':{'Guid':'@GUID'}}],
            'EventTypes|1-3': [{'Name':'@first','Id':{'Guid':'@GUID'}}],
            'EventHelpIds|1-3': [{'Name':'@first','Id':{'Guid':'@GUID'}}],
            'EventGeneralTypes': {},
            'Entities|1-3': [{'Identifier':{'GroupGuid|1-2812812':2},'Name':'@name','SampleVM':{}}],
            'TimeRange': {
                'From': '@date',
                'To': '@date'
            }
        },
        'Events|5-20': [{
            'Entity': 'VRA',
            'Description': '@sentence',
            'HelpId': '@GUID',
            'ZertoOrganizationName': '@first',
            'ProtectedSiteName': '@last',
            'User': '@name',
            'VpgName': '@email',
            'TimeStamp': '@date',
            'EventIdentifier': {'EventGuid': '@GUID'},
            'EventType': '@word'
        }]
    };
    var data = Mock.mock(template);

    beforeEach(module('zvmTest'));

    beforeEach(inject(function(eventsListModel){
        model = eventsListModel;
    }));

    it("should process the data and make a new properties", function(){
        var result = model._processData(data);
        expect(result.length).not.toBe(0);
        expect(result.Events[0].EventTypeIcon).toBe(0);
    });

    it('should set new dates to the TimeRange object', function () {
        model.eventsDateRange(moment().startOf('week'), moment().startOf('day'));
        expect(model._params.TimeRange.From).toEqual(moment().startOf('week').toDate());
        expect(model._params.TimeRange.To).toEqual(moment().startOf('day').toDate());
    });
});
