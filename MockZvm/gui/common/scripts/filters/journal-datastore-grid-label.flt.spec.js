'use strict';

describe('journalDatastoreGridLabelFilterTest', function () {
    var filter, filterOrAuto, vos;
    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_$filter_, _vos_) {
        vos = _vos_;
        filter = _$filter_('journalDatastoreGridLabelFilter');
        filterOrAuto = _$filter_('journalDatastoreGridLabelOrAutoFilter');
    }));

    it("should fail when empty", function () {
        expect(filter()).toEqual('');
        expect(filter(null)).toEqual('');
    });

    it("journalDatastoreGridLabelOrAutoFilter should show Auto when empty", function () {
        expect(filterOrAuto()).toEqual('Auto');
        expect(filterOrAuto(null)).toEqual('Auto');
    });

    it("both filters should show display name", function () {
        var DS_NAME = "some name of a datastore";
        var ds = new vos.DatastoreVisualObject(null, DS_NAME, null);

        expect(filter(ds)).toEqual(DS_NAME);
        expect(filterOrAuto(ds)).toEqual(DS_NAME);
    });
});
