'use strict';

module.exports = function GetInitialSessionValidation() {

    let result = {
        IsSessionValid: true,
        HasLicence: true,
        IsPortal: false,
        VirtualizationProviderType: 0,
        SiteKey: 'hashedLicense',
        SiteIdentifier: {
            SiteGuid: 'site-identifier'
        }
    };

    //ZSSP -----------------
    // let result = {
    //     'IsSessionValid': true,
    //     'HasLicence': true,
    //     'IsPortal': true,
    //     'VirtualizationProviderType': 0,
    //     'IsCreateSupportTicketEnabled': false
    // };

    return result;
};
