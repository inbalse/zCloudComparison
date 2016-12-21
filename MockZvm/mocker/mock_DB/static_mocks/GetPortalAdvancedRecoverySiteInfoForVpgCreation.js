module.exports = function GetPortalAdvancedRecoverySiteInfoForVpgCreation() {
    return {
        'RecoverySiteVDCs': [{
            'Id': {
                'Id': '00000000-0000-0000-0000-000000000000',
                'VCDId': 'urn:vcloud:vdc:043609ee-2350-485b-b367-d31cb7f0f43a'
            }, 'DisplayName': 'zerto-vdc'
        }, {
            'Id': {
                'Id': '00000000-0000-0000-0000-000000000000',
                'VCDId': 'urn:vcloud:vdc:6b2a5b28-fcea-40f0-b820-af65f3f5e245'
            }, 'DisplayName': 'OrgVDC'
        }],
        'RecoverySiteResourcePools': [],
        'RecoverySiteDatastores': [],
        'ServiceProfiles': [{
            'ServiceProfileIdentifier': {'InternalId': '91a01628-802f-4a59-98d9-f2d2b3dd85ba'},
            'DisplayName': 'System Service Profile',
            'Description': 'System Service Profile',
            'IsDefault': true,
            'NeedsManage': false
        }, {
            'ServiceProfileIdentifier': {'InternalId': '11111111-1111-1111-1111-111111111111'},
            'DisplayName': 'Custom',
            'Description': 'Custom Service Profile',
            'IsDefault': false,
            'NeedsManage': true
        }]
    };
};
